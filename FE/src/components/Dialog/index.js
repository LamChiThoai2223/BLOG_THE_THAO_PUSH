import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RemoveUserModal = ({ show, handleClose, reason, setReason, handleSoftDelete }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove this user?</p>
                <textarea
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason for removal"
                ></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSoftDelete}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const Remove = ({ show, handleClose, reason, setReason, handleSoftDelete, title }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Do you want to temporarily remove this {title}?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSoftDelete}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
const ConfirmModal = ({ show, handleDelete, handleClose, title, message }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to permanently delete this {title}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const ConfirmRestore = ({ show, handleClose, handleRestore, title }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Restore {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to restore this {title}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleRestore}>
                    Restore
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const ConfirmEdit = ({ show, handleClose, handleRestore, title }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to edit this {title}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleRestore}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const ConfirmRestoreModal = ({ show, handleClose, handleRestore }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Restore User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to restore this user?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={() => { handleRestore(); handleClose(); }}>
                    Restore
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
const ConfirmDeleteCommentModal = ({ show, handleClose, handleConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this comment? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => { handleConfirm(); handleClose(); }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const ConfirmActionModal = ({ show, onClose, onConfirm, title, message, confirmButtonText, children }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => { onConfirm(); onClose(); }}>
                    {confirmButtonText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


const ConfirmRestoreCategoryModal = ({ show, handleClose, handleRestore }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Restore Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to restore this category?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={() => { handleRestore(); handleClose(); }}>
                    Restore
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const RemoveCategoryModal = ({ show, handleClose, handleSoftDelete }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove this category?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSoftDelete}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );

};
const RemoveModal = ({ show, handleClose, reason, setReason, handleSoftDelete, title }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to remove this {title}?</p>
                <textarea
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason for removal"
                ></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSoftDelete}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const RegisterAuthorModal = ({ show, handleClose, reason, setReason, handleRegister }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register as an Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Please provide the reason why you want to become an author.</p>
                <textarea
                    className="form-control"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter your reason"
                ></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleRegister}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const AgreeAuthorModal = ({ show, handleConfirm, handleClose, userName }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Approve Author Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to approve <strong>{userName}</strong> to become an author?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const RefuseAuthorModal = ({ show, handleConfirm, handleClose, userName }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Refuse Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to refuse {userName} as an author?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Refuse
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export { ConfirmEdit, RemoveUserModal, ConfirmModal, ConfirmRestoreModal, ConfirmActionModal, ConfirmDeleteCommentModal, ConfirmRestoreCategoryModal, RemoveCategoryModal, RemoveModal, ConfirmRestore, Remove, RegisterAuthorModal, AgreeAuthorModal, RefuseAuthorModal };
