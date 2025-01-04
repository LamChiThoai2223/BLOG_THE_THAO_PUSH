import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Helmet } from "react-helmet";

ChartJS.register(ArcElement, Tooltip, Legend);

const RatingsChart = () => {
  const data = {
    labels: ["Rất hài lòng", "Hài lòng", "Vừa", "Tệ", "Rất tệ"],
    datasets: [
      {
        label: "Đánh giá",
        data: [30, 25, 20, 15, 10], // Sample data
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
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
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="app">
      <Helmet>
        <title>Chart Rating</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="container mt-4">
          <div className="app-card app-card-chart h-100 shadow-sm">
            <div className="app-card-header p-3">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <h4 className="app-card-title">Thống kê đánh giá</h4>
                </div>
                <div className="col-auto">
                  <div className="card-header-action">
                    <Link to="/admin/list-rating">Tới bảng</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="app-card-body p-3 p-lg-4">
              <div className="chart-container chart-rating">
                <Pie data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingsChart;
