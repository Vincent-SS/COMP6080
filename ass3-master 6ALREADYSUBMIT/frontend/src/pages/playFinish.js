import React from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

class PlayFinish extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }

  render () {
    return (
      <div>
        <h1>Comgratulations! You have finished all questions!</h1>
        <h2>Want to create your own game?</h2>
        <a href='/register'><Button color='primary'>Click here to reigster</Button></a>
      </div>
    )
  }
}

export default PlayFinish
