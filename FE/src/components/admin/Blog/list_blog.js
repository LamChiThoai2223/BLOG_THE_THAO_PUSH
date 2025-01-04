import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    fetchBlogs,
    softDelete,
    restoreBlog,
    deleteBlog,
    searchBlogs,
    approvedBlogs,
    fetchBlogsToday,
    fetchBlogsThisWeek,
    fetchBlogsLastMonth,
    fetchBlogsThreeMonthsAgo,
    fetchBlogsOneYearAgo,
    fetchAllRestorePaginator,
    fetchAllPendingPaginator,
    autoApprovePost
} from '../../../services/Blog';
import { fetchCategoryById } from '../../../services/Category';
import { fetchSportDetails } from '../../../services/Sports';
import { fetchUserDetails } from '../../../services/Users';
import { ToastContainer, toast } from 'react-toastify';
import { uniqueId } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../../../config/Api';
import { useForm } from 'react-hook-form';
import { ConfirmActionModal } from '../../Dialog';
import { fetchAllPaginator } from '../../../services/Blog';
import Paginator from "../Paginator";
import { Helmet } from "react-helmet";

const BlogList = () => {
    // Dữ liệu blog
    const [blogData, setBlogData] = useState([]);
    const [blogDataRestore, setBlogDataRestore] = useState([]);
    const [blogDataPending, setBlogDataPending] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [whyDelete, setWhyDelete] = useState('');
    const [error, setError] = useState(null);

    // Thông tin danh mục
    const [categoryNames, setCategoryNames] = useState({});
    const [sportNames, setSportNames] = useState({});
    const [userNames, setUserNames] = useState({});

    // Tìm kiếm
    const [searchKeywords, setSearchKeywords] = useState('');

    // Điều hướng trang
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [currentPageRestore, setCurrentPageRestore] = useState(1);
    const [currentPagePending, setCurrentPagePending] = useState(1);
    const [lastPageRestore, setLastPageRestore] = useState(1);
    const [lastPagePending, setLastPagePending] = useState(1);
    const [blogsPerPage] = useState(10);

    // Hiển thị modal
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState(null);
    const [item, setItem] = useState(null);

    // Tùy chọn đã chọn
    const [selectedOption, setSelectedOption] = useState('option-1');

    // Thông điệp không có dữ liệu
    const [noDataMessage, setNoDataMessage] = useState('');


    const navigate = useNavigate();

    const loadBlogs = async (page = 1) => {
        try {
            const data = await fetchAllPaginator(apiUrl, page, setBlogData, setError);
            if (data && data.meta) {
                setLastPage(data.meta.last_page);
                const sortedData = data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                await fetchAdditionalData(sortedData);

                if (sortedData.length < blogsPerPage && page < data.meta.last_page) {
                    const nextPageData = await fetchAllPaginator(apiUrl, page + 1, setBlogData, setError);
                    const nextPageBlogs = nextPageData.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    await fetchAdditionalData(nextPageBlogs);
                    return [...sortedData, ...nextPageBlogs];
                } else {
                    return sortedData;
                }
            } else {
                console.error("API response missing 'meta' or 'last_page'");
                setLastPage(1);
                return [];
            }
        } catch (err) {
            console.error("Error fetching blogs:", err);
            setError("Error fetching blogs");
            return [];
        }
    };


    const loadBlogsRestore = async (page = 1) => {
        try {
            const data = await fetchAllRestorePaginator(apiUrl, page, setBlogDataRestore, setError);
            if (data && data.meta) {
                setLastPageRestore(data.meta.last_page);
                await fetchAdditionalData(data.data);
            } else {
                console.error("API response missing 'meta' or 'last_page'");
                setLastPageRestore(1);
            }
        } catch (err) {
            console.error("Error fetching restored blogs:", err);
            setError("Error fetching restored blogs");
        }
    };

    const loadBlogsPending = async (page = 1) => {
        try {
            const data = await fetchAllPendingPaginator(apiUrl, page, setBlogDataPending, setError);
            if (data && data.meta) {
                setLastPagePending(data.meta.last_page);
                await fetchAdditionalData(data.data);
            } else {
                console.error("API response missing 'meta' or 'last_page'");
                setLastPagePending(1);
            }
        } catch (err) {
            console.error("Error fetching pending blogs:", err);
            setError("Error fetching pending blogs");
        }
    };


    useEffect(() => {
        loadBlogs(currentPage).then((data) => {
            setBlogData(data);
            setFilteredBlogs(data);
        }).catch((err) => {
            console.error("Error loading blogs:", err);
        });
    }, [currentPage]);

    const fetchAdditionalData = async (blogs) => {
        const categoryPromises = blogs
            .filter(blog => blog.category_id && !categoryNames[blog.category_id])
            .map(blog => fetchCategoryById(blog.category_id).then(data => ({ id: blog.category_id, name: data.data[0]?.name })));

        const sportPromises = blogs
            .filter(blog => blog.sport_id && !sportNames[blog.sport_id])
            .map(blog => fetchSportDetails(blog.sport_id).then(data => ({ id: blog.sport_id, name: data.data[0]?.name })));

        const userPromises = blogs
            .filter(blog => blog.author_id && !userNames[blog.author_id])
            .map(blog => fetchUserDetails(blog.author_id).then(data => ({ id: blog.author_id, name: data.data?.full_name })));

        try {
            const [categoryResults, sportResults, userResults] = await Promise.all([
                Promise.all(categoryPromises),
                Promise.all(sportPromises),
                Promise.all(userPromises)
            ]);

            const categoryMap = categoryResults.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {});
            const sportMap = sportResults.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {});
            const userMap = userResults.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {});

            setCategoryNames(prev => ({ ...prev, ...categoryMap }));
            setSportNames(prev => ({ ...prev, ...sportMap }));
            setUserNames(prev => ({ ...prev, ...userMap }));
        } catch (error) {
            console.error('Failed to fetch additional data:', error);
        }
    };


    //thoát 
    const handleCloseModal = () => {
        setShowModal(false);
        setItem(null);
        setAction(null);
    };

    const handleAction = (actionType, blogId) => {
        setAction(actionType);
        setItem(blogId);
        setShowModal(true);
    };

    const confirmSoftDelete = async () => {
        try {
            await softDelete(apiUrl, item, whyDelete, setBlogData);
            toast.success('Success: Soft Delete Blog successfully.', {
                toastId: uniqueId('toast-success'),
                containerId: 'GlobalApplicationToast',
            });

            const currentBlogs = await loadBlogs(currentPage);
            setBlogData(currentBlogs);
            setFilteredBlogs(currentBlogs);
            setWhyDelete('');
            handleCloseModal();
        } catch (error) {
            console.error('Failed to soft delete blog:', error);
            toast.error('Failed to soft delete blog.');
        }
    };


    const confirmRestore = async () => {
        try {
            await restoreBlog(apiUrl, item, setBlogData);
            toast.success('Success: Restore Blog successfully.', {
                toastId: uniqueId('toast-sucess'),
                containerId: 'GlobalApplicationToast',
            });

            loadBlogsRestore(currentPageRestore);

            const currentBlogs = await loadBlogs(currentPage);
            setBlogData(currentBlogs);
            setFilteredBlogs(currentBlogs);
        } catch (error) {
            toast.error('Failed to restore blog.');
        }
    };



    const confirmDelete = async () => {
        try {
            await deleteBlog(apiUrl, item, setBlogData);
            toast.success('Success: Delete Blog successfully.', {
                toastId: uniqueId('toast-sucess'),
                containerId: 'GlobalApplicationToast',
            });
            const currentBlogs = await loadBlogs(currentPage);
            setBlogData(currentBlogs);
            setFilteredBlogs(currentBlogs);
        } catch (error) {
            console.error('Failed to delete blog:', error);
            toast.error('Failed to delete blog.');
        }
    };


    const SearchSubmit = (e) => {
        e.preventDefault();
        if (searchKeywords.trim()) {
            searchBlogs(apiUrl, searchKeywords, setFilteredBlogs, setError);
        } else {
            setFilteredBlogs(blogData.filter(blog => !blog.is_deleted));
        }
    };

    const confirmApprove = async () => {
        try {
            await approvedBlogs(apiUrl, item, setBlogData);
            toast.success(`Success: Approve Blog successfully.`, {
                toastId: uniqueId('toast-sucess'),
                containerId: 'GlobalApplicationToast',
            });

            loadBlogsPending(currentPagePending);

            const currentBlogs = await loadBlogs(currentPage);
            setBlogData(currentBlogs);
            setFilteredBlogs(currentBlogs);
        } catch (error) {
            console.error('Failed to approve blog:', error);
            toast.error('Failed to approve blog.');
        }
    };


    const confirmReject = async () => {
        try {
            await softDelete(apiUrl, item, whyDelete, setBlogData);

            toast.success('Success: Reject Blog Successfully.', {
                toastId: uniqueId('toast-success'),
                containerId: 'GlobalApplicationToast',
            });

            loadBlogsPending(currentPagePending);

            const currentBlogs = await loadBlogs(currentPage);
            if (currentBlogs.length < blogsPerPage && currentPage < lastPage) {
                const nextPageBlogs = await loadBlogs(currentPage + 1);
                const updatedBlogs = [...currentBlogs, ...nextPageBlogs];
                setBlogData(updatedBlogs);
                setFilteredBlogs(updatedBlogs);
            } else {
                setBlogData(currentBlogs);
                setFilteredBlogs(currentBlogs);
            }

            setWhyDelete('');
            handleCloseModal();
        } catch (error) {
            console.error('Failed to reject blog:', error);
            toast.error('Failed to reject blog.');
        }
    };


    useEffect(() => {
        const fetchBlogsByDate = async () => {
            try {
                let data = [];
                switch (selectedOption) {
                    case 'option-1':
                        data = await loadBlogs(currentPage);
                        break;
                    case 'option-2':
                        data = await fetchBlogsToday(apiUrl);
                        break;
                    case 'option-3':
                        data = await fetchBlogsThisWeek(apiUrl);
                        break;
                    case 'option-4':
                        data = await fetchBlogsLastMonth(apiUrl);
                        break;
                    case 'option-5':
                        data = await fetchBlogsThreeMonthsAgo(apiUrl);
                        break;
                    case 'option-6':
                        data = await fetchBlogsOneYearAgo(apiUrl);
                        break;
                    default:
                        break;
                }

                // Kiểm tra nếu không có dữ liệu
                if (!data || data.length === 0) {
                    setNoDataMessage("Không có blog nào trong thời gian này.");
                    setBlogData([]);
                    setFilteredBlogs([]);
                } else {
                    setNoDataMessage("");
                    setBlogData(data);
                    setFilteredBlogs(data.filter(blog => !blog.is_delete && blog.status === 'approved')); // Lọc blog hợp lệ
                }
            } catch (error) {
                console.error("Error loading blogs:", error);
                setNoDataMessage("Lỗi khi tải blog.");
                setFilteredBlogs([]);
            }
        };

        fetchBlogsByDate();
    }, [selectedOption, currentPage, apiUrl]);



    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleAutoApprove = async () => {
        try {
            const result = await autoApprovePost(apiUrl, 0, 10);

            if (
                result &&
                Array.isArray(result.approvedBlogs) &&
                Array.isArray(result.rejectedBlogs)
            ) {

                loadBlogsPending(currentPagePending);
                toast.success(
                    `Post approval successful: ${result.approvedBlogs.length} posts approved, ${result.rejectedBlogs.length} posts rejected.`,
                    {
                        toastId: uniqueId('toast-success'),
                        containerId: 'GlobalApplicationToast',
                    }
                );
            } else {
                throw new Error('Dữ liệu không hợp lệ từ API.');
            }
        } catch (err) {
            console.error('Error during auto-approval:', err);
            toast.error('Failed: Automatic browsing.');
        }
    };




    return (
        <div className='app'>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className='app-wrapper-admin'>
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl card">

                        <div className="card-body">
                            <div className="row g-3 mb-4 align-items-center justify-content-between">
                                <div className="col-auto">
                                    <h1 className="app-page-title mb-0">Blog List</h1>
                                </div>
                                <div className="col-auto">
                                    <div className="page-utilities">
                                        <div className="row g-2 justify-content-start justify-content-md-end align-items-center">

                                            <div className="col-auto">
                                                <form className="table-search-form row gx-1 align-items-center" onSubmit={SearchSubmit}>
                                                    <div className="col-auto">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter search keywords"
                                                            value={searchKeywords}
                                                            onChange={(e) => setSearchKeywords(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-auto">
                                                        <button type="submit" className="btn app-btn-secondary">Search</button>
                                                    </div>
                                                </form>
                                            </div>


                                            <div className="col-auto">
                                                <select className="form-select w-auto" onChange={handleChange} value={selectedOption}>
                                                    <option selected value="option-1">All</option>
                                                    <option value="option-2">Today</option>
                                                    <option value="option-3">This Week</option>
                                                    <option value="option-4">This Month</option>
                                                    <option value="option-5">Last 3 Months</option>
                                                    <option value="option-6">Last Year</option>
                                                </select>
                                            </div>


                                            <div className="col-auto">
                                                <a className="btn app-btn-secondary" href="#">
                                                    <svg
                                                        width="1em"
                                                        height="1em"
                                                        viewBox="0 0 16 16"
                                                        className="bi bi-download me-1"
                                                        fill="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                                                        />
                                                    </svg>
                                                    Download CSV
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <nav id="orders-table-tab"
                                className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
                                <a className="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab"
                                    href="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">Approved</a>
                                <a className="flex-sm-fill text-sm-center nav-link" id="orders-paid-tab" data-bs-toggle="tab"
                                    href="#orders-paid" role="tab" aria-controls="orders-paid"
                                    aria-selected="false" onClick={() => loadBlogsPending(currentPagePending)}>Pending</a>
                                <a className="flex-sm-fill text-sm-center nav-link" id="orders-cancelled-tab" data-bs-toggle="tab"
                                    href="#orders-cancelled" role="tab" aria-controls="orders-cancelled"
                                    aria-selected="false" onClick={() => loadBlogsRestore(currentPageRestore)}>Restore</a>
                            </nav>

                            <div className="tab-content" id="orders-table-tab-content">
                                <div className="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
                                    <div className="app-card app-card-orders-table shadow-sm mb-5">
                                        <div className="app-card-body">
                                            <div className="table-responsive">
                                                <table className="table app-table-hover mb-0 text-left">
                                                    <thead>
                                                        <tr>
                                                            <th className="cell">#</th>
                                                            <th className="cell">Title Blog</th>
                                                            <th className="cell">Category</th>
                                                            <th className="cell">Sport</th>
                                                            <th className="cell">Status</th>
                                                            <th className="cell">Poster</th>
                                                            <th className="cell"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredBlogs.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="6" className="text-center">{noDataMessage || "Không có blog nào trong thời gian này."}</td>
                                                            </tr>
                                                        ) : (
                                                            filteredBlogs.map((blog, index) => (
                                                                <tr key={index}>
                                                                    <td className="cell">{(currentPage - 1) * 10 + index + 1}</td>
                                                                    <td className="cell text-truncate" style={{ maxWidth: '400px' }}>{blog.title}</td>
                                                                    <td className="cell">{categoryNames[blog.category_id]}</td>
                                                                    <td className="cell">{sportNames[blog.sport_id]}</td>
                                                                    <td className="cell">
                                                                        <span className={`badge ${blog.status === 'approved' ? 'bg-success' : blog.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                                                                            {blog.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell">{userNames[blog.author_id]}</td>
                                                                    <td className="cell text-end">
                                                                        <Link className="btn-sm app-btn-secondary m-2" to={`/admin/blogs/detail/${blog.blog_id}`}>
                                                                            <i className="fa-regular fa-eye"></i>
                                                                        </Link>
                                                                        <Link className="btn-sm app-btn-secondary m-2" to={`/admin/blogs/edit/${blog.blog_id}`}>
                                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                                        </Link>
                                                                        <button className="btn-sm app-btn-secondary m-2" onClick={() => handleAction('softDelete', blog.blog_id)}>
                                                                            <i className="bi bi-trash"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <Paginator
                                        currentPage={currentPage}
                                        lastPage={lastPage}
                                        setCurrentPage={setCurrentPage}
                                        fetchData={loadBlogs}
                                    />
                                </div>
                                <div class="tab-pane fade" id="orders-paid" role="tabpanel" aria-labelledby="orders-paid-tab">
                                    <div class="app-card app-card-orders-table mb-5">
                                        <div class="app-card-body">
                                            <div className="d-flex justify-content-between mb-3">
                                                <button className="btn-sm app-btn-secondary m-2" onClick={handleAutoApprove}>browse automatically</button>
                                            </div>
                                            <div class="table-responsive">

                                                <table className="table app-table-hover mb-0 text-left">
                                                    <thead>
                                                        <tr>
                                                            <th className="cell">#</th>
                                                            <th className="cell">Title Blog</th>
                                                            <th className="cell">Category</th>
                                                            <th className="cell">Sport</th>
                                                            <th className="cell">Status</th>
                                                            <th className="cell">Poster</th>
                                                            <th className="cell"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {blogDataPending.filter(blog => !blog.is_delete && blog.status === 'pending').map((blog, index) => (
                                                            <tr key={index}>
                                                                <td className="cell">{index + 1}</td>
                                                                <td className="cell text-truncate" style={{ maxWidth: '400px' }}>{blog.title}</td>
                                                                <td className="cell">{categoryNames[blog.category_id]}</td>
                                                                <td className="cell">{sportNames[blog.sport_id]}</td>
                                                                <td className="cell">
                                                                    <span
                                                                        className={`badge ${blog.status === 'approved' ? 'bg-success' : blog.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}
                                                                    >
                                                                        {blog.status}
                                                                    </span>
                                                                </td>
                                                                <td className="cell">{userNames[blog.author_id]}</td>
                                                                <td className="cell text-end">
                                                                    <button className="btn-sm app-btn-secondary m-2" onClick={() => handleAction('approve', blog.blog_id)}><i class="fa-solid fa-check"></i></button>
                                                                    <button className="btn-sm app-btn-secondary m-2" onClick={() => handleAction('reject', blog.blog_id)}><i class="fa-solid fa-x"></i></button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <Paginator
                                        currentPage={currentPagePending}
                                        lastPage={lastPagePending}
                                        setCurrentPage={setCurrentPagePending}
                                        fetchData={loadBlogsPending}
                                    />
                                </div>
                                <div className="tab-pane fade" id="orders-cancelled" role="tabpanel" aria-labelledby="orders-cancelled-tab">
                                    <div className="app-card app-card-orders-table mb-5">
                                        <div className="app-card-body">
                                            <div className="table-responsive">
                                                <table className="table mb-0 text-left">
                                                    <thead>
                                                        <tr>
                                                            <th className="cell">#</th>
                                                            <th className="cell">Title Blog</th>
                                                            <th className="cell">Category</th>
                                                            <th className="cell">Sport</th>
                                                            <th className="cell">Status</th>
                                                            <th className="cell">Poster</th>
                                                            <th className="cell"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {blogDataRestore.filter(blog => blog.is_delete !== 0).map((blog, index) => (
                                                            <tr key={index}>
                                                                <td className="cell">{index + 1}</td>
                                                                <td className="cell text-truncate" style={{ maxWidth: '400px' }}>{blog.title}</td>
                                                                <td className="cell">{categoryNames[blog.category_id]}</td>
                                                                <td className="cell">{sportNames[blog.sport_id]}</td>
                                                                <td className="cell">
                                                                    <span
                                                                        className={`badge ${blog.status === 'approved' ? 'bg-success' : blog.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}
                                                                    >
                                                                        {blog.status}
                                                                    </span>
                                                                </td>
                                                                <td className="cell">{userNames[blog.author_id]}</td>
                                                                <td className="cell text-end">
                                                                    <button className="btn-sm app-btn-secondary m-2" onClick={() => handleAction('restore', blog.blog_id)}><i class="bi bi-arrow-clockwise"></i></button>
                                                                    <button className="btn-sm app-btn-secondary m-2" onClick={() => handleAction('delete', blog.blog_id)}><i className="bi bi-trash"></i></button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <Paginator
                                        currentPage={currentPageRestore}
                                        lastPage={lastPageRestore}
                                        setCurrentPage={setCurrentPageRestore}
                                        fetchData={loadBlogsRestore}
                                    />
                                </div>
                            </div>
                            <ConfirmActionModal
                                show={showModal}
                                onClose={handleCloseModal}
                                onConfirm={() => {
                                    switch (action) {
                                        case 'softDelete':
                                            confirmSoftDelete();
                                            break;
                                        case 'restore':
                                            confirmRestore();
                                            break;
                                        case 'delete':
                                            confirmDelete();
                                            break;
                                        case 'approve':
                                            confirmApprove();
                                            break;
                                        case 'reject':
                                            confirmReject();
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                title={
                                    action === 'softDelete' ? 'Confirm Soft Delete' :
                                        action === 'restore' ? 'Confirm Restore' :
                                            action === 'delete' ? 'Confirm Permanent Delete' :
                                                action === 'approve' ? 'Confirm Approval' :
                                                    'Confirm Rejection'
                                }
                                message={
                                    action === 'softDelete' ? 'Are you sure you want to soft delete this item?' :
                                        action === 'restore' ? 'Are you sure you want to restore this item?' :
                                            action === 'delete' ? 'Are you sure you want to permanently delete this item?' :
                                                action === 'approve' ? 'Are you sure you want to approve this item?' :
                                                    'Are you sure you want to reject this item?'
                                }
                                confirmButtonText={
                                    action === 'restore' ? 'Restore' :
                                        action === 'approve' ? 'Approve' :
                                            action === 'reject' ? 'Reject' :
                                                'Delete'
                                }
                            >
                                {action === 'softDelete' && (
                                    <div className="form-group mt-3">
                                        <label htmlFor="whyDelete">Reason for Soft Delete:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="whyDelete"
                                            value={whyDelete}
                                            onChange={(e) => setWhyDelete(e.target.value)}
                                            placeholder="Enter reason for soft delete"
                                        />
                                    </div>
                                )}
                                {action === 'reject' && (
                                    <div className="form-group mt-3">
                                        <label htmlFor="whyDelete">Reason for Rejection:</label>
                                        <textarea
                                            className="form-control"
                                            id="whyDelete"
                                            value={whyDelete}
                                            onChange={(e) => setWhyDelete(e.target.value)}
                                            placeholder="Enter reason for rejection"
                                            rows="3"
                                        />
                                    </div>
                                )}
                            </ConfirmActionModal>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                autoClose={1000}
                closeOnClick
                pauseOnHover
                containerId="GlobalApplicationToast"
            />
        </div>
    );
};

export default BlogList;
