import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

import { Bar } from "react-chartjs-2";
import axios from "axios";

const TransactionChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/transactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });

    axios
      .get("http://localhost:5000/customers")
      .then((response) => {
        setCustomers(response.data.map((customer) => customer.name));
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  // Filter transactions for the selected customer
  const filteredTransactions = selectedCustomer
    ? transactions.filter((t) => t.customer_id === selectedCustomer)
    : transactions;

  // Group transactions by date and calculate total amount per day
  const groupedData = {};
  filteredTransactions.forEach((t) => {
    const date = t.date;
    if (!groupedData[date]) {
      groupedData[date] = 0;
    }
    groupedData[date] += t.amount;
  });

  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Total Amount / Day",
        data: Object.values(groupedData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-gray-100 m-4 grid justify-items-center">
      <label
        htmlFor="customerSelect"
        className="block pt-4 text-lg font-medium"
      >
        Select a customer :
      </label>
      <select
        id="customerSelect"
        name="customer"
        className="p-2 border rounded"
        onChange={(e) => setSelectedCustomer(Number(e.target.value))}
      >
        <option value="">All customers</option>
        {customers.map((customer, index) => (
          <option key={index} value={index + 1}>
            {customer}
          </option>
        ))}
      </select>
      <div style={{ height: "300px", marginTop: "20px" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default TransactionChart;
