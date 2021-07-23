import React from 'react';
import { Redirect } from 'react-router-dom'
import DashboardHead from '../components/dashboardHead'
import Head from '../components/head';
import axios from 'axios'
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

class EditQuestion extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rows: [],
      addAnswer: '',
      type: 'single',
      question: '',
      url: '',
      time: 5,
      points: 0,
      nextPage: '',
      currGameId: '',
      questionId: '',
      data: ''
    }
    this.save = this.save.bind(this);
    this.add = this.add.bind(this)
    this.delete = this.delete.bind(this);
    this.change = this.change.bind(this);
  }

  add () {
    const rows = this.state.rows
    rows.push(this.state.addAnswer)
    this.setState({ rows: rows })
  }

  // Delete the answer and update rows
  delete (i) {
    const updateRows = []
    let j = 0
    for (j = 0; j < this.state.rows.length; j++) {
      if (j !== i) {
        updateRows.push(this.state.rows[j])
      }
    }
    this.setState({ rows: updateRows })
  }

  save () {
    if (this.state.rows.length <= 1 || this.state.rows.length >= 7) {
      alert('The number of choices should be in range of 2 and 6')
    } else {
      const questionData = {
        id: this.state.questionId,
        type: this.state.type,
        time: this.state.time,
        points: this.state.points,
        url: this.state.url,
        answers: this.state.rows,
        question: this.state.question,
        right: [1]
      }
      const d = this.state.data
      for (let i = 0; i < d.questions.length; i++) {
        if (d.questions[i].id !== this.state.questionId) {
          continue
        } else {
          d.questions[i] = questionData
          break
        }
      }
      axios.put(`http://localhost:5005/admin/quiz/${this.state.currGameId}`, d, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(r => {
          console.log('here')
          alert('Changes have been saved, back to Edit Game now')
          this.setState({ nextPage: `/editGame/${this.state.currGameId}` })
        }).catch(e => {
          console.log(e)
          alert('Invalid input/token')
        })
    }
  }

  componentDidMount () {
    const currGameId = this.props.match.params.currGameId
    const questionId = this.props.match.params.questionId
    axios.get(`http://localhost:5005/admin/quiz/${currGameId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(r => {
        const data = r.data.questions
        data.forEach(e => {
          if (e.id === questionId) {
            this.setState({
              currGameId: currGameId,
              questionId: questionId,
              data: r.data,
              rows: e.answers,
              type: e.type,
              question: e.question,
              time: e.time,
              points: e.points
            })
          }
        });
        this.setState({
          currGameId: currGameId,
          questionId: questionId,
          data: r.data
        })
      }).catch(e => {
        console.log(e)
        alert('Invalid token!')
      })
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
    const LineBreak = ({ height }) => (
    <hr
        style={{
          color: 'red',
          height: height
        }}
    />
    );

    return (
      <div>
        <h1>Welcome to Edit Question Page</h1>
        <div>
          <DashboardHead></DashboardHead>
          <Head></Head>
        </div>
        <div>
          <div>
            Question Type:
            <select name='type' value={this.state.type} onChange={this.change}>
              <option value="multiple" >Single Choice</option>
              <option value="single" >Multiple Choice</option>
            </select>
          </div>
          <div>
            Question:
            <input name="question" value={this.state.question} onChange={this.change}></input>
          </div>
          <div>
            Time Limit:
            <input name="time" type="number" value={this.state.time} onChange={this.change}></input>
          </div>
          <div>
            Points:
            <input name="points" type="number" value={this.state.points} onChange={this.change}></input>
          </div>
          <div>
            URL (optional):
            <input name="url" type="string" value={this.state.url} onChange={this.change}></input>
          </div>
        </div>
        <LineBreak height="5"/>
        <div>
          <input name="addAnswer" value={this.state.addAnswer} onChange={this.change}></input>
          <Button color="primary" onClick={() => this.add()}>Add answer</Button>
        </div>
        <LineBreak height="10"/>
        <Table striped bordered hover variant="dark" responsive="sm">
          <thead>
            <tr>
              <th>Answer Options</th>
              <th>Tick the Correct Answer</th>
              <th>Admin Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((v, i) => (
              <tr key={i}>
                <td>{v}</td>
                <td><input type="checkbox"></input></td>
                <td>
                  <Button variant="danger" onClick={() => this.delete(i)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div><Button variant="success" onClick={() => this.save()}>Finish / Go back to Edit Game</Button></div>
      </div>
    );
  }
}

EditQuestion.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      currGameId: PropTypes.string,
      questionId: PropTypes.string
    })
  }),
}

export default EditQuestion;
