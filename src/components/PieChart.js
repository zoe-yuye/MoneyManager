import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Col, Container, Row } from 'react-bootstrap';

ChartJS.register(ArcElement, Tooltip, Legend, Title);


export function PieChart({ records, income, expense }) {
  const incomeRecords = records.filter((record) => record.type === 'Income');
  const expenseRecords = records.filter((record) => record.type === 'Expense');
  console.log(incomeRecords);
  console.log(expenseRecords);
  const incomeCategoryMap = new Map();
  incomeRecords.forEach(record => {
    const { category, amount } = record;
    const totalAmount = incomeCategoryMap.get(category) || 0;
    incomeCategoryMap.set(category, totalAmount + parseFloat(amount));
  });

  const expenseCategoryMap = new Map();
  expenseRecords.forEach(record => {
    const { category, amount } = record;
    const totalAmount = expenseCategoryMap.get(category) || 0;
    expenseCategoryMap.set(category, totalAmount + parseFloat(amount));
  });
  const incomeChartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Income',
      },
    },
  };
  const expenseChartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Expense',
      },
    },
  };

  const balanceChartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Balance',
      },
    },
  };
  const incomeData = {
    labels: incomeCategoryMap.size > 0 ? Array.from(incomeCategoryMap.keys()) : ['No records'],
    datasets: [
      {
        label: 'Percentage',
        data: incomeCategoryMap.size > 0 ? Array.from(incomeCategoryMap.values()).map(totalAmount => (totalAmount / income * 100).toFixed(2)) : [0],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          
        ],

      },
    ],
  };

  

  const expenseData = {
    labels: expenseCategoryMap.size > 0 ? Array.from(expenseCategoryMap.keys()) : ['No records'],
    datasets: [
      {
        label: 'Percentage',
        data: expenseCategoryMap.size > 0 ? Array.from(expenseCategoryMap.values()).map(totalAmount => (totalAmount / expense * 100).toFixed(2)) : [0],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          
        ],

      },
    ],
  };
  const balanceData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Percentage',
        data: [(income/(income + expense) * 100).toFixed(2), (expense/(income + expense) * 100).toFixed(2)] ,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)'
        ],

      },
    ],
  };
  return (
    <Container >
      <Row className='m-3 px-5 py-3 bg-grey'>
        <h4>Pie Charts</h4>
        <Col sm={12} md={6} lg={4} className='py-3'><Pie data={incomeData} options={incomeChartOptions} className='pieChart'/></Col>
        <Col sm={12} md={6} lg={4} className='py-3'><Pie data={expenseData} options={expenseChartOptions} /></Col>
        <Col sm={12} md={6} lg={4} className='py-3'><Pie data={balanceData} options={balanceChartOptions} /></Col>
      </Row>
    </Container>
  );

}
