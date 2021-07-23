
import React from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

function Finish () {
  return (
    <div>
        <a href='/dashboard'><Button variant="success" data-testid="finish">Finish / Go back to Dashboard</Button></a>
    </div>
  )
}

export default Finish;
