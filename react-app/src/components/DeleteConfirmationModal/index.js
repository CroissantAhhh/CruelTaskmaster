import { useState } from 'react';
import { Modal } from '../../context/Modal';
import './DeleteConfirmationModal.css';

export default function DeleteConfirmationModal({ deleteRequest, resource, resourceName }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="delete-button-content" onClick={() => setShowModal(true)}>
                <p className="delete-button-text">Delete&nbsp;</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="50px" width="50px" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="confirm-delete-modal">
                        <div className="delete-question">
                            <p>{`Are you sure you wish to delete "${resourceName}"?`}</p>
                        </div>
                        <div className="delete-yes-no">
                            <button className="delete-yes" onClick={(e) => {deleteRequest(e, resource); setShowModal(false)}}>Yes</button>
                            <button className="delete-no" onClick={() => setShowModal(false)}>No</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
