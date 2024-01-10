import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { format } from 'date-fns';

export default function Record({ record, onDelete,onEdit }) {
    const rowClassName = record.type === 'Income' ? 'text-success' : 'text-danger';
    const formattedDate = format(record.date.toDate(), 'dd-MM-yyyy (EE)');
    return (
        <tr className={rowClassName}>
            <td style={{ width: '10%' }}>{record.type}</td>
            <td style={{ width: '15%' }}>{parseFloat(record.amount).toFixed(2)}</td>
            <td style={{ width: '15%' }}>{record.category}</td>
            <td style={{ width: '25%' }}>{record.description}</td>
            <td style={{ width: '25%' }}>{formattedDate}</td>
            <td style={{ width: '10%' }}>
                <Stack direction="horizontal" gap={3}>
                    <Button variant="secondary" size="sm" onClick={onEdit}>Edit</Button>
                    <Button variant="secondary" size="sm" onClick={onDelete}>Delete</Button>
                </Stack>
            </td>
            
        </tr>
    )
}
