import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./components/PieChart/index.jsx";
import BarChart  from "./components/BarChart/index.jsx";
import LineChart  from "./components/LineChart/index.jsx";

Chart.register(CategoryScale);

const App = () => {

  const [data, setData] = useState();
  
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:8080/')
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.error('Error fetching data:', error));
    };
  
    fetchData();
  
    const intervalId = setInterval(fetchData, 2000);
  
    return () => clearInterval(intervalId);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map((item) => item.randomYear),
    datasets: [
      {
        label: "Users Gained",
        data: data.map((item) => item.females),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };
  return (
    <div className="App">
      <PieChart chartData={chartData} />
      <BarChart chartData={chartData} />
      <LineChart chartData={chartData} />
    </div>
  );
};

export default App;
