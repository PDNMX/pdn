import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Alert } from '@mui/material'
import { withStyles } from '@mui/styles'
import ModalInfo from '../../../Compartidos/Dashboards/ModalInfo'
import ContainerChart from '../../../Compartidos/Dashboards/ContainerChart';


const themeBar = {
  /*     "background": "#ffffff", */
  textColor: '#333333',
  fontSize: 11,
  grid: {
    line: {
      stroke: '#583171',
      strokeWidth: 0.2
    }
  },
  legends: {
    title: {
      text: {
        fontSize: 14,
        fill: 'red'
      }
    },
    text: {
      fontSize: 11,
      fill: '#55575A'
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: '#55575A'
      }
    }
  },
  axis: {
    domain: {
      line: {
        stroke: '#f6f5f4',
        strokeWidth: 1
      }
    },
    legend: {
      text: {
        fontSize: 12,
        fill: '#55575A'
      }
    },
    ticks: {
      line: {
        stroke: '#f6f5f4',
        strokeWidth: 1
      },
      text: {
        fontSize: 11,
        fill: '#55575A'
      }
    }
  },
  tooltip: {
    container: {
      background: '#4f274f',
      color: '#fff',
      fontSize: 12
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {}
  }
}

const styles = theme => ({
  frameChart: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  titulo: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    fontWeight: 'bold'
  },
  item: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(3)
  }
})

const AnioDuracionSanciones = props => {
  const [state, setData] = useState([]);

  const aux = () => axios({
    url: process.env.REACT_APP_S3S_BACKEND + '/charts/getAnioSancion',
    json: true,
    method: 'GET'
  })

  useEffect(() => {
    // Aquí es donde normalmente harías la llamada a la API para obtener los datos
    // En este caso, vamos a utilizar los datos proporcionados
    aux().then(result => {
      setData([
        {
          "id": "Resoluciones",
          "data": result.data.data.map(item => ({
            "x": item.anio_resolucion,
            "y": parseInt(item.count)
          }))
        }
      ]);
    })
      .catch(error => console.error('Error:', error));
  }, []);


  const { classes } = props
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  return (
    <div style={{ height: '500px' }}>
      <ModalInfo open={open} setOpen={setOpen}>
        <Typography variant='h6' className={classes.titulo} paragraph>
          Cantidad de sanciones resueltas por año
        </Typography>
        <Typography  variant='body1'>
        Conoce el número de personas servidoras públicas sancionadas (inhabilitadas) y cuya fecha de resolución de la sanción fue efectuada a partir del año 2013.
        </Typography>


      </ModalInfo>
      <ContainerChart handleOpen={handleOpen}>
      {state &&
        <ResponsiveLine
          data={state}
          margin={{ top: 60, right: 110, bottom: 100, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          axisTop={{
            tickSize: 5,
            tickPadding: 65,
            tickRotation: 0,
            legend: 'Cantidad de sanciones resueltas por año',
            legendPosition: 'middle',
            legendOffset: -50
          }}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Año de la sanción',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Número de sanciones',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          colors={{ scheme: 'nivo' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          theme={themeBar}
        />}
        {
                    state.error &&
                      <Alert severity='error'> No disponible por el momento, intente más tarde. </Alert>
                }
      </ContainerChart>
    </div>
  );
};

export default withStyles(styles)(AnioDuracionSanciones)
