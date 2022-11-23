import React from "react";
import { Modal, Button } from 'react-bootstrap';

const ResultsModal = (props) => {
    // props.dismissModal: function to dismiss modal
    // props.lastResult: str RecipeRequestResult.status
    // props.recipeName: str Recipe title

    return (
        <Modal
            className="modal modal-result"
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
        >
            <Modal.Body>
                {props.lastResult == "success" &&
                    <>
                        <h4 className='text-center'>Your {props.recipeName} is ready!</h4>
                        <i className="bi-check-circle-fill text-success" />
                    </>
                }

                {props.lastResult == "error" &&
                    <>
                        <h4 className='text-center'>Uh oh!</h4>
                        <h4 className='text-center'>We ran into an error.</h4>
                        <i className="bi-exclamation-circle-fill text-danger" />
                    </>
                }

                {props.lastResult == "quantityerror" &&
                    <>
                        <h4 className='text-center'>Uh oh!</h4>
                        <h4 className='text-center'>Insufficient ingredients to make {props.recipeName}.</h4>
                        <i className="bi-exclamation-circle-fill text-warning" />
                    </>
                }

            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                {props.lastResult == "success" ?
                    <Button variant="secondary" onClick={props.dismissModal}>
                        Done
                    </Button> :
                    <Button variant="secondary" onClick={props.dismissModal}>
                        Go back
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
}

export default ResultsModal;