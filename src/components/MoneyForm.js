import React, { useState } from 'react';
import { Form, Row, Col, FormControl, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from '../contexts/AuthContexts';
import { MdOutlineAddToPhotos } from "react-icons/md";
export default function MoneyForm({ categories }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState(new Date());
    const { currentUser } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === "") {
            return;
        }
        await addDoc(collection(db, "records"), {
            date,
            description,
            amount,
            type,
            category: selectedCategory,
            user: doc(db, "users", currentUser.uid)
        });
        setAmount('');
        setDate('');
        setDescription('');
        setType('');
        setSelectedCategory('');
    }
    const addCategory = () =>{}
    return (
        <>
            <h3>Add Record</h3>
            <Form onSubmit={handleSubmit}>
                <Row className='align-items-center'>
                    <Col sm={6} md={3} lg={2} className='my-1' >
                        <Form.Select value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value=''>Select type</option>
                            <option value='Income'>Income</option>
                            <option value='Expense'>Expense</option>
                        </Form.Select>
                    </ Col>
                    <Col sm={6} md={3} lg={2} className='my-1 d-flex' >
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
                        <Button className='addBtn' variant="outline-secondary" size='sm' onClick={addCategory}><MdOutlineAddToPhotos size={20}/></Button>
                    </ Col>

                    <Col sm={6} md={3} lg={2} className='my-1' >
                        <FormControl value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' type='number' required />
                    </ Col>
                    <Col sm={6} lg={2} className='my-1' >
                        <FormControl value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    </ Col>
                    <Col xs="auto" lg={3} className='m-1 d-flex' >
                        <DatePicker
                            selected={date}
                            isClearable
                            onChange={(date) => setDate(date)}
                            dateFormat="dd-MM-Y"
                            required />
                        <Button type='submit' size='sm' className='mx-1'>Add</Button>
                    </ Col>
                </Row>
            </Form>
        </>
    )
}
