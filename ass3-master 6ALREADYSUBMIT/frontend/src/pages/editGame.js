import React from 'react';
import { Redirect } from 'react-router-dom'
import Head from '../components/head';
import Finish from '../components/finish'
import axios from 'axios'
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

class EditGame extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rows: [],
      redirect: '',
      id: '',
      name: '',
      addQuestionName: ''
    }
    this.change = this.change.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  edit (id) {
    this.setState({ redirect: `/editQuestion/${this.state.id}/${id}` })
  }

  create () {
    let maxid = 0
    this.state.rows.forEach(element => {
      maxid = parseInt(element.id) > maxid ? parseInt(element.id) : maxid
    })
    const id = maxid + 1

    const rows = this.state.rows
    rows.push({
      id: id.toString(),
      question: this.state.addQuestionName,
      type: 'single',
      time: 0,
      point: 0,
      answers: []
    })
    axios.put(`http://localhost:5005/admin/quiz/${this.state.id}`,
      {
        name: this.state.name,
        thumbnail: this.state.thumbnail,
        questions: rows
      }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r => {
      this.setState({ redirect: `/editQuestion/${this.state.id}/${id}` })
    }).catch(e => {
      console.log(e)
      alert('Invalid input/token')
    })
  }

  delete (id) {
    const rows = this.state.rows
    const newRows = []
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id !== id) {
        newRows.push(rows[i])
      }
    }
    axios.put(`http://localhost:5005/admin/quiz/${this.state.id}`,
      {
        name: this.state.name,
        thumbnail: this.state.thumbnail,
        questions: newRows
      }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r => {
      window.location.reload()
    }).catch(e => {
      console.log(e)
      alert('Invalid input/token')
    })
  }

  componentDidMount () {
    const id = this.props.match.params.currGameId
    axios.get(`http://localhost:5005/admin/quiz/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r => {
      this.setState({
        id: id,
        name: r.data.name,
        rows: r.data.questions
      })
    }).catch(e => {
      console.log(e)
      alert('Invalid input/token')
    })
  }

  change (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render () {
    console.log(this.state.rows)
    if (this.state.redirect !== '') {
      return (
        <Redirect to={this.state.redirect}></Redirect>
      )
    }
    let td = ''
    if (this.state.rows.length === 0) {
      td = "You don't have any questions, try to create one"
    }
    return (
      <div>
        <h1>Welcome to Edit Game Page</h1>
        <Head></Head>
        <div>
          <input name="addQuestionName" value={this.state.addQuestionName} onChange={this.change}></input>
          <Button color="primary" onClick={() => this.create()}>Add question</Button>
        </div>
        <Table striped bordered hover variant="dark" responsive="sm">
          <thead>
            <tr>
              <th>Question ID</th>
              <th>Question</th>
              <th>Question Type</th>
              <th>Number of Provided Choice</th>
              <th>Admin Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((v, i) => (
              <tr key={i}>
                <td>{v.id}</td>
                <td>{v.question}</td>
                <td>{v.type}</td>
                <td>{v.answers.length}</td>
                <td>
                  <ButtonGroup vertical>
                    <DropdownButton as={ButtonGroup} title="See Action" id="bg-vertical-dropdown-1">
                      <Dropdown.Item onClick={() => this.edit(v.id)}>Edit this question</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.delete(v.id)}>Delete this question</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {td}
        <Finish></Finish>
      </div>
    );
  }
}

EditGame.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      currGameId: PropTypes.string
    })
  }),
}

export default EditGame;
