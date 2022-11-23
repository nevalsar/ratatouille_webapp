import React from "react";
import { ProgressBar, Modal } from 'react-bootstrap';

import './ProgressModal.css';

const ProgressModal = (props) => {
    // props.recipeName: str Recipe title
    // props.progress: int [0-100]

    return (
        <Modal
            className="modal modal-progress"
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
        >
            <Modal.Body>
                <h4 className='text-center'>Your {props.recipeName} is being prepared!</h4>
                <div className='modal-spinner-box'>
                    <img className='progress-gif' src="./rata-cooking.gif" />
                </div>
                <ProgressBar className='mt-3' variant="success" animated now={props.progress} />
            </Modal.Body>
        </Modal>
    );
}

export default ProgressModal;