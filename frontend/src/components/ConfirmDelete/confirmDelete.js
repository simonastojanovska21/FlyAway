import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmDelete=(props)=>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <button className={"btn text-white me-3 mt-3"} style={{backgroundColor: '#BB0422'}}
                    onClick={handleShow}>
                <FontAwesomeIcon icon={faTrash} className={"pe-3"}/>Delete
            </button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Button className={"text-white border-0"} onClick={handleClose} style={{backgroundColor: '#515153'}}>
                        Cancel
                    </Button>
                    <Button className={"text-white border-0"}
                            onClick={()=>{props.onDeleteItem(props.itemId);handleClose();}} style={{backgroundColor: '#BB0422'}}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmDelete;