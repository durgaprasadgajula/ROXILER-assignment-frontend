import React from "react";
import TransactionsTable from "./components/allTransactions";
import Statastics from "./components/statastics";
// import Barchart from "./components/barChart.js";
import BarCharts from "./components/barChart.js";
import PieChartComponent from "./components/pieChart/index.js";

const App = () => {
    return (
        <div>
            <TransactionsTable />
            <Statastics />
            <BarCharts />
            <PieChartComponent />
        </div>
    );
};

export default App;
