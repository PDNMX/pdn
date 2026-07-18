import { useState, useEffect, useRef, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import { Typography, Paper, CircularProgress } from "@mui/material";
import { ResponsiveLine } from '@nivo/line';
import { searchInProvider } from '../../utils/api';
import { buildSearchQuery } from '../../utils/search';
import { debounce } from 'lodash';

// Definir estilos usando makeStyles
const useStyles = makeStyles()((theme) => ({
    root: {
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        backgroundColor: '#fff'
    },
    chartContainer: {
        width: '100%',
        height: '400px'
    },
    titulo: {
        textAlign: "center",
        marginBottom: theme.spacing(2)
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400
    }
}));

const CustomTooltip = memo(({ point }) => {
    return (
        <div
            style={{
                background: 'white',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
        >
            <div><strong>Año:</strong> {point.data.x}</div>
            <div><strong>Sanciones:</strong> {point.data.y}</div>
        </div>
    );
});

CustomTooltip.displayName = 'CustomTooltip';

CustomTooltip.propTypes = {
    point: PropTypes.shape({
        data: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
};

const fillMissingYears = (data) => {
    if (data.length < 2) return data;

    const filledData = [];
    const minYear = Math.min(...data.map(d => d.x));
    const maxYear = Math.max(...data.map(d => d.x));
    const dataMap = new Map(data.map(d => [d.x, d.y]));

    for (let year = minYear; year <= maxYear; year++) {
        filledData.push({
            x: year,
            y: dataMap.get(year) || 0
        });
    }

    return filledData;
};

const isValidYear = (year) => {
    return !isNaN(year) && year >= 1900 && year <= new Date().getFullYear();
};

const BATCH_SIZE = 3; // Número de providers a procesar simultáneamente

const SancionesResueltasAnio = ({ providers }) => {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const isMounted = useRef(true);
    const analysisCompleted = useRef(false);
    const dataCache = useRef(new Map());

    const debouncedSetData = useRef(
        debounce((newData) => {
            setData(newData);
        }, 300)
    ).current;

    const processResults = (items, yearCounts) => {
        const years = {};
        
        items.forEach(item => {
            // Método para verificar si es un particular
            const isParticular = () => {
                return (
                    // Verificaciones para personas físicas
                    ((item.datosGenerales?.nombres || item.datosGenerales?.primerApellido) ||
                    // Verificaciones para personas morales
                    (item.datosGenerales?.nombreRazonSocial || item.datosGenerales?.rfc) ||
                    // Otras posibles verificaciones específicas
                    (item.tipoPersona === 'particular') || (item.datosGenerales?.tipoPersona === 'particular'))
                );
            };

            // Método para extraer fecha
            const extractDate = () => {
                const datePaths = [
                    'fecha', 
                    'resolucion.fechaResolucion', 
                    'datosGenerales.fechaResolucion'
                ];

                for (const path of datePaths) {
                    let dateValue = item;
                    const keys = path.split('.');
                    
                    for (const key of keys) {
                        dateValue = dateValue && dateValue[key];
                    }

                    if (dateValue) return dateValue;
                }

                return null;
            };

            // Solo procesar particulares con fecha válida
            if (isParticular()) {
                const dateString = extractDate();
                if (dateString) {
                    const year = new Date(dateString).getFullYear();
                    if (isValidYear(year)) {
                        years[year] = (years[year] || 0) + 1;
                    }
                }
            }
        });

        Object.entries(years).forEach(([year, count]) => {
            yearCounts.set(parseInt(year), (yearCounts.get(parseInt(year)) || 0) + count);
        });
    };

    const processChartData = useMemo(() => (yearCounts) => {
        const chartData = Array.from(yearCounts.entries())
            .filter(([year]) => isValidYear(year))
            .map(([year, count]) => ({ x: year, y: count }))
            .sort((a, b) => a.x - b.x);

        return fillMissingYears(chartData);
    }, []);

    const fetchAllPages = async (baseUrl, endpoint, providerId, filter) => {
        const cacheKey = `${endpoint}-${providerId}`;
        if (dataCache.current.has(cacheKey)) {
            return dataCache.current.get(cacheKey);
        }

        try {
            const firstPage = await searchInProvider(baseUrl, endpoint, providerId, filter);
            if (!firstPage?.providerData?.pagination) return [];

            const { totalItems, limit } = firstPage.providerData.pagination;
            const totalPages = Math.ceil(totalItems / limit);
            
            let allData = firstPage.providerData.data || [];

            if (totalPages > 1) {
                const remainingPages = await Promise.all(
                    Array.from({ length: totalPages - 1 }, (_, i) =>
                        searchInProvider(baseUrl, endpoint, providerId, filter, i + 2, limit)
                    )
                );

                remainingPages.forEach(page => {
                    if (page?.providerData?.data) {
                        allData = [...allData, ...page.providerData.data];
                    }
                });
            }

            dataCache.current.set(cacheKey, allData);
            return allData;
        } catch (error) {
            console.error('Error fetching pages:', error);
            return [];
        }
    };

    useEffect(() => {
        isMounted.current = true;

        const fetchData = async () => {
            if (!providers?.length || analysisCompleted.current) return;

            try {
                if (isMounted.current) {
                    setLoading(true);
                }

                const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;
                const emptyFilter = buildSearchQuery({});
                const yearCounts = new Map();

                // Endpoints específicos para particulares
                const endpoints = [
                    'faltas_graves_personas_fisicas', 
                    'faltas_graves_personas_morales'
                ];

                for (let i = 0; i < providers.length; i += BATCH_SIZE) {
                    if (!isMounted.current) return;

                    const batch = providers.slice(i, i + BATCH_SIZE);
                    
                    for (const endpoint of endpoints) {
                        const batchResults = await Promise.all(
                            batch.map(provider => 
                                fetchAllPages(baseUrl, endpoint, provider.id, emptyFilter)
                            )
                        );

                        batchResults.forEach(result => {
                            processResults(result, yearCounts);
                        });

                        if (isMounted.current) {
                            const chartData = processChartData(yearCounts);
                            debouncedSetData(chartData);
                        }
                    }
                }

                if (isMounted.current) {
                    const finalChartData = processChartData(yearCounts);
                    setData(finalChartData);
                    analysisCompleted.current = true;
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted.current = false;
            debouncedSetData.cancel();
        };
    }, [providers, debouncedSetData]);

    const nivoData = useMemo(() => [{
        id: "sanciones",
        data: data.map(d => ({
            x: d.x,
            y: d.y
        }))
    }], [data]);

    if (loading && data.length === 0) {
        return (
            <Paper className={classes.root}>
                <div className={classes.loadingContainer}>
                    <CircularProgress />
                </div>
            </Paper>
        );
    }

    return (
        <Paper className={classes.root} elevation={3}>
            <Typography variant="h6" className={classes.titulo}>
                <b>Sanciones emitidas por Año</b>
            </Typography>
            <div className={classes.chartContainer}>
                {data && data.length > 0 ? (
                    <ResponsiveLine
                        data={nivoData}
                        margin={{ top: 20, right: 30, bottom: 70, left: 70 }}
                        layers={[
                            'grid',
                            'axes',
                            'areas',
                            'lines',
                            'points',
                            'slices',
                            'mesh',
                            'legends'
                        ]}
                        enableCrosshair={true}
                        sliceTooltip={({ slice }) => {
                            const formatNumber = (number) => {
                                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            };
                        
                            return (
                                <div
                                    style={{
                                        background: 'white',
                                        padding: '15px',
                                        margin: '25px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        textAlign: 'center'
                                    }}
                                >
                                    {slice.points.map(point => (
                                        <div key={point.id}>
                                            <div
                                            style={{
                                                background: 'rgb(255, 255, 255)',
                                                color: 'rgb(17, 17, 17)',
                                                padding: '5px',
                                                borderBottom: '1px solid rgb(199, 70, 93)'
                                            }}
                                            >
                                            Año: {point.data.x} </div>
                                            <div
                                            style={{
                                                background: 'rgb(255, 251, 251)',
                                                color: 'rgb(255, 68, 99)',
                                                padding: '15px',
                                            }}
                                            >
                                            {formatNumber(point.data.y)} <strong>sanciones</strong> </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                        debugSlices={false}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                        curve="monotoneX"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 8,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: 'Año de Resolución',
                            legendOffset: 60,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Número de Sanciones',
                            legendOffset: -60,
                            legendPosition: 'middle'
                        }}
                        enableGridX={true}
                        enableGridY={true}
                        colors={['rgb(144, 133, 218)']}
                        lineWidth={3}
                        pointSize={12}
                        pointColor={'rgb(255, 68, 99)'}
                        pointBorderWidth={2}
                        pointBorderColor={'rgb(166, 133, 218)'}
                        enablePoints={true}
                        pointLabel="y"
                        enableArea={false}
                        areaOpacity={1}
                        areaBlendMode="normal"
                        areaBaselineValue={0}
                        enableSlices="x"
                        debugMesh={false}
                        isInteractive={true}
                        crosshairType="cross"
                        role="application"
                        defs={[]}
                        fill={[]}
                        enablePointLabel={false}
                        legends={[]}
                        useMesh={true}
                        tooltip={({ point }) => (
                            <CustomTooltip point={point} />
                        )}
                        theme={{
                            axis: {
                                legend: { text: { fontSize: 16 } },
                                ticks: { text: { fontSize: 14 } }
                            },
                            grid: {
                                line: { stroke: '#ddd', strokeWidth: 1 }
                            }
                        }}
                    />
                ) : (
                    <Typography variant="h6" align="center">
                        No hay datos disponibles
                    </Typography>
                )}
            </div>
        </Paper>
    );
};

SancionesResueltasAnio.propTypes = {
    providers: PropTypes.array.isRequired
};

export default SancionesResueltasAnio;
