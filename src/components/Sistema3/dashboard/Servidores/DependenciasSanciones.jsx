import React, { useState, useEffect } from 'react'
import { withStyles } from '@mui/styles'
import { Typography, List, ListItem, ListItemText, Alert } from '@mui/material'
import { ResponsiveTreeMap } from '@nivo/treemap'
import axios from 'axios'


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
  url: process.env.REACT_APP_S3S_BACKEND + '/charts/getDependenciaMayor',
  json: true,
  method: 'GET'
})

const DependenciasSanciones = props => {
  const [data, setData] = useState(null)

  React.useEffect(() => {
    
    aux().then(result => {
        const data = result.data.data.map(item => ({
          "name": item.dependencia,
          "total_sanciones": parseInt(item.total_sanciones)
        }))
        console.log("esta es la " + data)
        setData({
          root: 'root',
          children: data
        })
      })
      .catch(error => console.error(error))
  }, [])

  const { classes } = props

  return (
    <div style={{ height: '500px' }}>
      {data && (
        <ResponsiveTreeMap
          root={data}
          identity="name"
          value="total_sanciones"
          innerPadding={3}
          outerPadding={3}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          label="loc"
          labelFormat=".0s"
          labelSkipSize={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={11}
        />
      )}
    </div>
  )
}

export default withStyles(styles)(DependenciasSanciones)
