import React, { useState, useEffect } from "react";
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
import { fetchViews, fetchTotalViewsBlog } from "../../../../services/View";
import "chartjs-adapter-date-fns";
import { Link, useNavigate } from "react-router-dom";
import { Url } from "../../../../config/Api";
import { Helmet } from "react-helmet";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PostsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("Today");
  const [totalViewBlog, setTotalViewBlog] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    fetchViews(handleUserData, setError);
    fetchTotalViewsBlog(setTotalViewBlog, setError);
  }, [filter]);

  const handleLinkClick = (blogId) => {
    window.location.href = `${Url}/blog/detail/${blogId}`;
  };

  const totalViewsBlog = () => {
    fetchTotalViewsBlog((data) => {
      setTotalViewBlog(data);
    }, setError);
  };

  const handleUserData = (data) => {
    if (!data || !Array.isArray(data)) {
      setError("Invalid data format");
      return;
    }

    const totalViewsByDate = {};
    const labels = getLabelsBasedOnFilter(filter);

    labels.forEach((label) => {
      totalViewsByDate[label] = 0;
    });

    data.forEach((item) => {
      if (item.view_date) {
        const viewDate = new Date(item.view_date);
        const formattedLabel = formatLabelByFilter(viewDate, filter);

        if (labels.includes(formattedLabel)) {
          totalViewsByDate[formattedLabel] += item.total_views;
        }
      }
    });

    setChartData({
      labels: labels,
      datasets: [
        {
          label: `Views per ${
            filter === "Today"
              ? "Day"
              : filter === "This Month"
              ? "Month"
              : "Year"
          }`,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          data: labels.map((label) => totalViewsByDate[label]),
        },
      ],
    });
  };

  const getLabelsBasedOnFilter = (filter) => {
    const labels = [];
    const today = new Date();

    if (filter === "Today") {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        labels.push(date.toLocaleDateString("en-CA"));
      }
    } else if (filter === "This Month") {
      for (let i = 11; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i);
        labels.push(
          date.toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
          })
        );
      }
    } else if (filter === "This Year") {
      const currentYear = today.getFullYear();
      for (let i = 5; i >= 0; i--) {
        labels.push((currentYear - i).toString());
      }
    }

    return labels;
  };

  const formatLabelByFilter = (date, filter) => {
    if (filter === "Today") {
      return date.toLocaleDateString("en-CA");
    } else if (filter === "This Month") {
      return date.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
      });
    } else if (filter === "This Year") {
      return date.getFullYear().toString();
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Function to filter totalViewBlog based on searchQuery
  const filteredViews = totalViewBlog.filter((view) =>
    view.blog_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text:
            filter === "Today"
              ? "Day"
              : filter === "This Month"
              ? "Month"
              : "Year",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Views",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="app">
      <Helmet>
        <title>Chart Blog</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 col-md">
              <div className="app-card app-card-chart p-3 h-100 shadow-sm">
                <div className="app-card-header p-3">
                  <div className="row justify-content-between align-items-center d-flex flex-lg-nowrap">
                    <div className="col-4">
                      <h4 className="app-card-title">
                        Views Statistics per {filter}
                      </h4>
                    </div>
                    <div className="col-8">
                      <select
                        className="form-select form-select-sm ms-auto d-inline-flex w-auto float-end"
                        value={filter}
                        onChange={handleFilterChange}
                      >
                        <option value="Today">Today</option>
                        <option value="This Month">This Month</option>
                        <option value="This Year">This Year</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="app-card-body p-3 p-lg-4">
                  {error ? (
                    <p>{error}</p>
                  ) : (
                    <div
                      className="chart-container"
                      style={{ height: "400px" }}
                    >
                      <Bar data={chartData} options={options} />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="btn float-end"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: 0,
                  }}
                  onClick={() => totalViewsBlog()}
                >
                  <div className="d-flex">
                    <Link className="mb-3">see details</Link>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header custom-modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="row px-4 py-2 d-flex align-items-center justify-content-between">
              <div className="col-auto m-1">
                <h4 className="modal-title" id="staticBackdropLabel">
                  Details Views
                </h4>
              </div>
              <div className="col-auto">
                <div className="input-group rounded">
                  {isSearchVisible && (
                    <input
                      type="search"
                      className="form-control rounded"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  )}
                  <span
                    className="input-group-text border-0"
                    id="search-addon"
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>

            <div
              className="table-responsive p-2"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <table className="table table-striped table-hover table-borderless table-primary align-middle">
                <thead className="table-light">
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Total views</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {Array.isArray(filteredViews) && filteredViews.length > 0 ? (
                    filteredViews.map((view, index) => (
                      <tr className="table-primary" key={index}>
                        <td scope="row">{index + 1}</td>
                        <td>{view.blog_title}</td>
                        <td>{view.total_views}</td>
                        <td>
                          <Link
                            to="#"
                            onClick={() => handleLinkClick(view.blog_id)}
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="">
                      <td colSpan="3" className="text-center w-100">
                        <h3>No data available</h3>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsChart;
