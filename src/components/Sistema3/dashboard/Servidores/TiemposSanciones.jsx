import React from 'react'
import { withStyles } from '@mui/styles'
import { Typography, List, ListItem, ListItemText, Alert } from '@mui/material'
import axios from 'axios'
import { ResponsiveBar } from '@nivo/bar'
import ModalInfo from '../../../Compartidos/Dashboards/ModalInfo'
import ContainerChart from '../../../Compartidos/Dashboards/ContainerChart'

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

const aux = () => axios({
  url: process.env.REACT_APP_S3S_BACKEND + '/charts/getTemporalidadSanciones',
  json: true,
  method: 'GET'
})

const TiemposSanciones = props => {
  const [state, setState] = React.useState({
    error: false
  })

  const groupByRange = (data) => {
    const ranges = [
      { key: '0-5', min: 0, max: 5 },
      { key: '6-10', min: 6, max: 10 },
      { key: '11-15', min: 11, max: 15 },
      { key: '16-19', min: 16, max: 19 },
      { key: '20 o mas', min: 20, max: Infinity },
    ]
    const result = ranges.map(range => ({
      "id": range.key,
      "Sanciones": data.filter(item => item.anios >= range.min && item.anios <= range.max).reduce((sum, item) => sum + Number(item.total), 0)
    }))
    return result
  }
  
  

  React.useEffect(() => {
    aux().then(result => {
      const resultaArr = result.data.data.map(item => ({
        "anios": item.anios,
        "total": item.total
      }))
      const groupedData = groupByRange(resultaArr)
      setState({ data: groupedData })
    }).catch(error => {
      console.error(error)
      setState({ error: true })
    })
  }, [])

  const { classes } = props
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  return (
    <div style={{ height: '500px' }}>
      <ModalInfo open={open} setOpen={setOpen}>
        <Typography variant='h6' className={classes.titulo} paragraph>
          Duración de las sanciones en años.
        </Typography>
        <Typography variant='body1'>
          Conoce la duración de las sanciones por rangos de años.
        </Typography>
      </ModalInfo>
      <ContainerChart handleOpen={handleOpen}>
        {state.data &&
          <ResponsiveBar
            data={state.data}
            keys={['Sanciones']}
            indexBy="id"
            margin={{ top: 60, right: 130, bottom:90, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={{
              tickSize: 5,
              tickPadding: 65,
              tickRotation: 0,
              legend: 'Duración de las sanciones en años',
              legendPosition: 'middle',
              legendOffset: -50
            }}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Rango en años de las sanciones',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Número de sanciones',
              legendPosition: 'middle',
              legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            theme={themeBar}
          />}
        {
          state.error &&
          <Alert severity='error'> No disponible por el momento, intente más tarde. </Alert>
        }
      </ContainerChart>
    </div>
  )
}

export default withStyles(styles)(TiemposSanciones)
