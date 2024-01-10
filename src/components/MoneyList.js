import React, {useState} from 'react'
import Table from 'react-bootstrap/Table';
import Record from './Record';
import Loader from './Loader';
import Pagination from 'react-bootstrap/Pagination';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

export default function MoneyList({ records, loading, categories}) {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastRecord = currentPage * itemsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(records.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    
    const onDeleteClicked = (record) => {
        setShowDeleteModal(true);
        setSelectedRecord(record)
    }
    const handleDeleteClose = () => setShowDeleteModal(false);
   
    const [showEditModal, setShowEditModal] = useState(false);
    const onEditClicked = (record) => {
        setShowEditModal(true);
        setSelectedRecord(record)
    }
    const handleEidtClose = () => setShowEditModal(false);

    return (
        <>
            <h5 className='m-3'>Details</h5>
            {loading && <Loader />}
            <Table striped bordered hover className='bg-light'>
                <thead>
                    <tr style={{ color: '#555' }}>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map(record => <Record record={record} key={record.id} onDelete={() => onDeleteClicked(record)} onEdit={() => onEditClicked(record)}/>)}
                </tbody>
            </Table>
            <DeleteModal selectedRecord={selectedRecord} showDeleteModal={showDeleteModal} handleDeleteClose={handleDeleteClose}/>
            <EditModal categories={categories} selectedRecord={selectedRecord} showEditModal={showEditModal} handleEidtClose={handleEidtClose}/>
            <Pagination>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}
