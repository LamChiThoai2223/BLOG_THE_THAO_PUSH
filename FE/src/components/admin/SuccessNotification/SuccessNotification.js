import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './SuccessNotification.css';

const SuccessNotification = ({ message, type, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    const alertClass = type === 'danger' ? 'alert-danger' : 'alert-success';

    return (
        <div className={`alert ${alertClass} alert-dismissible fade show`} role="alert">
            {message}
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
        </div>
    );
};

SuccessNotification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'danger']).isRequired,
    onClose: PropTypes.func.isRequired
};

export default SuccessNotification;
