import { useState, useEffect } from "react";
// import axios from "axios";
import db from "./db";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [customerFilter, setCustomerFilter] = useState("");
  const [minAmountFilter, setMinAmountFilter] = useState(0);
  const [maxAmountFilter, setMaxAmountFilter] = useState(10000);

  useEffect(() => {
    const fetchLocalData = () => {
      // Use the imported data from db.js
      setTransactions(db.transactions);
      setCustomers(db.customers);
    };

    // const fetchFromAxios = () => {
    //   axios
    //     .get("http://localhost:5000/transactions")
    //     .then((response) => setTransactions(response.data))
    //     .catch((error) => console.error("Error fetching transactions:", error));

    //   axios
    //     .get("http://localhost:5000/customers")
    //     .then((response) => setCustomers(response.data))
    //     .catch((error) => console.error("Error fetching customers:", error));
    // };

    fetchLocalData();
  }, []);

  // Update filtered transactions when customer filter changes
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const customer = customers.find((c) => c.id == transaction.customer_id);
      const customerName = customer?.name || ""; // Default to an empty string if customerName is null or undefined
      return (
        customerName.toLowerCase().includes(customerFilter.toLowerCase()) &&
        transaction.amount >= minAmountFilter &&
        transaction.amount <= maxAmountFilter
      );
    });
    setFilteredTransactions(filtered);
  }, [
    transactions,
    customers,
    customerFilter,
    minAmountFilter,
    maxAmountFilter,
  ]);

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Transaction List</h2>
      <div className="flex flex-row">
        <div className="mb-4 basis-1/3">
          <label htmlFor="customerNameF" className="block text-sm font-medium">
            Filter by Customer Name:
          </label>
          <input
            placeholder="Write Name"
            type="text"
            id="customerNameF"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4 basis-1/3">
          <label htmlFor="minAmount" className="block text-sm font-medium">
            Filter by Amount (Min):
          </label>
          <input
            type="number"
            id="minAmount"
            value={minAmountFilter}
            onChange={(e) => setMinAmountFilter(+e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4 basis-1/3">
          <label htmlFor="maxAmount" className="block text-sm font-medium">
            Filter by Amount (Max):
          </label>
          <input
            type="number"
            id="maxAmount"
            value={maxAmountFilter}
            onChange={(e) => setMaxAmountFilter(+e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2 text-left">Customer Name</th>
            <th className="border p-2 text-left">Amount</th>
            <th className="border p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border p-2">
                {customers.find((c) => c.id == transaction.customer_id)?.name}
              </td>
              <td className="border p-2">${transaction.amount.toFixed(2)}</td>
              <td className="border p-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
