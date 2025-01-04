import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { fetchLikes, totalLikes, totalLikesInDay } from "../../../../services/Like";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const LikesList = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [total, setTotalLikes] = useState(0);
  const [totalInDay, setTotalLikesInDay] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu lượt like từ API
    fetchLikes(handleLikeData, setError);
    totalLikes((response) => {
      console.log("Total Likes Response:", response); // Log dữ liệu
      if (response.data && response.data.length > 0) {
        setTotalLikes(response.data[0].total_likes || 0); // Cập nhật tổng lượt like
      }
    }, setError);
    totalLikesInDay((response) => {
      console.log("Total Likes in Day Response:", response); // Log dữ liệu
      if (response.data && response.data.length > 0) {
        setTotalLikesInDay(response.data[0].total_likes || 0); // Cập nhật lượt like trong ngày
      }
    }, setError);
  }, []);

  const handleLikeData = (data) => {
  if (!data || !Array.isArray(data)) {
    setError("Invalid data format");
    return;
  }

  console.log('Raw Like Data:', data);

  const likesByPostAndDate = {};
  const totalLikesByDate = {};
  const today = new Date();
  const labels = [];

  // Tạo các nhãn cho ngày
  for (let i = 3; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toISOString().split("T")[0]);
  }

  labels.forEach((date) => {
    totalLikesByDate[date] = 0; // Khởi tạo giá trị cho mỗi ngày
  });

  // Xử lý dữ liệu
  data.forEach((item) => {
    // Giả định rằng item có postTitle và total_likes
    const todayString = new Date().toISOString().split("T")[0];

    // Nếu ngày hiện tại, cộng lượt like vào ngày đó
    if (labels.includes(todayString)) {
      totalLikesByDate[todayString] += item.total_likes; // Cộng tổng lượt like cho ngày hiện tại
    }

    // Nếu postTitle chưa tồn tại, khởi tạo
    if (!likesByPostAndDate[item.postTitle]) {
      likesByPostAndDate[item.postTitle] = {};
      labels.forEach((date) => (likesByPostAndDate[item.postTitle][date] = 0));
    }

    // Cập nhật lượt like cho bài viết
    likesByPostAndDate[item.postTitle][todayString] += item.total_likes;
  });

  console.log('Likes By Post and Date:', likesByPostAndDate);
  console.log('Total Likes By Date:', totalLikesByDate);

  // Tạo datasets cho biểu đồ
  const datasets = Object.keys(likesByPostAndDate).map((postTitle) => ({
    label: postTitle,
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    borderColor: "rgba(75, 192, 192, 1)",
    data: labels.map((date) => likesByPostAndDate[postTitle][date] || 0),
    fill: false,
  }));

  datasets.push({
    label: "Total likes",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
    data: labels.map((date) => totalLikesByDate[date]),
    fill: false,
  });

  console.log('Datasets before setting:', datasets);

  setChartData({
    labels: labels,
    datasets: datasets,
  });
};


  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Likes",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div className="app">
  <div className="app-wrapper-admin">
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="app-card app-card-chart h-100 shadow-sm">
            <div className="app-card-header p-3">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <h4 className="app-card-title">Post Like Statistics</h4>
                </div>
              </div>
            </div>
            <div className="app-card-body p-3 p-lg-4">
              {error ? (
                <p>{error}</p>
              ) : (
                <div className="chart-container" style={{ height: "400px" }}>
                  <Line data={chartData} options={options} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mt-4 mt-md-0">
          <div className="card">
            <div className="card-body row">
              <div className="col-6">
                <h5 className="card-title">Total Likes</h5>
                <p className="card-text">{total} <i className="bi bi-hand-thumbs-up"></i></p>
              </div>
              <div className="col-6">
                <h5 className="card-title">Likes Today</h5>
                <p className="card-text">{totalInDay} <i className="bi bi-hand-thumbs-up"></i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default LikesList;
