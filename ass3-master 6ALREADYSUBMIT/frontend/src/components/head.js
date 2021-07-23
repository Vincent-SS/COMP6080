
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Button from 'react-bootstrap/Button'

function Head () {
  const [renderDirect, setRenderDirect] = useState();

  const onClick = event => {
    event.preventDefault();
    axios.post('http://localhost:5005/admin/auth/logout', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(result => {
        if (result.data.status !== 'fail') {
          localStorage.removeItem('token')
          setRenderDirect(
              <Redirect to="/"></Redirect>
          )
        }
      }).catch(e => {
        console.log(e);
        alert('Invalid Input')
      });
  }

  return (
    <div>
        <Button variant="outline-danger" onClick={onClick} data-testid="logout">Log out</Button>
        {renderDirect}
    </div>
  )
}

export default Head;
