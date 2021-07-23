
import React from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

function DashboardHead () {
  return (
    <div>
        <a href='/dashboard'><Button variant="outline-danger" data-testid="dashboardLink">Dashboard Page</Button></a>
    </div>
  )
}

export default DashboardHead;
