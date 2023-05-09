// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
    {
        "country": "AD",
        "hot dog": 53,
        "hot dogColor": "hsl(67, 70%, 50%)",
        /*"burger": 38,
        "burgerColor": "hsl(252, 70%, 50%)",
        "sandwich": 90,
        "sandwichColor": "hsl(152, 70%, 50%)",
        "kebab": 138,
        "kebabColor": "hsl(314, 70%, 50%)",
        "fries": 169,
        "friesColor": "hsl(138, 70%, 50%)",
        "donut": 150,
        "donutColor": "hsl(143, 70%, 50%)"*/
    },
    {
        "country": "AE",
        "hot dog": 126,
        "hot dogColor": "hsl(46, 70%, 50%)",
        /*"burger": 55,
        "burgerColor": "hsl(259, 70%, 50%)",
        "sandwich": 101,
        "sandwichColor": "hsl(206, 70%, 50%)",
        "kebab": 131,
        "kebabColor": "hsl(179, 70%, 50%)",
        "fries": 131,
        "friesColor": "hsl(241, 70%, 50%)",
        "donut": 18,
        "donutColor": "hsl(18, 70%, 50%)"*/
    },
    {
        "country": "AF",
        "hot dog": 135,
        "hot dogColor": "hsl(122, 70%, 50%)",
        /*"burger": 177,
        "burgerColor": "hsl(102, 70%, 50%)",
        "sandwich": 144,
        "sandwichColor": "hsl(48, 70%, 50%)",
        "kebab": 132,
        "kebabColor": "hsl(168, 70%, 50%)",
        "fries": 119,
        "friesColor": "hsl(216, 70%, 50%)",
        "donut": 176,
        "donutColor": "hsl(204, 70%, 50%)"*/
    },
    {
        "country": "AG",
        "hot dog": 50,
        "hot dogColor": "hsl(235, 70%, 50%)",
        /*"burger": 107,
        "burgerColor": "hsl(19, 70%, 50%)",
        "sandwich": 173,
        "sandwichColor": "hsl(7, 70%, 50%)",
        "kebab": 118,
        "kebabColor": "hsl(320, 70%, 50%)",
        "fries": 106,
        "friesColor": "hsl(43, 70%, 50%)",
        "donut": 58,
        "donutColor": "hsl(176, 70%, 50%)"*/
    },
    {
        "country": "AI",
        "hot dog": 120,
        "hot dogColor": "hsl(60, 70%, 50%)",
        /*"burger": 131,
        "burgerColor": "hsl(315, 70%, 50%)",
        "sandwich": 139,
        "sandwichColor": "hsl(9, 70%, 50%)",
        "kebab": 123,
        "kebabColor": "hsl(254, 70%, 50%)",
        "fries": 54,
        "friesColor": "hsl(178, 70%, 50%)",
        "donut": 51,
        "donutColor": "hsl(204, 70%, 50%)"*/
    },
    {
        "country": "AL",
        "hot dog": 5,
        "hot dogColor": "hsl(20, 70%, 50%)",
        /*"burger": 58,
        "burgerColor": "hsl(311, 70%, 50%)",
        "sandwich": 162,
        "sandwichColor": "hsl(317, 70%, 50%)",
        "kebab": 86,
        "kebabColor": "hsl(282, 70%, 50%)",
        "fries": 48,
        "friesColor": "hsl(182, 70%, 50%)",
        "donut": 18,
        "donutColor": "hsl(307, 70%, 50%)"*/
    },
    {
        "country": "AM",
        "hot dog": 73,
        "hot dogColor": "hsl(331, 70%, 50%)",
        /*"burger": 72,
        "burgerColor": "hsl(249, 70%, 50%)",
        "sandwich": 197,
        "sandwichColor": "hsl(24, 70%, 50%)",
        "kebab": 194,
        "kebabColor": "hsl(137, 70%, 50%)",
        "fries": 62,
        "friesColor": "hsl(24, 70%, 50%)",
        "donut": 198,
        "donutColor": "hsl(212, 70%, 50%)"*/
    }
];

const MyResponsiveBar = ({ /*data, legend */ }) => {
    const legend = "Unidades compradoras";

    return <ResponsiveBar
        data={data}
        keys={[
            'hot dog',
            /*'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'*/
        ]}
        indexBy="country"
        margin={{top: 50, right: 130, bottom: 50, left: 60}}
        padding={0.3}
        valueScale={{type: 'linear'}}
        indexScale={{type: 'band', round: true}}
        colors={{scheme: 'nivo'}}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
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
            tickRotation: 0,
            legend: legend,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Millones de pesos',
            legendPosition: 'middle',
            legendOffset: -40
        }}
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
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
    />
};

export default MyResponsiveBar;
