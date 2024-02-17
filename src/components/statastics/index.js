import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
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

const TransactionsTable = () => {
    const classes = useStyles();

    const [selectedMonth, setSelectedMonth] = useState("March");
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalSoldItems, setTotalSoldItems] = useState(0);
    const [totalUnsoldItems, setTotalUnsoldItems] = useState(0);

    useEffect(() => {
        fetchTransactionStatistics();
    }, [selectedMonth]);

    const fetchTransactionStatistics = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/transactionStatistics?month=${selectedMonth}`
            );
            const { totalAmount, totalSoldItems, totalUnsoldItems } =
                response.data;
            setTotalAmount(totalAmount);
            setTotalSoldItems(totalSoldItems);
            setTotalUnsoldItems(totalUnsoldItems);
        } catch (error) {
            console.error("Error fetching transaction statistics:", error);
        }
    };

    return (
        <div className={classes.root}>
            <h1
                style={{
                    color: "red",
                    fontSize: "20px",
                    margin: "20px",
                    textAlign: "center",
                }}
            >
                Statastics
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

            <TableContainer component={Paper}>
                <Table aria-label="transactions table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "grey" }}>
                            <TableCell style={{ fontWeight: "bold" }}>
                                Total Amount of Sale
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                                Total Sold Items
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                                Total Unsold Items
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>{totalAmount}</TableCell>
                            <TableCell>{totalSoldItems}</TableCell>
                            <TableCell>{totalUnsoldItems}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TransactionsTable;
