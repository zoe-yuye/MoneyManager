import React, { useState, useEffect } from 'react'
import { Table, Stack, Button, Col, Row, Modal, Form, FormControl} from 'react-bootstrap';
import { db } from "../firebase";
import { collection, query, onSnapshot, where, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContexts';
import AddCategoryModal from '../components/AddCategoryModal';
import DeleteModal from '../components/DeleteModal';

function CategoryPage() {
    const { currentUser } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");

    const [categories, setCategories] = useState([]);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showEidt, setShowEdit] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const handleEidtClose = () => setShowEdit(false);
    const handleDeleteClose = () => setShowDeleteModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === "" || category === "") {
            return;
        }
        const existingRecordDocRef = doc(db, "categories", (selectedCategory.id));

        await updateDoc(existingRecordDocRef, {
            type,
            name: category,
            user: currentUser.uid
        });
        setShowEdit(false);
    }

    const addCategory = () => {
        setShowAddCategoryModal(true);
    }

    useEffect(() => {
        async function fetchData() {
            if (currentUser) {
                try {
                    const categoriesQuery = query(collection(db, "categories"), where('user', '==', currentUser.uid));
                    console.log(categoriesQuery);
                    const unsubscribeCategories = onSnapshot(categoriesQuery, (categoriesSnapshot) => {
                        const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        console.log(categoriesData);

                        setCategories(categoriesData);
                    });

                    return () => {
                        unsubscribeCategories();
                    };

                } catch (e) {
                    console.log("Error getting cached document:", e);
                }
            }
        }
        fetchData();
    }, [currentUser]);

    useEffect(() => {
        if (selectedCategory) {
            setType(selectedCategory.type);
            setCategory(selectedCategory.name);
        }
    }, [selectedCategory]);

    return (
        <div >
            <div className='d-flex mx-3 my-5'>
                <h3 className='mx-3' style={{ minWidth: "190px" }}>Manage Category</h3>
                <Button variant="primary" onClick={addCategory} style={{ minWidth: "130px" }}>Add Category</Button>
            </div>
            <Row>
                <Col className='mx-3' style={{ maxWidth: "400px" }}>
                    <Table striped bordered hover className='bg-light'>
                        <thead>
                            <tr style={{ color: '#555' }}>
                                <th>Income Category</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.filter(category => category.type === 'Income').map(category =>
                                <tr>
                                    <td style={{ width: '70%' }}>{category.name}</td>
                                    <td style={{ width: '30%' }}>
                                        <Stack direction="horizontal" gap={3}>
                                            <Button variant="success" size="sm" onClick={() => {setShowEdit(true); setSelectedCategory(category)}} >Edit</Button>
                                            <Button variant="danger" size="sm" onClick={() => {setShowDeleteModal(true); setSelectedCategory(category)}} >Delete</Button>
                                        </Stack>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
                <Col className='mx-3' style={{ maxWidth: "400px" }}>
                    <Table striped bordered hover className='bg-light'>
                        <thead>
                            <tr style={{ color: '#555' }}>
                                <th>Expense Category</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.filter(category => category.type === 'Expense').map(category =>
                                <tr>
                                    <td style={{ width: '70%' }}>{category.name}</td>
                                    <td style={{ width: '30%' }}>
                                        <Stack direction="horizontal" gap={3}>
                                            <Button variant="success" size="sm" onClick={() => {setShowEdit(true); setSelectedCategory(category)}}>Edit</Button>
                                            <Button variant="danger" size="sm" onClick={() => {setShowDeleteModal(true); setSelectedCategory(category)}} >Delete</Button>
                                        </Stack>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <DeleteModal selectedRecord={selectedCategory} showDeleteModal={showDeleteModal} handleDeleteClose={handleDeleteClose} type={'record'}/>
            <AddCategoryModal showAddCategoryModal={showAddCategoryModal} setShowAddCategoryModal={setShowAddCategoryModal} />
            <Modal show={showEidt} onHide={handleEidtClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Select value={type} onChange={(e) => setType(e.target.value)} required className='my-3'>
                            <option value=''>Select category type</option>
                            <option value='Income'>Income</option>
                            <option value='Expense'>Expense</option>
                        </Form.Select>
                        <FormControl className='my-3' value={category} onChange={(e) => setCategory(e.target.value) } placeholder='New Category' />
                        <Row>
                            <Col></Col>
                            <Col xs="auto" className='my-1 mx-3' >
                                <Button type='submit' variant='primary' onClick={handleSubmit} size='sm'>Save</Button>
                            </ Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CategoryPage
