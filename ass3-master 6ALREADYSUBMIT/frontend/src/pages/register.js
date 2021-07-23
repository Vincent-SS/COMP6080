import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

class Register extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2: '',
      name: '',
      nextPage: false
    }
    this.commonChange = this.commonChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  commonChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit (event) {
    if (this.state.password1 !== this.state.password2) {
      alert("Your two passwords don't match!")
    } else if (this.state.email === '' || this.state.name === '' || this.state.password1 === '' || this.state.password2 === '') {
      alert('Please fill all the fields!')
    } else {
      event.preventDefault();
      axios.post('http://localhost:5005/admin/auth/register',
        {
          email: this.state.email,
          password: this.state.password1,
          name: this.state.name
        })
        .then(result => {
          if (result.data.status !== 'fail') {
            localStorage.setItem('token', result.data.token)
            // axios.defaults.headers.common.Authorization = 'Bearer ' + result.data.token;
            alert('You have successfully registered a new account!')
            this.setState({ nextPage: true });
          } else {
            this.setState({ error: result.data.error });
          }
        })
        .catch(error => {
          console.log(error);
          alert('Account already existed')
        });
    }
  }

  render () {
    if (this.state.nextPage) {
      return (
        <Redirect to="/"></Redirect>
      )
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            Email:
            <input type='text' name='email' value={this.state.email} onChange={this.commonChange} />
          </div>
          <div>
            Enter your password:
            <input type='password' name='password1' value={this.state.password1} onChange={this.commonChange}></input>
          </div>
          <div>
            Re-enter your password:
            <input type='password' name='password2' value={this.state.password2} onChange={this.commonChange}></input>
          </div>
          <div>
            Name:
            <input type='text' name='name' value={this.state.name} onChange={this.commonChange}></input>
          </div>
          <div>
            <Button color="primary" type='submit'>Register</Button>
          </div>
        </form>
        <div>
          Already have an account?
          <a href='/login'><Button color='primary'>Log in here</Button></a>
        </div>
      </div>
    );
  }
}

export default Register;
