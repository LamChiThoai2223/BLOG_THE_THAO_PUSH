import React from 'react';
import PropTypes from 'prop-types';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h5>Xác nhận xóa</h5>
                <p>Bạn có chắc chắn muốn xóa thẻ này không?</p>
                <div className="modal-actions">
                    <button className="btn btn-danger" onClick={onConfirm}>Xóa</button>
                    <button className="btn btn-secondary" onClick={onCancel}>Hủy</button>
                </div>
            </div>
        </div>
    );
};

DeleteConfirmationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default DeleteConfirmationModal;
