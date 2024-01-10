import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader( variant, className) {
  return (
    <Spinner className={className} variant={variant} animation="border">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

Loader.defaultProps = {
    variant: 'primary', 
    className: ''
}