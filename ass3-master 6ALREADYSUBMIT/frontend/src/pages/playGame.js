import React from 'react';
import { Redirect } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types';
import axios from 'axios';

class PlayGame extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      question: '',
      select: [],
      sessionId: '',
      playerId: '',
      remainTime: 50,
      position: 1,
      numQuestion: 0
    }
    this.checkNew = this.checkNew.bind(this)
    this.start = this.start.bind(this)
    this.waitQuestion = this.waitQuestion.bind(this)
    this.timeEnd = this.timeEnd.bind(this)
    this.submit = this.submit.bind(this)
    this.change = this.change.bind(this);
  }

  submit () {
    axios.put(`http://localhost:5005/play/${this.state.playerId}/answer`, {
      answerIds: this.state.select
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r => {
      console.log(r)
    }).catch(e => {
      console.log(e)
      // alert('Invalid input/token')
    })
    this.timeEnd()
    this.waitQuestion()
    this.setState({ remainTime: 0 })
  }

  checkNew () {
    axios.get(`http://localhost:5005/admin/session/${this.state.sessionId}/status`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(result => {
        const position = result.data.results.position
        if (position > this.state.position) {
          this.timeEnd()
          window.location.reload()
        }
      }).catch(e => {
        console.log(e)
      })
  }

  waitQuestion () {
    this.timeId = setInterval(this.checkNew, 1000)
  }

  start () {
    if (this.state.remainTime === 1) {
      this.timeEnd()
    }
    this.setState({ remainTime: this.state.remainTime - 1 })
  }

  componentDidMount () {
    const sessionId = this.props.match.params.sessionId
    const playerId = this.props.match.params.playerId
    axios.get(`http://localhost:5005/admin/session/${sessionId}/status`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(result => {
        const position = result.data.results.position
        if (position > -1) {
          const question = result.data.results.questions[position]
          this.setState({
            question: question,
            sessionId: sessionId,
            playerId: playerId,
            remainTime: question.time,
            position: position,
            numQuestion: result.data.results.questions.length
          })
          this.timeId = setInterval(this.start, 1000)
        }
      }).catch(e => {
        console.log(e)
        // alert('Invalid input/token')
      })
  }

  timeEnd () {
    clearInterval(this.timeId)
  }

  change (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render () {
    if (this.state.question === '') {
      return (
      <div>
        <h1>Welcome to Play Game Page</h1>
        <h2>Please wait for the Admin to start the game ...</h2>
        <h2>Please refresh the browser once admin starts the 1st question (you only need to do it once)</h2>
        <div>
          Please note: if you click submit button, then next question will be jumped out automatically. If you do not click submit, then you will have to refresh the browser to jump to next question.
        </div>
      </div>
      )
    }
    if (this.state.remainTime === 0 && this.state.position === this.state.numQuestion - 1) {
      // alert("Congratulations! You finished all questions!")
      return (<Redirect to='/playFinish'></Redirect>)
    }
    const nextQuestion = parseInt(this.state.question.id) + 1
    if (this.state.remainTime === 0) {
      return (
        <div>
          <div>
            Time is up!
          </div>
          <div>
            The question is: {this.state.question.question}
          </div>
          <div>
            The correct answers is/are:
          </div>
          <div>
            Please wait for the next question (i.e. Quesion No.{nextQuestion}) ...
          </div>
        </div>
      )
    }
    return (
      <div>
        <div>
          <label>Remaining Time: {this.state.remainTime}</label>
        </div>
        <div>
          The question is: {this.state.question.question}
        </div>
        <div>
        <Table striped bordered hover variant="dark" responsive="sm">
            <thead>
              <tr>
                <th>No.</th>
                <th>Answer Options</th>
                <th>Select one or more</th>
              </tr>
            </thead>
            <tbody>
              {this.state.question.answers.map((v, i) => (<tr key={i}>
                  <td>{v}</td>
                  <td>{i}</td>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                </tr>)
              )}
            </tbody>
          </Table>
        </div>
        <div>
          <Button variant="outline-primary" onClick={this.submit}>Submit</Button>
        </div>
      </div>
    );
  }
}

PlayGame.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sessionId: PropTypes.string,
      playerId: PropTypes.string
    })
  }),
}

export default PlayGame;
