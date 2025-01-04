import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { Helmet } from "react-helmet";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CommentsChart = () => {
  const [timeframe, setTimeframe] = useState("This week");

  const data = {
    labels: ["Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
    datasets: [
      {
        label: "Bình luận",
        backgroundColor: "rgba(153,102,255,0.2)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(153,102,255,0.4)",
        hoverBorderColor: "rgba(153,102,255,1)",
        data: [75, 69, 90, 91, 66, 65, 50],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="app">
      <Helmet>
        <title>Chart Comment</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="container mt-4">
          <div className="app-card app-card-chart h-100 shadow-sm">
            <div className="app-card-header p-3">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <h4 className="app-card-title">Thống kê bình luận</h4>
                </div>
                <div className="col-auto">
                  <div className="card-header-action">
                    <Link to="/admin/list-comment">Tới bảng</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="app-card-body p-3 p-lg-4">
              <div className="mb-3 d-flex">
                {/* Uncomment if you want to add a timeframe selector */}
                {/* <select
                                className="form-select form-select-sm ms-auto d-inline-flex w-auto"
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                            >
                                <option value="This week">This week</option>
                                <option value="Today">Today</option>
                                <option value="This Month">This Month</option>
                                <option value="This Year">This Year</option>
                            </select> */}
              </div>
              <div className="chart-container" style={{ height: "400px" }}>
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsChart;
