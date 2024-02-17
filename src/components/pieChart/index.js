import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import {
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@material-ui/core";

const PieChartComponent = () => {
    const [selectedMonth, setSelectedMonth] = useState("March");
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        fetchPieData();
    }, [selectedMonth]);

    const fetchPieData = async () => {
        try {
            const response = await axios.get(
                `https://roxillar-assighnment.onrender.com/pieChart?month=${selectedMonth}`
            );
            setPieData(response.data);
        } catch (error) {
            console.error("Error fetching pie chart data:", error);
        }
    };

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#8884d8",
        "#ff00ff",
        "#00ff00",
        "#0000ff",
        "#ff0000",
        "#ffff00",
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
            }}
        >
            <h1 style={{ color: "red", fontSize: "20px", margin: "20px" }}>
                Pie Chart
            </h1>
            <Box>
                <FormControl>
                    <InputLabel id="month-select-label">Month</InputLabel>
                    <Select
                        labelId="month-select-label"
                        id="month-select"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
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
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="itemCount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;
