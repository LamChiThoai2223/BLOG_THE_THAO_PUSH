import React, { useEffect, useState } from 'react';
import './Paginator.css'; // Style for pagination

const Paginator = ({ currentPage, lastPage, setCurrentPage, fetchData, loading }) => {
    const goFirstPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    };

    const goPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goLastPage = () => {
        if (currentPage !== lastPage) {
            setCurrentPage(lastPage);
        }
    };

    useEffect(() => {
        if (fetchData && !loading) {    
            fetchData(currentPage);
        }
    }, [currentPage]);

    const hasPreviousPage = currentPage === 1;
    const hasNextPage = currentPage === lastPage;

    const pageNumbers = [];
    for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
    }
    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (lastPage <= 3) {
            for (let i = 1; i <= lastPage; i++) {
                pageNumbers.push(i);
            }
        } else {

            if (currentPage === 1) {
                pageNumbers.push(1, 2);
                if (lastPage > 3) {
                    pageNumbers.push('...');
                }
                pageNumbers.push(lastPage);
            } 
            else if (currentPage === lastPage) {
                pageNumbers.push(1);
                if (lastPage > 2) {
                    pageNumbers.push('...');
                }
                pageNumbers.push(lastPage - 1, lastPage);
            } 
            else {
                pageNumbers.push(1);
    
                if (currentPage > 3) {
                    pageNumbers.push('...');
                }
    
                const startPage = Math.max(2, currentPage - 1);
                const endPage = Math.min(lastPage - 1, currentPage + 1);
    
                for (let i = startPage; i <= endPage; i++) {
                    pageNumbers.push(i);
                }
    
                if (currentPage < lastPage - 2) {
                    pageNumbers.push('...');
                }
                pageNumbers.push(lastPage);
            }
        }

        return pageNumbers;
    };

    return (
        <nav className="app-pagination">
            <ul className="pagination justify-content-center">
                {/* đầu*/}
                <li className={`page-item ${hasPreviousPage ? 'disabled' : ''}`}>
                    <a 
                        className="page-link" 
                        onClick={goFirstPage}
                        tabIndex="-1"
                        aria-disabled={hasPreviousPage}
                    >
                       <i className="fa-solid fa-backward-fast"></i>
                    </a>
                </li>
                {/* Trước */}
                <li className={`page-item ${hasPreviousPage ? 'disabled' : ''}`}>
                    <a 
                        className="page-link" 
                        onClick={goPreviousPage}
                        tabIndex="-1"
                        aria-disabled={hasPreviousPage}
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </a>
                </li>
                {/* Số tt */}
                 {renderPageNumbers().map((number, index) => (
                    <li 
                        key={index} 
                        className={`page-item ${currentPage === number ? 'active' : ''} ${number === '...' ? 'disabled' : ''}`}
                    >
                        {number === '...' ? (
                            <span className="page-link">...</span>
                        ) : (
                            <a 
                                className="page-link" 
                                onClick={() => setCurrentPage(number)}
                            >
                                {number}
                            </a>
                        )}
                    </li>
                ))}
                {/* Kế tiếp */}
                <li className={`page-item ${hasNextPage ? 'disabled' : ''}`}>
                    <a 
                        className="page-link" 
                        onClick={goNextPage}
                    >
                        <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </li>
                {/* Sau */}
                <li className={`page-item ${hasNextPage ? 'disabled' : ''}`}>
                    <a 
                        className="page-link" 
                        onClick={goLastPage}
                    >
                      <i className="fa-solid fa-forward-fast"></i>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Paginator;
