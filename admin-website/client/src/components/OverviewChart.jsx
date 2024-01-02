/* IMPORT FILES */
import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from 'state/api';

const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme();
    const { data, isLoading } = useGetSalesQuery();
    
    /**
     * Calculates info only when data changes 
    */
    const [totalSalesLine, totalUnitsLine] = useMemo(() => {

        if (!data) return [];

        const { monthlyData } = data;
        const totalSalesLine = {            // sales data template
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };

        const totalUnitsLine = {            // units data template
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: [],
        };

        /**
         * Format data
        */
        Object.values(monthlyData).reduce(          
            (acc, { month, totalSales, totalUnits }) => {
                
                const curSales = acc.sales + totalSales;        // add sales for curr month
                const curUnits = acc.units + totalUnits;        // add units for curr month

                totalSalesLine.data = [         // add accumulated data to sales line
                    ...totalSalesLine.data,
                    { x: month, y: curSales }
                ];

                totalUnitsLine.data = [         // add accumulated data to units line
                    ...totalUnitsLine.data,
                    { x: month, y: curUnits }
                ];

                return { sales: curSales, units: curUnits };
            },
            { sales: 0, units: 0 }      // track sales and units for each iteration
        );

        return [[totalSalesLine], [totalUnitsLine]];
        
    }, [data]);     // eslint-disable-line react-hooks/exhaustive-deps

    if (!data || isLoading) return "Loading...";

    return (
        <ResponsiveLine
            theme={{
                axis: {
                    domain: {
                    line: {
                        stroke: theme.palette.secondary[200],
                    },
                    },
                    legend: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                    },
                    ticks: {
                    line: {
                        stroke: theme.palette.secondary[200],
                        strokeWidth: 1,
                    },
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                    },
                },
                legends: {
                    text: {
                    fill: theme.palette.secondary[200],
                    },
                },
                tooltip: {
                    container: {
                    color: theme.palette.primary.main,
                    },
                },
            }}
            data={view === "sales" ? totalSalesLine : totalUnitsLine}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : `Total ${view === 'sales' ? "Revenue" : "Units"} for Year`,
                legendOffset: -60,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
                isDashboard ? [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 30,
                    translateY: -40,
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
                ] : undefined
            }
        />
    )
}

export default OverviewChart;