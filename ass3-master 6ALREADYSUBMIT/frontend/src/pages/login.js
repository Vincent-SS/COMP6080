import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nextPage: false
    }
    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this)
  }

  submit (event) {
    // Prevent to show password
    event.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      alert('Please provide your username and password')
    } else {
      axios.post('http://localhost:5005/admin/auth/login',
        {
          email: this.state.email,
          password: this.state.password
        }).then(result => {
        localStorage.setItem('token', result.data.token)
        this.setState({ nextPage: true });
      }).catch(e => {
        console.log(e);
        alert('Invalid username or password!')
      });
    }
  }

  change (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render () {
    // Success, go to dashboard page
    if (this.state.nextPage) {
      return <Redirect to="/dashboard"></Redirect>
    }
    return (
      <div>
        <form onSubmit={this.submit}>
          <div>
            Email:
            <input type='text' name='email' data-testid="email" value={this.state.email} onChange={this.change} />
          </div>
          <div>
            Password:
            <input type='password' name='password' data-testid="password" value={this.state.password} onChange={this.change} />
          </div>
          <div>
            <Button color="primary" data-testid="submit" type='submit'>Log in</Button>
          </div>
        </form>
        Do not have an account?
        <a href='/register'><Button color='primary'>Register now</Button></a>
      </div>
    );
  }
}

export default Login;
