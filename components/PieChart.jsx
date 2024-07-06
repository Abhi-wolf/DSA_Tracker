"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Questions Done",
        data: [data.easy, data.medium, data.hard],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", // Easy
          "rgba(255, 205, 86, 0.2)", // Medium
          "rgba(255, 99, 132, 0.2)", // Hard
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Easy
          "rgba(255, 205, 86, 1)", // Medium
          "rgba(255, 99, 132, 1)", // Hard
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-[35%] m-auto flex flex-col justify-center items-center gap-4">
      <Pie data={chartData} options={options} />
      <p className="text-xs text-muted-foreground">Questions Done</p>
    </div>
  );
};

export default PieChart;
