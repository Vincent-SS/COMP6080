import React from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

class Welcome extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      // loginPage: false
    }
  }

  render () {
    return (
      <div>
        <h1>Welcome to BigBrain!</h1>
        <a href='/login'><Button color='primary'>Sign In</Button></a>
        <a href='/register'><Button color='primary'>Register</Button></a>
      </div>
    )
  }
}

export default Welcome
