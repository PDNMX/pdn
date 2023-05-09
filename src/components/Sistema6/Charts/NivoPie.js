// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
/*
const data = [
    {
        "id": "c",
        "label": "Licitación Pública",
        "value": 418,
        "color": "hsl(106, 70%, 50%)"
    },
    {
        "id": "python",
        "label": "Invitación a tres",
        "value": 540,
        "color": "hsl(358, 70%, 50%)"
    },
    {
        "id": "erlang",
        "label": "Adjudicación directa",
        "value": 75,
        "color": "hsl(249, 70%, 50%)"
    },
    {
        "id": "ruby",
        "label": "Otro",
        "value": 270,
        "color": "hsl(241, 70%, 50%)"
    },
    {
        "id": "elixir",
        "label": "elixir",
        "value": 446,
        "color": "hsl(74, 70%, 50%)"
    }
];*/

const MyResponsivePie = ({ data, dataType }) => (
    //dataType => Counts || Amounts
    <ResponsivePie
        data={data}
        colors={{scheme: 'set2'}}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={3}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        // arc link labels
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        //arc labels
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        tooltip={
            e=>{
                let {datum:t}=e;
                return <div style={{background: "#000000", opacity: 0.7, padding: '10px'}}>
                    {t.label} <br/>
                    {/*Porcentaje: {t.percent}%<br/>*/}
                    {
                        dataType === 'amounts'?
                        new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(t.value)
                        :
                        new Intl.NumberFormat('es-MX').format(t.value)
                    }
                </div>
                //return n.createElement(l,{style:{color:t.color}},n.createElement(s,null,"id"),n.createElement(d,null,t.id),n.createElement(s,null,"value"),n.createElement(d,null,t.value),n.createElement(s,null,"formattedValue"),n.createElement(d,null,t.formattedValue),n.createElement(s,null,"color"),n.createElement(d,null,t.color))
            }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Licitación'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Invitación a tres'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Adjudicación directa'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Otro'
                },
                id: 'lines'
            }
        ]}
        theme={{
            legends: { text: { fontSize: 20 } }
        }}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 0,//56,
                itemsSpacing: 5, //0,
                itemWidth: 200,
                itemHeight: 18,
                itemTextColor: '#ffffff', //ajustar a un color menos brillante
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#ffffff'
                        }
                    }
                ]
            }
        ]}
    />
)

export default MyResponsivePie;
