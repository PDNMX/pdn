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
      stroke: '#f6f5f4',
      strokeWidth: 0.2
    }
  },
  legends: {
    title: {
      text: {
        fontSize: 11,
        fill: '#f6f5f4'
      }
    },
    text: {
      fontSize: 11,
      fill: '#f6f5f4'
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: '#f6f5f4'
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
        fill: '#f6f5f4'
      }
    },
    ticks: {
      line: {
        stroke: '#f6f5f4',
        strokeWidth: 1
      },
      text: {
        fontSize: 11,
        fill: '#f6f5f4'
      }
    }
  },
  tooltip: {
    container: {
      background: '#333',
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
  url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getProcedimientosPeriodo',
  json: true,
  method: 'GET'
})

const Procedimiento = props => {
  const [state, setState] = React.useState({
    error: false
  })
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)

  React.useEffect(() => {
    aux().then(result => {
      // result array
      const resultArr = []

      const groupByLocation = result.data.data.reduce((group, item) => {
        const { ejercicio } = item
        group[ejercicio] = group[ejercicio] ?? []
        group[ejercicio].push(item)
        return group
      }, {})

      Object.keys(groupByLocation).forEach((item) => {
        resultArr.push({
          año: item,
          enajenación: groupByLocation[item][0].total ?? [],
          concesiones: groupByLocation[item][1].total ?? [],
          contrataciones: groupByLocation[item][2].total ?? []
        })
      })
      // console.log(resultArr)
      setState({ data: resultArr })
    }).catch(error => {
      console.error(error)
      setState({ error: true })
    })
  }, [])

  const { classes } = props
  return (
    <div>
      <ModalInfo open={open} setOpen={setOpen}>
        <Typography variant='h6' className={classes.titulo} paragraph>
          Tipos de procesos
        </Typography>
        <Typography variant='body1'>
          Existen cuatro tipos de procesos:
        </Typography>
        <List>
          <ListItem>
            <ListItemText>
              1. <b>Contrataciones públicas: </b>Licitación pública, Invitación a cuando menos tres personas y adjudicación directa con base en lo establecido en la Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público.
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              2. <b>Concesiones, licencias, permisos, autorizaciones y prórrogas: </b>Comprende los regulados por las diversas disposiciones jurídicas de carácter federal que otorgan las dependencias de la Administración Pública Federal (APF).
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              3. <b>Enajenación de bienes muebles: </b>Incluyen los actos traslativos de propiedad de los bienes muebles de la federación y de las entidades paraestatales conforme a la Ley General de Bienes Nacionales (LGBN).
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              4. <b>Asignación y emisión de dictámenes de avalúos nacionales: </b>Comprende únicamente los que son competencia del Instituto de Administración y Avalúos de Bienes Nacionales (INDAABIN).
            </ListItemText>
          </ListItem>
        </List>

      </ModalInfo>
      <ContainerChart handleOpen={handleOpen}>
        {state.data &&
          <ResponsiveBar
            data={state.data}
            keys={['enajenación', 'concesiones', 'contrataciones']}
            indexBy={['año']}
            margin={{ top: 20, right: 20, bottom: 120, left: 75 }}
            padding={0.1}
            colors={{ scheme: 'nivo' }}
            groupMode='stacked'

                    /* borderColor={{ from: "color", modifiers: [["darker", 1.6]] }} */
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Ejercicio',
              legendPosition: 'middle',
              legendOffset: 40
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Procedimientos',
              legendPosition: 'middle',
              legendOffset: -60,
              format: value =>
                Number(value).toLocaleString('es-MX', {
                  minimumFractionDigits: 0
                })
            }}
            legends={[
              {
                anchor: 'bottom',
                dataFrom: 'keys',
                direction: 'row',
                itemHeight: 20,
                itemWidth: 120,
                toggleSerie: true,
                translateY: 75

              }
            ]}
            animate
            layers={[
              'grid',
              'axes',
              'bars',
              'legends',
              BarTotalsLayer
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

export default withStyles(styles)(Procedimiento)
