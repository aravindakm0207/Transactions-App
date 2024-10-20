import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

 
  const fetchTransactions = useCallback(async () => {
    try {
      const params = {
        search: search,
        page: page,
        limit: 2,
      };

     
      if (selectedMonth) {
        params.month = selectedMonth;
      }

      const response = await axios.get(`http://localhost:4000/api/products/list`, { params });
      console.log('Transaction data:', response.data);
      setTransactions(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [selectedMonth, search, page]); 

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]); 

  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Sold</th>
            <th>Category</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>{transaction.category}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
