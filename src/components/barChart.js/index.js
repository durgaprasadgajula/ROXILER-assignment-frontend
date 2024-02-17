import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import {
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: "70%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    statisticsBox: {
        border: "1px solid #ccc",
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const BarCharts = () => {
    const classes = useStyles();
    const [selectedMonth, setSelectedMonth] = useState("March");
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchChartData();
    }, [selectedMonth]);

    const fetchChartData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/barChart?month=${selectedMonth}`
            );
            console.log(response);
            setChartData(response.data);
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    return (
        <div className={classes.root}>
            <h1 style={{ color: "red", fontSize: "20px", margin: "20px" }}>
                Bar Chart
            </h1>
            <Box className={classes.statisticsBox}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="month-select-label">Month</InputLabel>
                    <Select
                        labelId="month-select-label"
                        id="month-select"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        label="Month"
                    >
                        {Array.from({ length: 12 }, (_, i) => {
                            const monthIndex = i + 1;
                            const month = new Date(
                                2022,
                                monthIndex - 1,
                                1
                            ).toLocaleString("en-US", { month: "long" });
                            return (
                                <MenuItem key={monthIndex} value={month}>
                                    {month}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={600}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="priceRange" stroke="#8884d8" />
                    <YAxis />
                    <Tooltip
                        wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                    />
                    <Legend
                        width={100}
                        wrapperStyle={{
                            top: 40,
                            right: 20,
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #d5d5d5",
                            borderRadius: 3,
                            lineHeight: "40px",
                        }}
                    />
                    <Bar dataKey="itemCount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarCharts;
