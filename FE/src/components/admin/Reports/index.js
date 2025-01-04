import React, { useEffect, useState } from "react";
import { fetchAllReports, deleteReport } from "../../../services/Reports";
import { apiUrl } from "../../../config/Api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { reviewReport } from "../../../services/Reports";
import "react-toastify/dist/ReactToastify.css";
import Paginator from "../Paginator";

const ConfirmAuthor = () => {
  const [reportData, setReportsData] = useState([]);
  const [error, setError] = useState(null);
  const [reportCurrentPage, setRportCurrentPage] = useState(1);
  const [reportLastPage, setReportLastPage] = useState(1);

  const fetchReportsPagi = async (page = 1) => {
    fetchAllReports(apiUrl, page, setReportsData, setError)
      .then((response) => {
        if (response && response.meta) {
          setReportLastPage(response.meta.last_page);
        } else {
          console.error("API response thiếu 'meta' hoặc 'last_page'");
          setReportLastPage(1);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu báo cáo:", err);
        setError("Lỗi khi lấy dữ liệu báo cáo");
      });
  };
  console.log(reportData);

  const deleteReports = async (reportId) => {
    try {
      console.log("Deleting report:", reportId);
      const response = await deleteReport(apiUrl, reportId);
      console.log("Delete response:", response);
      toast.success("Report permanently deleted!", { autoClose: 1000 });

      // Refresh dữ liệu
      fetchReportsPagi(
        apiUrl,
        reportCurrentPage,
        setReportsData,
        setError,
        setReportLastPage
      );
    } catch (err) {
      console.error("Delete report error:", err);
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleReviewAllReports = async () => {
    if (reportData.length === 0) {
      toast.info("No reports to review.");
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    // Tạo mảng các promises để xử lý từng báo cáo
    const reviewPromises = reportData.map((report) =>
      reviewReport(apiUrl, report.blog_id)
        .then(() => {
          successCount++;
          // Sau khi kiểm tra thành công, đánh dấu báo cáo đã duyệt
        })
        .catch((error) => {
          console.error(`Failed to review post ${report.blog_id}:`, error.message);
          errorCount++;
        })
    );

    await Promise.all(reviewPromises);

    try {
      toast.success(`All reports reviewed: ${successCount} success, ${errorCount} failed. All reports deleted.`);
    } catch (error) {
      console.error("Error deleting reports:", error);
      toast.error("An error occurred while deleting the reports.");
    }

    // Làm mới dữ liệu báo cáo
    fetchReportsPagi(reportCurrentPage);
  };


  return (
    <div className="app">
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <div className="row g-3 mb-4 align-items-center justify-content-between">
                <span className="profile-info-author-title me-3">
                  List Reports
                </span>
              </div>

              <nav
                id="orders-table-tab"
                className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4"
              >
                <Link
                  className="flex-sm-fill text-sm-center nav-link active"
                  id="orders-all-tab"
                  data-bs-toggle="tab"
                  to="#orders-all"
                  role="tab"
                  aria-controls="orders-all"
                  aria-selected="true"
                >
                  All
                </Link>
              </nav>

              <div className="tab-content" id="orders-table-tab-content">
                <div
                  className="tab-pane fade show active"
                  id="orders-all"
                  role="tabpanel"
                  aria-labelledby="orders-all-tab"
                >
                  <div className="app-card app-card-orders-table shadow-sm mb-5">
                    <div className="app-card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <button className="btn-sm app-btn-secondary m-2" onClick={handleReviewAllReports}>browse reports</button>
                      </div>
                      <div className="table-responsive">
                        <table className="table app-table-hover mb-0 text-left text-md-center">
                          <thead>
                            <tr>
                              <th className="cell">#</th>
                              <th className="cell">Blogs</th>
                              <th className="cell">User</th>
                              <th className="cell">Status</th>
                              <th className="cell">Reason for reporting</th>
                              <th className="cell"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {reportData.map((report, index) => {
                              return (
                                <tr key={report.blog_image}>
                                  <td className="cell"> {(reportCurrentPage - 1) * 10 + index + 1}</td>
                                  <td className="cell">
                                    <img
                                      src={report.blog_image}
                                      // alt={}
                                      style={{
                                        width: "80px",
                                        height: "50px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </td>
                                  <td className="cell">{report.reported_by}</td>
                                  <td className="cell">
                                    <span
                                      className={`badge ${report.status === "pending"
                                        ? "bg-danger"
                                        : "bg-success"
                                        }`}
                                    >
                                      {report.status}
                                    </span>
                                  </td>
                                  <td className="cell">{report.reason}</td>
                                  <td
                                    className="cell text-end"
                                    onClick={() =>
                                      deleteReports(report.report_id)
                                    }
                                  >
                                    <button className="btn-sm app-btn-secondary m-2">
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                            {reportData.length === 0 && (
                              <tr>
                                <td colSpan="7" className="text-center">
                                  No confirmed authors found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <Paginator
                    currentPage={reportCurrentPage}
                    lastPage={reportLastPage}
                    setCurrentPage={setRportCurrentPage}
                    fetchData={fetchReportsPagi}
                  />
                </div>
              </div>

              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmAuthor;
