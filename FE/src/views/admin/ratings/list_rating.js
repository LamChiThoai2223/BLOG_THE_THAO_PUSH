import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const RatingList = () => {
  const [ratings, setratings] = useState([]);

  useEffect(() => {
    // Fetch categories từ API hoặc dữ liệu mẫu
    setratings([
      {
        id: 1,
        post_id: 1,
        user_id: 2,
        rating: 3,
        create_at: "15-07-2024",
      },
      {
        id: 2,
        post_id: 2,
        user_id: 3,
        rating: 3,
        create_at: "15-07-2024",
      },
      {
        id: 3,
        post_id: 2,
        user_id: 4,
        rating: 3,
        create_at: "15-07-2024",
      },
    ]);
  }, []);
  return (
    <div className="app">
      <Helmet>
        <title>List Rating</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                  <h1 className="app-page-title mb-0">Danh sách đánh giá</h1>
                </div>
                <div className="col-auto">
                  <div className="page-utilities">
                    <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                      <div className="col-auto">
                        <form className="table-search-form row gx-1 align-items-center">
                          <div className="col-auto">
                            <input
                              type="text"
                              id="search-orders"
                              name="searchorders"
                              className="form-control search-orders"
                              placeholder="Nội dung tìm kiếm.."
                            />
                          </div>
                          <div className="col-auto">
                            <button
                              type="submit"
                              className="btn app-btn-secondary"
                            >
                              Tìm kiếm
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-auto">
                        <select className="form-select w-auto">
                          <option selected value="option-1">
                            Tất cả
                          </option>
                          <option value="option-2">Trong một tuần</option>
                          <option value="option-3">Trong một tháng</option>
                          <option value="option-4">Last ba tháng</option>
                        </select>
                      </div>
                      <div className="col-auto">
                        <Link className="btn app-btn-secondary" to="#">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-download me-1"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                            />
                          </svg>
                          Tải về
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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
                  Tất cả
                </Link>
                <Link
                  className="flex-sm-fill text-sm-center nav-link"
                  id="orders-paid-tab"
                  data-bs-toggle="tab"
                  to="#orders-paid"
                  role="tab"
                  aria-controls="orders-paid"
                  aria-selected="false"
                >
                  Chờ duyệt
                </Link>
                <Link
                  className="flex-sm-fill text-sm-center nav-link"
                  id="orders-pending-tab"
                  data-bs-toggle="tab"
                  to="#orders-pending"
                  role="tab"
                  aria-controls="orders-pending"
                  aria-selected="false"
                >
                  Hoạt động
                </Link>
                <Link
                  className="flex-sm-fill text-sm-center nav-link"
                  id="orders-cancelled-tab"
                  data-bs-toggle="tab"
                  to="#orders-cancelled"
                  role="tab"
                  aria-controls="orders-cancelled"
                  aria-selected="false"
                >
                  Khóa
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
                      <div className="table-responsive">
                        <table className="table app-table-hover mb-0 text-left text-md-center">
                          <thead>
                            <tr>
                              <th className="cell">Stt</th>
                              <th className="cell">Bài viết</th>
                              <th className="cell">Người dùng</th>
                              <th className="cell">Đánh giá</th>
                              <th className="cell">Ngày đánh giá</th>
                              <th className="cell"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {ratings.map((rating, index) => (
                              <tr key={index}>
                                <td className="cell">{index + 1}</td>
                                <td className="cell">
                                  <span className="truncate">
                                    {rating.post_id}
                                  </span>
                                </td>
                                <td className="cell">{rating.user_id}</td>
                                <td className="cell">
                                  {rating.rating} <i class="bi bi-star"></i>
                                </td>
                                <td className="cell">
                                  <span className="badge bg-success">
                                    {rating.create_at}
                                  </span>
                                </td>
                                <td className="cell">
                                  <Link
                                    className="btn-sm app-btn-secondary m-2"
                                    to={`/admin/detail-rating/${rating.id}`}
                                  >
                                    <i class="bi bi-eye"></i>
                                  </Link>
                                  <button className="btn-sm app-btn-secondary danger">
                                    <i class="bi bi-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <nav className="app-pagination">
                    <ul className="pagination justify-content-center">
                      <li className="page-item disabled">
                        <Link
                          className="page-link d-flex"
                          to="#"
                          tabindex="-1"
                          aria-disabled="true"
                        >
                          Trước
                        </Link>
                      </li>
                      <li className="page-item active">
                        <Link className="page-link" to="#">
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          Sau
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RatingList;
