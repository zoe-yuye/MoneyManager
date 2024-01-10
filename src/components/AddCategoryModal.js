import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col, FormControl } from 'react-bootstrap';
import { collection, addDoc} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from '../contexts/AuthContexts';

export default function AddCategoryModal({ showAddCategoryModal, setShowAddCategoryModal }) {
    const { currentUser } = useAuth();
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === "" || category === "") {
            return;
        }
        await addDoc(collection(db, "categories"), {
            type,
            name: category,
            user: currentUser.uid
        });
        setShowAddCategoryModal(false);
    }
    const handleAddCategoryModalClose = () => { setShowAddCategoryModal(false); }

    return (
        <>
            <Modal show={showAddCategoryModal} onHide={handleAddCategoryModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Select value={type} onChange={(e) => setType(e.target.value)} required className='my-3'>
                            <option value=''>Select category type</option>
                            <option value='Income'>Income</option>
                            <option value='Expense'>Expense</option>
                        </Form.Select>
                        <FormControl className='my-3' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='New Category' />
                        <Row>
                            <Col></Col>
                            <Col xs="auto" className='my-1 mx-3' >
                                <Button type='submit' variant='primary' onClick={handleSubmit} size='sm'>Add</Button>
                            </ Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );

}