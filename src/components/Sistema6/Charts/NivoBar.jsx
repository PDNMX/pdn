// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveBar = ({ data }) => {
  const legend = 'Unidades compradoras'

  const _data = data.map(d => {
    return {
      id_: d._id.id,
      total: (d.total / 1000000).toFixed(2) // millones
    }
  })

  return (
    <ResponsiveBar
      data={_data}
      keys={[
        'total'
        /* 'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut' */
      ]}
      indexBy='id_'
      margin={{ top: 20, right: 20, bottom: 90, left: 90 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        },
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
        }
      ]}
      fill={[
        {
          match: {
            id: 'total'
          },
          id: 'lines'
        }
        /* {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            } */
      ]}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            1.6
          ]
        ]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -15,
        legend,
        legendPosition: 'middle',
        legendOffset: 50
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Millones de pesos',
        legendPosition: 'middle',
        legendOffset: -60
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            1.6
          ]
        ]
      }}
      legends={[
        /* {
                dataFrom: 'keys',
                itemTextColor: "#55575A",
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
            } */
      ]}
      theme={{
        axis: {
          legend: {
            text: {
              fontSize: 12,
              fill: '#55575A'
            }
          },
          ticks: {
            text: {
              fontSize: 12,
              fill: '#55575A'
            }
          }
        }
      }}
      tooltip={e => {
        return (
          <div style={{ background: '#000000', opacity: 0.7, padding: '10px' }}>
            SIGLAS: {e.data.id_} <br />
            {e.data.total} MDP
          </div>
        )
      }}
      role='application'
      ariaLabel='Nivo bar chart demo'
      barAriaLabel={e => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
    />
  )
}

export default MyResponsiveBar
