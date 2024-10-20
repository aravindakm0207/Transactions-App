import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,  
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ selectedMonth }) => {
  const [priceRanges, setPriceRanges] = useState({});

  const fetchBarChart = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/barchart`, {
        params: { month: selectedMonth },
      });
      console.log('Bar chart data:', response.data);
      setPriceRanges(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (selectedMonth) {
      fetchBarChart();
    }
  }, [selectedMonth, fetchBarChart]);

  const data = {
    labels: Object.keys(priceRanges),
    datasets: [
      {
        label: "# of Products",
        data: Object.values(priceRanges),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (!Object.keys(priceRanges).length) {
    return <p>No data available for this month</p>;
  }

  return (
    <div>
      <h3>Price Range Distribution</h3>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
