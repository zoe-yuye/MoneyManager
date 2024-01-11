import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { FormControl, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditModal({ selectedRecord, showEditModal, handleEidtClose, categories }) {

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        if (selectedRecord) {
            setAmount(selectedRecord.amount);
            setDescription(selectedRecord.description);
            setType(selectedRecord.type);
            setDate(selectedRecord.date.toDate());
        }
    }, [selectedRecord]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === "") {
            return;
        }
        const existingRecordDocRef = doc(db, "records", (selectedRecord.id));

        await updateDoc(existingRecordDocRef, {
            date,
            description,
            amount,
            type,
            category: selectedCategory
        });
        handleEidtClose();
    }

    return (
        <Modal show={showEditModal} onHide={handleEidtClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} >
                    <Form.Select value={type} onChange={(e) => setType(e.target.value)} required className='my-3'>
                        <option value=''>Select type</option>
                        <option value='Income'>Income</option>
                        <option value='Expense'>Expense</option>
                    </Form.Select>
                    <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                        <option value=''>Category</option>
                        {type === 'Income'
                            ? categories.filter(category => category.type === 'Income').map(category => (
                                <option key={category.name} value={category.name}>
                                    {category.name}
                                </option>
                            ))
                            : (type === 'Expense'
                                ? categories.filter(category => category.type === 'Expense').map(category => (
                                    <option key={category.name} value={category.name}>
                                        {category.name}
                                    </option>
                                ))
                                : null
                            )
                        }
                    </Form.Select>
                    <FormControl className='my-3' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <FormControl className='my-3' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' type='number' required />
                    <span>Date: </span>
                    <DatePicker className='my-1'
                        selected={date}
                        isClearable
                        onChange={(date) => setDate(date)}
                        dateFormat="dd-MM-Y"
                        required />
                    <Row>
                        <Col></Col>
                        <Col xs="auto" className='my-1 mx-3' >
                            <Button type='submit' variant='primary' size='sm'>Save</Button>
                        </ Col>
                    </Row>
                </Form>
            </Modal.Body>

        </Modal>
    )
}
