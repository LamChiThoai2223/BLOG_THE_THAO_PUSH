import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Helmet } from 'react-helmet';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BlogsChart = () => {
    const [timeframe, setTimeframe] = useState('This week'); 
    const [chartData, setChartData] = useState({
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Posts',
                backgroundColor: 'rgba(255,159,64,0.2)',
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,159,64,0.4)',
                hoverBorderColor: 'rgba(255,159,64,1)',
                data: Array(12).fill(0) 
            }
        ]
    });

    useEffect(() => {
        fetch('http://localhost:4200/api/blogs')
            .then(response => response.json())
            .then(data => {
                const blogs = data.data; 
                updateChartData(blogs); 
            })
            .catch(error => console.error('Error fetching blogs data:', error));
    }, []);

    const updateChartData = (blogs) => {
        let filteredBlogs = blogs;
        const now = new Date();

        if (timeframe === 'This week') {
            const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            filteredBlogs = blogs.filter(blog => new Date(blog.created_at) >= startOfWeek);
        } else if (timeframe === 'Today') {
            const today = new Date(now.setHours(0, 0, 0, 0));
            filteredBlogs = blogs.filter(blog => new Date(blog.created_at) >= today);
        } else if (timeframe === 'This Month') {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            filteredBlogs = blogs.filter(blog => new Date(blog.created_at) >= startOfMonth);
        } else if (timeframe === 'This Year') {
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            filteredBlogs = blogs.filter(blog => new Date(blog.created_at) >= startOfYear);
        }

        const monthlyPostCounts = Array(12).fill(0);
        filteredBlogs.forEach(blog => {
            const createdAt = new Date(blog.created_at);
            const month = createdAt.getMonth();
            monthlyPostCounts[month] += 1; 
        });

        setChartData(prevData => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: monthlyPostCounts 
                }
            ]
        }));
    };

    // Cập nhật biểu đồ khi thời gian thay đổi
    useEffect(() => {
        fetch('http://localhost:4200/api/blogs')
            .then(response => response.json())
            .then(data => {
                updateChartData(data.data);
            })
            .catch(error => console.error('Error fetching blogs data:', error));
    }, [timeframe]);

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className='app'>
            <Helmet>
        <title>Chart Blog</title>
      </Helmet>
            <div className='app-wrapper-admin'>
                <div className='container mt-4'>
                    <div className="app-card app-card-chart h-100 shadow-sm">
                        <div className="app-card-header p-3">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto">
                                    <h4 className="app-card-title">Post Statistics</h4>
                                </div>
                                <div className="col-auto">
                                    <div className="card-header-action">
                                        <Link to="/admin/blogs/list">Go to table</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="app-card-body p-3 p-lg-4">
                            <div className="mb-3 d-flex">
                                <select
                                    className="form-select form-select-sm ms-auto d-inline-flex w-auto"
                                    value={timeframe}
                                    onChange={(e) => setTimeframe(e.target.value)}
                                >
                                    <option value="This week">This Week</option>
                                    <option value="Today">Today</option>
                                    <option value="This Month">This Month</option>
                                    <option value="This Year">This Year</option>
                                </select>
                            </div>
                            <div className="chart-container" style={{ height: '400px' }}>
                                <Bar data={chartData} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsChart;
