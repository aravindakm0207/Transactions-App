import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/statistics`, {
        params: { month: selectedMonth },
      });
      console.log('Statistics data:', response.data);
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  }, [selectedMonth]); 

  useEffect(() => {
    if (selectedMonth) {
      fetchStatistics();
    }
  }, [selectedMonth, fetchStatistics]); 

  return (
    <div>
      <h3>Statistics for Month {selectedMonth}</h3>
      <p>Total Sale Amount: {statistics.totalSaleAmount || 0}</p>
      <p>Total Sold Items: {statistics.totalSoldItems || 0}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems || 0}</p>
    </div>
  );
};

export default Statistics;
