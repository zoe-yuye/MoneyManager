import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function DeleteModal({ selectedRecord, showDeleteModal, handleDeleteClose, type}) {
    const handleDelete = () => { 
        deleteDoc(doc(db, "records", selectedRecord.id));
        handleDeleteClose();
    }
    return (
        <Modal show={showDeleteModal} onHide={handleDeleteClose}>
            <Modal.Header closeButton>
                <Modal.Title>Comfirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this {type}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
