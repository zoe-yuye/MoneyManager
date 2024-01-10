import React, { useState } from 'react';
import { Container, Row, Form } from 'react-bootstrap';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';

export function MonthlyChart({ records }) {
  const years = Array.from(new Set(records.map(record => record.date.toDate().getFullYear()))).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedChart, setSelectedChart] = useState('bar');
  const handleYearOptionChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleChartOptionChange = (event) => {
    setSelectedChart(event.target.value);
  }

  const filteredIncomeRecords = records.filter(record => record.type === "Income" && record.date.toDate().getFullYear().toString() === selectedYear);
  const filteredExpeneRecords = records.filter(record => record.type === "Expense" && record.date.toDate().getFullYear().toString() === selectedYear);

  const incomeData = new Array(12).fill(0);
  filteredIncomeRecords.forEach(record => {
    const month = record.date.toDate().getMonth();
    incomeData[month] += parseFloat(record.amount);
  });

  const expenseData = new Array(12).fill(0);
  filteredExpeneRecords.forEach(record => {
    const month = record.date.toDate().getMonth();
    expenseData[month] += parseFloat(record.amount);
  });

 

  return (
    <Container>
      <div className='d-flex bg-blue'>
        <h6 className='m-3 min-w-120'>Select a Year:</h6>
        <Form.Select
          aria-label="Default select example"
          value={selectedYear}
          onChange={handleYearOptionChange}
          className='my-2 selectWidth'
        >
          {years.map((year) => (<option value={year} key={year}>{year}</option>))}
        </Form.Select>
        <h6 className='m-3 min-w-120'>Select Chart Type:</h6>
        <Form.Select
          aria-label="Default select example"
          value={selectedChart}
          onChange={handleChartOptionChange}
          className='my-2 selectWidth'
        >
          <option value='bar'>Bar Chart</option>
          <option value='line'>Line Chart</option>
        </Form.Select>
      </div>
      <Row className='mx-5 p-5 bg-grey' >
        {selectedChart === 'line' ? 
        <LineChart incomeData={incomeData} expenseData={expenseData}/> :
        <BarChart incomeData={incomeData} expenseData={expenseData}/>
      }</Row>
    </Container>
  );
}

