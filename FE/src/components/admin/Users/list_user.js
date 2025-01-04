import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUsers, softDeleteUser, restoreUser, deleteUser, fetchAllDeletedPaginator, sendEmailAccountLocked } from '../../../services/Users';
import { apiUrl } from '../../../config/Api';
import Paginator from '../Paginator';
import '../../../assets/css/user.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RemoveUserModal, ConfirmModal, ConfirmRestoreModal } from '../../Dialog';
import { updateInactiveBlogs } from '../../../services/Blog'
import { Helmet } from "react-helmet";

const UserList = () => {
    const [userData, setUserData] = useState([]);
    const [UserDataDeleted, setUserDataDeleted] = useState([]);
    const [error, setError] = useState(null);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmRestoreModal, setShowConfirmRestoreModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [restoreUserId, setRestoreUserId] = useState(null);
    const [reason, setReason] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [currentPageDeleted, setCurrentPageDeleted] = useState(1);
    const [lastPageDeleted, setLastPageDeleted] = useState(1);
    const loadUsers = (page = 1) => {
        fetchUsers(apiUrl, page, setUserData, setError)
            .then((data) => {
                if (data && data.meta) {
                    setLastPage(data.meta.last_page);
                } else {
                    console.error("API response missing 'meta' or 'last_page'");
                    setLastPage(1);
                }
            })
            .catch((err) => {
                console.error("Error fetching Users:", err);
                setError("Error fetching Users");
            });
    };

    const loadUsersDeleted = (page = 1) => {
        fetchAllDeletedPaginator(apiUrl, page, setUserDataDeleted, setError)
            .then((data) => {
                if (data && data.meta) {
                    setLastPageDeleted(data.meta.last_page);
                } else {
                    console.error("API response missing 'meta' or 'last_page'");
                    setLastPageDeleted(1);
                }
            })
            .catch((err) => {
                console.error("Error fetching Users:", err);
                setError("Error fetching Users");
            });
    }

    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage]);
    useEffect(() => {
        handleSearch();
    }, [searchKeyword, userData]);

    const handleShowRemoveModal = (userId) => {
        setDeleteUserId(userId);
        setShowRemoveModal(true);
    };

    const handleCloseRemoveModal = () => {
        setShowRemoveModal(false);
        setReason('');
        setDeleteUserId(null);
    };

    const handleShowConfirmModal = (action) => {
        setConfirmAction(() => action);
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
        setConfirmAction(null);
    };

    const handleShowConfirmRestoreModal = (userId) => {
        setRestoreUserId(userId);
        setShowConfirmRestoreModal(true);
    };

    const handleCloseConfirmRestoreModal = () => {
        setShowConfirmRestoreModal(false);
        setRestoreUserId(null);
    };

    const handleSoftDelete = async () => {
        const userToDelete = userData.find(user => user.user_id === deleteUserId);

        if (!userToDelete || !userToDelete.email) {
            toast.error("Email không tồn tại hoặc không tìm thấy người dùng.");
            return;
        }

        try {

            const result = await softDeleteUser(apiUrl, deleteUserId, reason, setUserData, userToDelete.email);

            if (result.success) {
                toast.success('User removed successfully!');


                const updateResult = await updateInactiveBlogs(apiUrl);
                if (updateResult.success) {
                    toast.success(`Updated ${updateResult.affectedRows} blogs for inactive user.`);
                } else {
                    toast.warning('Không có bài viết nào được cập nhật.');
                }

                handleCloseRemoveModal();
                fetchUsers(apiUrl, currentPage, setUserData, setError, setLastPage);
                fetchAllDeletedPaginator(apiUrl, currentPageDeleted, setUserDataDeleted, setError, setLastPageDeleted);
            } else {
                toast.error(`Failed to remove user: ${result.message}`);
            }
        } catch (error) {
            toast.error(`Lỗi: ${error.message}`);
        }
    };


    const confirmRestore = async () => {
        try {

            console.log("Current UserDataDeleted:", UserDataDeleted);
            console.log("Trying to restore user with ID:", restoreUserId);

            const userToRestore = UserDataDeleted.find(user => user.user_id === restoreUserId);
            const email = userToRestore ? userToRestore.email : null;

            if (!email) {
                throw new Error('Email is not defined for the user.');
            }

            await restoreUser(apiUrl, restoreUserId, email, setUserData);

            toast.success('User restored successfully!');
            fetchUsers(apiUrl, currentPage, setUserData, setError, setLastPage);
            fetchAllDeletedPaginator(apiUrl, currentPageDeleted, setUserDataDeleted, setError, setLastPageDeleted);
            handleCloseConfirmRestoreModal();
        } catch (err) {
            console.error('Restore failed:', err);
            toast.error('An error occurred while restoring the user.');
        }
    };

    const handleDelete = async (userId) => {
        handleShowConfirmModal(async () => {
            try {
                await deleteUser(apiUrl, userId, setUserData);
                toast.success('User permanently deleted successfully!');
                fetchUsers(apiUrl, currentPage, setUserData, setError, setLastPage);
                fetchAllDeletedPaginator(apiUrl, currentPageDeleted, setUserDataDeleted, setError, setLastPageDeleted);
            } catch (err) {
                console.error('Delete failed:', err);
                toast.error('An error occurred while permanently deleting the user!');
            }
        });
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };
    const itemsPerPage = 5;
    const handleSearch = () => {
        const results = userData.filter(user =>
            user.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            user.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            user.phone.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            user.full_name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setFilteredUsers(results);
    };
    { console.log(userData.filter(user => user.is_delete)) }

    return (
        <div className='app'>
            <Helmet>
                <title>List User</title>
            </Helmet>
            <div className='app-wrapper-admin'>
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl card">
                        <div className="card-body">
                            <div className="row g-3 mb-4 align-items-center justify-content-between">
                                <div className="col-auto">
                                    <h1 className="app-page-title mb-0">Users List</h1>
                                </div>
                                <div className="col-auto">
                                    <div className="page-utilities">
                                        <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                                            <div className="col-auto">
                                                <form className="table-search-form row gx-1 align-items-center" onSubmit={(e) => { e.preventDefault(); }}>
                                                    <div className="col-auto">
                                                        <input
                                                            type="text"
                                                            id="search-users"
                                                            name="searchKeyword"
                                                            className="form-control search-users"
                                                            placeholder="Search"
                                                            value={searchKeyword}
                                                            onChange={handleSearchChange}
                                                        />
                                                    </div>
                                                    <div className="col-auto">
                                                        <button type="button" className="btn app-btn-secondary" onClick={handleSearch}>Search</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-auto">
                                                <select className="form-select w-auto">
                                                    <option selected value="option-1">All</option>
                                                    <option value="option-2">Newest Users</option>
                                                    <option value="option-3">Old Users</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <nav id="users-table-tab" className="users-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
                                <a className="flex-sm-fill text-sm-center nav-link active" id="users-all-tab" data-bs-toggle="tab"
                                    href="#users-all" role="tab" aria-controls="users-all" aria-selected="true">All</a>
                                <a className="flex-sm-fill text-sm-center nav-link" id="users-deleted-tab" data-bs-toggle="tab"
                                    href="#users-deleted" role="tab" aria-controls="users-deleted" aria-selected="false">Removed Users</a>
                            </nav>

                            <div className="tab-content" id="users-table-tab-content">
                                <div className="tab-pane fade show active" id="users-all" role="tabpanel"
                                    aria-labelledby="users-all-tab">
                                    <div className="app-card app-card-users-table shadow-sm mb-5">
                                        <div className="app-card-body">
                                            <div className="table-responsive">
                                                <table className="table app-table-hover mb-0 text-left">
                                                    <thead>
                                                        <tr>
                                                            <th className="cell">#</th>
                                                            <th className="cell">Username</th>
                                                            <th className="cell">Email</th>
                                                            <th className="cell">Fullname</th>
                                                            <th className="cell">Image</th>
                                                            <th className="cell">Status</th>
                                                            <th className="cell">Role</th>
                                                            <th className="cell"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(filteredUsers.length > 0 ? filteredUsers : userData)
                                                            .filter(user => !user.is_delete)
                                                            .map((user, index) => (
                                                                <tr key={user.user_id}>
                                                                    <td className="cell">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                                    <td className="cell">{user.username}</td>
                                                                    <td className="cell">{user.email}</td>
                                                                    <td className="cell">{user.full_name}</td>
                                                                    <td className="cell">
                                                                        <img src={user.image_user} alt={user.username} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                                                    </td>
                                                                    <td className="cell">
                                                                        <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                                                            {user.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="cell">{user.role}</td>
                                                                    <td className="cell">
                                                                        <Link className="btn-sm app-btn-secondary m-2" to={`/admin/users/detail/${user.user_id}`}>
                                                                            <i className="fa-regular fa-eye"></i>
                                                                        </Link>
                                                                        <Link className="btn-sm app-btn-secondary m-2" to={`/admin/users/edit/${user.user_id}`}>
                                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                                        </Link>
                                                                        <button className="btn-sm app-btn-secondary m-2" onClick={() => handleShowRemoveModal(user.user_id)}>
                                                                            <i className="bi bi-trash"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        {filteredUsers.length === 0 && searchKeyword && (
                                                            <tr>
                                                                <td colSpan="7" className="text-center">No users found</td>
                                                            </tr>
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
                                        fetchData={loadUsers}
                                    />
                                </div>
                                <div className="tab-pane fade" id="users-deleted" role="tabpanel" aria-labelledby="users-deleted-tab">
                                    <div className="app-card app-card-users-table mb-5">
                                        <div className="app-card-body">
                                            <div className="table-responsive">
                                                <table className="table mb-0 text-left">
                                                    <thead>
                                                        <tr>
                                                            <th className="cell">#</th>
                                                            <th className="cell">Username</th>
                                                            <th className="cell">Email</th>
                                                            <th className="cell">Image</th>
                                                            <th className="cell">Phone</th>
                                                            <th className="cell">Status</th>
                                                            <th className="cell">Reason for deletion</th>
                                                            <th className="cell"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {UserDataDeleted.filter(user => user.is_delete).map((user, index) => {
                                                            return (
                                                                <tr key={user.user_id}>
                                                                    <td className="cell">{index + 1}</td>
                                                                    <td className="cell">{user.username}</td>
                                                                    <td className="cell">{user.email}</td>
                                                                    <td className="cell">
                                                                        <img src={user.image_user} alt={user.username} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                                                    </td>
                                                                    <td className="cell">{user.phone}</td>
                                                                    <td className="cell">
                                                                        <span
                                                                            className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                                                                        >
                                                                            {user.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className='cell'>
                                                                        {user.why_delete}
                                                                    </td>
                                                                    <td className="cell">
                                                                        <button className="btn-sm app-btn-secondary m-2" onClick={() => handleShowConfirmRestoreModal(user.user_id)}>
                                                                            <i className="bi bi-arrow-counterclockwise"></i>
                                                                        </button>
                                                                        <button className="btn-sm app-btn-secondary m-2" onClick={() => handleDelete(user.user_id)}>
                                                                            <i className="bi bi-trash"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )


                                                        })}
                                                        {userData.filter(user => user.is_delete).length === 0 && (
                                                            <tr>
                                                                <td colSpan="7" className="text-center">No removed users found</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <Paginator
                                        currentPage={currentPageDeleted}
                                        lastPage={lastPageDeleted}
                                        setCurrentPage={setCurrentPageDeleted}
                                        fetchData={loadUsersDeleted}
                                    />
                                </div>
                            </div>

                            <ToastContainer />
                            {showRemoveModal && (
                                <RemoveUserModal
                                    show={showRemoveModal}
                                    handleClose={handleCloseRemoveModal}
                                    handleSoftDelete={handleSoftDelete}
                                    reason={reason}
                                    setReason={setReason}
                                />
                            )}
                            {showConfirmModal && (
                                <ConfirmModal
                                    show={showConfirmModal}
                                    handleClose={handleCloseConfirmModal}
                                    handleConfirm={confirmAction}
                                    title="Confirm Delete"
                                    message="Are you sure you want to delete this user?"
                                />
                            )}
                            {showConfirmRestoreModal && (
                                <ConfirmRestoreModal
                                    show={showConfirmRestoreModal}
                                    handleClose={handleCloseConfirmRestoreModal}
                                    handleRestore={confirmRestore}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
