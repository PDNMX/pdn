import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@mui/styles";
import { Typography, Paper, CircularProgress } from "@mui/material";
import { ResponsiveLine } from '@nivo/line';
import { searchInProvider } from '../../utils/api';
import { buildSearchQuery } from '../../utils/search';

const styles = theme => ({
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
});

const CustomTooltip = ({ point }) => {
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

const SancionesResueltas = ({ classes, providers }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const isMounted = useRef(true);
    const analysisCompleted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        const fetchAllPages = async (baseUrl, endpoint, providerId, filter) => {
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

                return allData;
            } catch (error) {
                console.error('Error fetching pages:', error);
                return [];
            }
        };

        const fetchData = async () => {
            if (!providers?.length || analysisCompleted.current) return;

            try {
                if (isMounted.current) {
                    setLoading(true);
                }

                const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;
                const emptyFilter = buildSearchQuery({});

                let allGravesData = [];
                let allNoGravesData = [];

                for (const provider of providers) {
                    if (!isMounted.current) return;

                    const [gravesData, noGravesData] = await Promise.all([
                        fetchAllPages(baseUrl, 'faltas_administrativas_graves', provider.id, emptyFilter),
                        fetchAllPages(baseUrl, 'faltas_administrativas_no_graves', provider.id, emptyFilter)
                    ]);

                    allGravesData = [...allGravesData, ...gravesData];
                    allNoGravesData = [...allNoGravesData, ...noGravesData];
                }

                const yearCounts = new Map();

                const processResults = (items) => {
                    items.forEach(item => {
                        if (item.resolucion?.fechaResolucion) {
                            const year = new Date(item.resolucion.fechaResolucion).getFullYear();
                            if (isValidYear(year)) {
                                yearCounts.set(year, (yearCounts.get(year) || 0) + 1);
                            }
                        }
                    });
                };

                processResults(allGravesData);
                processResults(allNoGravesData);

                const chartData = Array.from(yearCounts.entries())
                    .filter(([year]) => isValidYear(year))
                    .map(([year, count]) => ({ x: year, y: count }))
                    .sort((a, b) => a.x - b.x);

                const filledData = fillMissingYears(chartData);
                
                if (isMounted.current) {
                    setData(filledData);
                    analysisCompleted.current = true;
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted.current = false;
        };
    }, [providers]);

    const nivoData = [
        {
            id: "sanciones",
            data: data.map(d => ({
                x: d.x,
                y: d.y
            }))
        }
    ];

    if (loading) {
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
                <b>Sanciones Resueltas por Año</b>
            </Typography>
            <div className={classes.chartContainer}>
                {data && data.length > 0 ? (
                    <ResponsiveLine
                        data={nivoData}
                        margin={{ top: 20, right: 30, bottom: 70, left: 70 }}
                        xScale={{
                            type: 'point'
                        }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                        }}
                        curve="monotoneX"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
                            legend: 'Año de Resolución',
                            legendOffset: 50,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Número de Sanciones',
                            legendOffset: -50,
                            legendPosition: 'middle'
                        }}
                        enableGridX={true}
                        enableGridY={true}
                        colors={['rgb(144, 133, 218)']}
                        lineWidth={3}
                        pointSize={10}
                        pointColor={'rgb(226, 210, 247)'}
                        pointBorderWidth={2}
                        pointBorderColor={'rgb(144, 133, 218)'}
                        enablePointLabel={false}
                        useMesh={true}
                        tooltip={({ point }) => (
                            <CustomTooltip point={point} />
                        )}
                        theme={{
                            axis: {
                                legend: {
                                    text: {
                                        fontSize: 12
                                    }
                                }
                            },
                            grid: {
                                line: {
                                    stroke: '#ddd',
                                    strokeWidth: 1
                                }
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

SancionesResueltas.propTypes = {
    classes: PropTypes.object.isRequired,
    providers: PropTypes.array.isRequired
};

export default withStyles(styles)(SancionesResueltas);