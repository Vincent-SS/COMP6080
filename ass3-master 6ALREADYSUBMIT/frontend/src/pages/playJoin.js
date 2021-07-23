import React from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types';

class PlayJoin extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      nextPage: '',
      sessionId: '',
      name: '',
    }
    this.change = this.change.bind(this);
    this.join = this.join.bind(this);
  }

  join () {
    axios.post(`http://localhost:5005/play/join/${this.state.sessionId}`, {
      name: this.state.name
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r => {
      this.setState({ nextPage: `/playGame/${this.state.sessionId}/${r.data.playerId}` })
    }).catch(e => {
      console.log(e)
      alert('Invalid input')
    })
  }

  componentDidMount () {
    this.setState({ sessionId: this.props.match.params.sessionId })
  }

  change (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render () {
    if (this.state.nextPage !== '') {
      return (
        <Redirect to={this.state.nextPage}></Redirect>
      )
    }
    return (
      <div>
        Please type your name to join! <br />
        <input name="name" onChange={this.change} value={this.state.name}></input>
        <Button color="primary" onClick={() => this.join()}>Join Now</Button>
      </div>
    );
  }
}

PlayJoin.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sessionId: PropTypes.string
    })
  }),
}

export default PlayJoin;
