import React, { useState, useEffect } from 'react';
import Panel from '../components/Panel';
import MoneyList from '../components/MoneyList';
import { useAuth } from '../contexts/AuthContexts';
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, orderBy } from "firebase/firestore";
import RecordFilter from '../components/RecordFilter';
import Loader from '../components/Loader';

function RecordsScreen() {
    const { currentUser } = useAuth();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [categories, setCategories] = useState([]);
    const income = filteredRecords.filter((record) => record.type === 'Income')
        .reduce((income, record) => income + parseFloat(record.amount), 0);
    const expense = filteredRecords.filter((record) => record.type === 'Expense')
        .reduce((expense, record) => expense + parseFloat(record.amount), 0);

    useEffect(() => {
        async function fetchData() {
            if (currentUser) {
                try {
                    const recordsQuery = query(collection(db, "records"), where('user', "==", doc(db, "users", currentUser.uid)), orderBy("date", "desc"));
                    const unsubscribeRecords = onSnapshot(recordsQuery, (recordsSnapshot) => {
                        const recordsData = recordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setRecords(recordsData);
                    });

                    const categoriesQuery = query(collection(db, "categories"));
                    const unsubscribeCategories = onSnapshot(categoriesQuery, (categoriesSnapshot) => {
                        const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setCategories(categoriesData);
                        setLoading(false);
                    });

                    return () => {
                        unsubscribeRecords();
                        unsubscribeCategories();
                    };

                } catch (e) {
                    console.log("Error getting cached document:", e);
                }
            }
        }
        fetchData();
    }, [currentUser]);


    const handleFilterChange = (newFilteredRecords) => {
        setFilteredRecords(newFilteredRecords);
    };

    if (currentUser) {
        return (
            <div>
                <div className='d-flex'>
                    <h3 className='m-3'>Summary</h3>
                    <RecordFilter
                        records={records}
                        onFilterChange={handleFilterChange}
                    />
                </div>
                <Panel income={income} expense={expense} />
                <hr />
                <MoneyList loading={loading} records={filteredRecords} categories={categories} />
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }
}

export default RecordsScreen;