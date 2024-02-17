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
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: "70%", // Set width to 50%
        height: "50%", // Set height to 50%
        margin: "auto", // Center the table horizontally
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const TransactionsTable = () => {
    const classes = useStyles();
    const [transactions, setTransactions] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("March");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10; // Define the number of transactions per page

    useEffect(() => {
        fetchTransactions();
    }, [selectedMonth, searchText, currentPage]);

    const fetchTransactions = async () => {
        try {
            const encodedSearch = encodeURIComponent(searchText);
            const response = await axios.get(
                `http://localhost:3000/transactions?page=${currentPage}&perPage=${perPage}&search=${encodedSearch}&month=${selectedMonth}`
            );
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleSearch = () => {
        fetchTransactions();
    };

    const handleClearSearch = () => {
        setSearchText("");
        fetchTransactions();
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div
            className={classes.root}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
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
                <TextField
                    label="Search transaction"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Box>

            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    style={{ margin: "10px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Search
                </Button>
                <Button variant="contained" onClick={handleClearSearch}>
                    Clear
                </Button>
            </Box>
            <h1
                style={{
                    color: "red",
                    fontSize: "20px",
                    margin: "20px",
                    textAlign: "center",
                }}
            >
                Total Transactions
            </h1>

            <TableContainer component={Paper}>
                <Table aria-label="transactions table">
                    <TableHead
                        style={{
                            backgroundColor: "grey",
                            color: "white !important",
                        }}
                    >
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Sold</TableCell>
                            <TableCell>Date of Sale</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.title}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.price}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>
                                    {transaction.sold ? "Yes" : "No"}
                                </TableCell>
                                <TableCell>{transaction.dateOfSale}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    style={{ margin: "2px" }}
                    variant="contained"
                    color="primary"
                    onClick={handlePreviousPage}
                >
                    Previous
                </Button>
                <Button
                    style={{ margin: "2px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleNextPage}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default TransactionsTable;
