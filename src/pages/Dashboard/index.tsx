import PageTemplate from "../../templates"
import { PieChart, LineChart, Gauge } from '@mui/x-charts';
import { PieChartContainer, AnalyticsContainer } from './styles'

import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const Dashboard = () => {
    const { pathname } = useLocation()

    return (<PageTemplate role="BASIC_USER" pageTitle={pathname.replaceAll("/", "").toUpperCase()} navButtonText="Send a message">
        <>
            <AnalyticsContainer>

                <PieChartContainer>

                    <PieChart
                        colors={[
                            "#757575",
                            "#212121",
                            "#9c9c9c"
                        ]}
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={350}
                        height={300}
                    />
                    <Typography variant="h6" color="#212121">
                        Messages By Type
                    </Typography>
                </PieChartContainer>
                <PieChartContainer>
                    <div style={{
                        width: "350px"
                    }}>

                        <Gauge width={320} height={280} value={50} />
                    </div>
                    {/* <Gauge width={150} height={150} value={50} valueMin={10} valueMax={60} /> */}

                    <Typography variant="h6" color="error">
                        Succesful Messages
                    </Typography>
                </PieChartContainer>

            </AnalyticsContainer>

            <AnalyticsContainer>

                <PieChartContainer>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                </PieChartContainer>


            </AnalyticsContainer>

        </>

    </PageTemplate>)
}