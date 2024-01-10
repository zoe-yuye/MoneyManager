import { useAuth } from '../contexts/AuthContexts';
import RecordFilter from '../components/RecordFilter';
import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, orderBy } from "firebase/firestore";
import { PieChart } from '../components/PieChart';
import Loader from '../components/Loader';
import { MonthlyChart } from '../components/MonthlyChart';
import { Container } from 'react-bootstrap';

function AnalysisScreen() {
  const { currentUser } = useAuth();
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const income = filteredRecords.filter((record) => record.type === 'Income')
    .reduce((income, record) => income + parseFloat(record.amount), 0);
  const expense = filteredRecords.filter((record) => record.type === 'Expense')
    .reduce((expense, record) => expense + parseFloat(record.amount), 0);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const recordsQuery = query(
          collection(db, "records"),
          where('user', "==", doc(db, "users", currentUser.uid)),
          orderBy("date", "desc")
        );

        return onSnapshot(recordsQuery, (recordsSnapshot) => {
          const recordsData = recordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setRecords(recordsData);
        });
      }
    };

    fetchData();
  }, [currentUser]);

  const handleFilterChange = (newFilteredRecords) => {
    setFilteredRecords(newFilteredRecords);
  };
  if (currentUser) {
    return (
      <div>
        <h3 className='p-4'>Finacial Analysis</h3>
        <MonthlyChart records={records} />
        <hr />
        <Container>
          <div className='d-flex bg-blue'>
            <h6 className='m-3 min-w-120'>Select Data:</h6>
            <RecordFilter
              records={records}
              onFilterChange={handleFilterChange}
            />
          </div>
        </Container>
        <PieChart records={filteredRecords} income={income} expense={expense} />
      </div>
    )
  } else {
    return (
      <Loader />
    )
  }

}

export default AnalysisScreen
