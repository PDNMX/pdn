import React, { useState, useEffect } from 'react';
import { withStyles } from "@mui/styles";
import { Typography, Paper, CircularProgress } from "@mui/material";
import { FlexibleXYPlot, LineMarkSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, Hint } from 'react-vis';
import { searchInProvider } from '../../utils/api';
import { buildSearchQuery } from '../../utils/search';
import 'react-vis/dist/style.css';

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
    const [hoveredCell, setHoveredCell] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!providers?.length) {
                console.log('No hay providers disponibles');
                return;
            }

            try {
                setLoading(true);
                const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;
                const emptyFilter = buildSearchQuery({});

                const [gravesResults, noGravesResults] = await Promise.all([
                    Promise.all(providers.map(provider => 
                        searchInProvider(baseUrl, 'faltas_administrativas_graves', provider.id, emptyFilter)
                    )),
                    Promise.all(providers.map(provider => 
                        searchInProvider(baseUrl, 'faltas_administrativas_no_graves', provider.id, emptyFilter)
                    ))
                ]);

                const yearCounts = new Map();

                const processResults = (results) => {
                    results.forEach(result => {
                        if (result?.providerData?.data) {
                            result.providerData.data.forEach(item => {
                                if (item.resolucion?.fechaResolucion) {
                                    const year = new Date(item.resolucion.fechaResolucion).getFullYear();
                                    if (isValidYear(year)) {
                                        yearCounts.set(year, (yearCounts.get(year) || 0) + 1);
                                    }
                                }
                            });
                        }
                    });
                };

                processResults(gravesResults);
                processResults(noGravesResults);

                console.log('Conteo por años antes de procesar:', yearCounts);

                // Convertir a array, filtrar años inválidos y ordenar
                const chartData = Array.from(yearCounts.entries())
                    .filter(([year]) => isValidYear(year))
                    .map(([year, count]) => ({ x: year, y: count }))
                    .sort((a, b) => a.x - b.x);

                console.log('Datos filtrados y ordenados:', chartData);

                // Llenar años faltantes con ceros
                const filledData = fillMissingYears(chartData);
                
                console.log('Datos procesados finales:', filledData);
                
                setData(filledData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [providers]);

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
                    <FlexibleXYPlot
                        margin={{left: 70, right: 30, top: 20, bottom: 70}}
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis 
                            title="Año de Resolución"
                            tickValues={data.map(d => d.x)}
                            tickFormat={v => `${v}`}
                            tickLabelAngle={-45}
                        />
                        <YAxis 
                            title="Número de Sanciones"
                        />
                        <LineMarkSeries
                            data={data}
                            stroke="rgb(144, 133, 218)"
                            fill="rgb(234, 224, 243)"
                            strokeWidth={3}
                            size={5}
                            curve={'curveMonotoneX'}
                            onValueMouseOver={setHoveredCell}
                            onValueMouseOut={() => setHoveredCell(null)}
                        />
                        {hoveredCell && (
                            <Hint value={hoveredCell}>
                                <div style={{
                                    background: 'white',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    <div><strong>Año:</strong> {hoveredCell.x}</div>
                                    <div><strong>Sanciones:</strong> {hoveredCell.y}</div>
                                </div>
                            </Hint>
                        )}
                    </FlexibleXYPlot>
                ) : (
                    <Typography variant="h6" align="center">
                        No hay datos disponibles
                    </Typography>
                )}
            </div>
        </Paper>
    );
};

export default withStyles(styles)(SancionesResueltas);