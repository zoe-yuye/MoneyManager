import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export default function Panel({income, expense }) {
  
    return (
        <>
            <Row>
                <Col>
                    <Card
                        bg="success"
                        text="white"
                        className="mb-2"
                    >
                        <Card.Header>Income</Card.Header>
                        <Card.Body>
                            <Card.Text>$ {income.toFixed(2)}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        bg="danger"
                        text="white"
                        className="mb-2"
                    >
                        <Card.Header>Expense</Card.Header>
                        <Card.Body>
                            <Card.Text>$ {expense.toFixed(2)}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        bg="secondary"
                        text="white"
                        className="mb-2"
                    >
                        <Card.Header>Total</Card.Header>
                        <Card.Body>
                            <Card.Text>$ {(income - expense).toFixed(2)}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
