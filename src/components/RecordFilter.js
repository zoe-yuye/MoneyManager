import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { subMonths, subWeeks, subYears } from 'date-fns';

function RecordFilter({records, onFilterChange}) {
    const [selectedOption, setSelectedOption] = useState('all');
    const [selectedStartDate, setSelectedStartDate] = useState(subMonths(new Date(), 1));
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());

    useEffect(() => {
        let filteredData = [];

        if (selectedOption === 'monthly') {
            filteredData = records.filter((record) => record.date.toDate() >= subMonths(new Date(), 1));
        } else if (selectedOption === 'weekly') {
            filteredData = records.filter((record) => record.date.toDate() >= subWeeks(new Date(), 1));
        } else if (selectedOption === 'annually') {
            filteredData = records.filter((record) => record.date.toDate() >= subYears(new Date(), 1));
        } else if (selectedOption === 'period') {
            filteredData = records.filter((record) => record.date.toDate() >= selectedStartDate && record.date.toDate() <= selectedEndDate);
        } else if (selectedOption === 'all') {
            filteredData = records;
        }

        onFilterChange(filteredData);
    }, [selectedOption, selectedStartDate, selectedEndDate, records]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <Row className='align-items-center my-2'>
         
            <Col xs='auto' md={12} lg={3} >
                <Form.Select
                    aria-label="Default select example"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className='my-2 selectWidth'
                >
                    <option value="all">All Records</option>
                    <option value="monthly">The past month</option>
                    <option value="weekly">The past week</option>
                    <option value="annually">The past year</option>
                    <option value="period">Period</option>
                </Form.Select>
            </Col>
            {selectedOption === 'period' && (
                <>
                    <Col md={3} lg={3} className='d-flex mx-5 mb-1'>
                    <span className='mx-2'>From:</span>
                        <DatePicker
                            selected={selectedStartDate}
                            isClearable
                            dateFormat="dd-MM-Y"
                            onChange={(date) => setSelectedStartDate(date)}
                            required
                        />
                    </Col>
                    <Col md={3} lg={3} className='d-flex mx-5 mb-1'>
                    <span className='mx-2'>To:</span>
                        <DatePicker
                            selected={selectedEndDate}
                            isClearable
                            dateFormat="dd-MM-Y"
                            onChange={(date) => setSelectedEndDate(date)}
                            required
                        />
                    </Col>
                </>
            )}
        </Row>)
}
export default RecordFilter;
