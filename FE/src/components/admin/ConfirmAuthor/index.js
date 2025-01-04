import React, { useEffect, useState } from 'react';
import { fetchRegisterAuthors, agreeAuthor, refuseAuthor, sendEmailAgreeAuthor, sendEmailRefuseAuthor } from '../../../services/Users';
import { apiUrl } from '../../../config/Api';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AgreeAuthorModal, RefuseAuthorModal } from '../../Dialog';
import Paginator from "../Paginator";

const ConfirmAuthor = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [showAgreeModal, setShowAgreeModal] = useState(false);
    const [showRefuseModal, setShowRefuseModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage]);

    const loadUsers = (page = 1) => {
        fetchRegisterAuthors(apiUrl, page, setUserData, setError)
            .then((data) => {
                if (data && data.meta) {
                    setLastPage(data.meta.last_page);
                } else {
                    console.error("API response missing 'meta' or 'last_page'");
                    setLastPage(1);
                }
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setError("Error fetching users");
            });
    };

    const handleOpenAgreeModal = (user) => {
        setSelectedUser(user);
        setShowAgreeModal(true);
    };

    const handleOpenRefuseModal = (user) => {
        setSelectedUser(user);
        setShowRefuseModal(true);
    };

    const handleConfirmAgree = () => {
        if (selectedUser) {

            agreeAuthor(selectedUser.user_id,
                () => {
                    sendEmailAgreeAuthor(selectedUser.email,
                        () => {
                            toast.success(`${selectedUser.username} has been approved as an author and notified via email!`);
                        },
                        (error) => {
                            toast.error(`Failed to send approval email: ${error}`);
                        }
                    );
                    toast.success(`${selectedUser.username} has been agree as an author!`);
                    setShowAgreeModal(false);
                    loadUsers();
                },
                (error) => {
                    toast.error(error);
                    setShowAgreeModal(false);
                }
            );
        }
    };

    const handleConfirmRefuse = () => {
        if (selectedUser) {
            refuseAuthor(selectedUser.user_id,
                () => {

                    sendEmailRefuseAuthor(selectedUser.email,
                        () => {
                            toast.success(`Email sent to ${selectedUser.username} notifying refusal.`);
                        },
                        (error) => {
                            toast.error(`Failed to send email: ${error}`);
                        }
                    );

                    toast.success(`${selectedUser.username} has been refused as an author!`);
                    setShowRefuseModal(false);
                    loadUsers();
                },
                (error) => {
                    toast.error(error);
                    setShowRefuseModal(false);
                }
            );
        }
    };

    const handleCloseAgreeModal = () => {
        setShowAgreeModal(false);
    };

    const handleCloseRefuseModal = () => {
        setShowRefuseModal(false);
    };

    return (
        <div className='app'>
            <div className='app-wrapper-admin'>
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl card">
                        <div className="card-body">
                            <div className="row g-3 mb-4 align-items-center justify-content-between">
                                <div className="col-auto">
                                    <h1 className="app-page-title mb-0">List of users who want to be authors</h1>
                                </div>
                            </div>


                            <nav id="orders-table-tab" className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
                                <Link className="flex-sm-fill text-sm-center nav-link active" id="orders-all-tab" data-bs-toggle="tab" to="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</Link>
                            </nav>


                            <div className="tab-content" id="orders-table-tab-content">
                                <div className="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
                                    <div className="app-card app-card-orders-table shadow-sm mb-5">
                                        <div className="app-card-body">
                                            <div className="table-responsive">
                                                <table className="table app-table-hover mb-0 text-left text-md-center">
                                                    <thead>
                                                        <tr>
                                                            <th className="cell">#</th>
                                                            <th className="cell">Username</th>
                                                            <th className="cell">Email</th>
                                                            <th className="cell">Image</th>
                                                            <th className="cell">Phone</th>
                                                            <th className="cell">Status</th>
                                                            <th className="cell">Reason for author registration</th>
                                                            <th className="cell"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userData.filter(user => {
                                                            return user.confirm_author == 1 && user.status === 'active' && user.is_delete == 0;
                                                        }).map((user, index) => {
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
                                                                    <td className="cell text-end">
                                                                        <button className="btn-sm app-btn-secondary m-2" onClick={() => handleOpenAgreeModal(user)}><i class="fa-solid fa-check"></i></button>
                                                                        <button className="btn-sm app-btn-secondary m-2" onClick={() => handleOpenRefuseModal(user)}><i className="fa-solid fa-x"></i></button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                        {userData.filter(user => user.confirm_author == 1 && user.status === 'active' && user.is_delete == 0).length === 0 && (
                                                            <tr>
                                                                <td colSpan="7" className="text-center">No confirmed authors found</td>
                                                            </tr>
                                                        )}
                                                    </tbody>

                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                    <Paginator
                                        currentPage={currentPage}
                                        lastPage={1}
                                        setCurrentPage={setCurrentPage}
                                        fetchData={loadUsers}
                                    />

                                </div>
                            </div>

                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
            {selectedUser && (
                <AgreeAuthorModal
                    show={showAgreeModal}
                    handleConfirm={handleConfirmAgree}
                    handleClose={handleCloseAgreeModal}
                    userName={selectedUser.username}
                />
            )}
            {selectedUser && showRefuseModal && (
                <RefuseAuthorModal
                    show={showRefuseModal}
                    handleConfirm={handleConfirmRefuse}
                    handleClose={handleCloseRefuseModal}
                    userName={selectedUser.username}
                />
            )}
        </div>

    )
}
export default ConfirmAuthor;
