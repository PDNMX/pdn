import React from 'react'
import { withStyles } from '@mui/styles'
import { Typography, List, ListItem, ListItemText, Alert } from '@mui/material'
import axios from 'axios'
import { ResponsiveBar } from '@nivo/bar'
import ModalInfo from '../../Compartidos/Dashboards/ModalInfo'
import ContainerChart from '../../Compartidos/Dashboards/ContainerChart'

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

const BarTotalsLayer = (props) => {
  const labelOffset = 10
  const labelFontSize = 12
  if (props.bars.length === 0) return null
  // compute totals for each index/bar
  const totals = {}
  const bandwidth = props.bars[0].width
  props.bars.forEach((bar) => {
    const indexValue = bar.data.indexValue
    if (!(indexValue in totals)) {
      totals[indexValue] = 0
    }
    if (!bar.data.hidden) {
      totals[indexValue] += bar.data.value
    }
  })
  // place text elements above the bars
  const labels = Object.keys(totals).map((indexValue) => {
    const x = props.xScale(indexValue) + bandwidth / 2
    const y = props.yScale(totals[indexValue]) - labelOffset
    return (
      <text
        key={'total.' + indexValue}
        x={x}
        y={y}
        textAnchor='middle'
        fontWeight='bold'
        fontSize={labelFontSize}
      >
        {totals[indexValue]}
      </text>
    )
  })
  return <>{labels}</>
}


const aux = () => axios({
  url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getAgrupacionEjercicio',
  json: true,
  method: 'GET'
})

const Ejercicio = props => {
  const [state, setState] = React.useState({
    error: false
  })
  //const [open, setOpen] = React.useState(false)
  //const handleOpen = () => setOpen(true)

  //Sincronizar con entidades externas
  //endpoint, componentes, servicios
  React.useEffect(() => {
    aux().then(result => {
      // result array
      const resultArr = result.data.data.map(item => ({
        año:item.ejercicio,
        total:item.total
      }))


      console.log(resultArr)
      setState({ data: resultArr })
    }).catch(error => {
      console.error(error)
      setState({ error: true })
    })
  }, [])

  const { classes } = props
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  return (
    <div  style={{ height: '500px' }}>
      <ModalInfo open={open} setOpen={setOpen}>
        <Typography variant='h6' className={classes.titulo} paragraph>
          Registros de personas servidoras públicas que intervinieron en procesos de contrataciones por año
        </Typography>
        <Typography variant='body1'>
          Se muestra el histórico acumulado por año desde el 2015 hasta el 2022.
        </Typography>
        

      </ModalInfo>
      <ContainerChart handleOpen={handleOpen}>
      {state.data &&
        <ResponsiveBar
        data={state.data}
        keys={['total']}
        indexBy='año'
        margin={{ top: 60, right: 20, bottom: 130, left: 80 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={{
          tickSize: 5,
          tickPadding: 15,
          tickRotation: 0,
          legend: 'Personas Servidoras Públicas en contrataciones por año',
          legendPosition: 'middle',
          legendOffset: -50
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Ejercicio Fiscal',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Número de registros',
          legendPosition: 'middle',
          legendOffset: -60
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        layers={[
          'grid',
          'axes',
          'bars',
          'legends'
        ]}
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

export default withStyles(styles)(Ejercicio)
