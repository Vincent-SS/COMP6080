import axios from 'axios';
import React from 'react';
import Head from '../components/head'
import { Redirect } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'

class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rows: [],
      newGameName: '',
      nextPage: '',
      changePage: false
    }
    this.change = this.change.bind(this);
    this.create = this.create.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  // create new game
  create () {
    // console.log(this.state.newGameName)
    if (this.state.newGameName !== '') {
      axios.post('http://localhost:5005/admin/quiz/new',
        {
          name: this.state.newGameName
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(r => {
        alert('You have created a new game called ' + this.state.newGameName + '!')
        window.location.reload()
      }).catch(e => {
        console.log(e)
        alert('Invalid input/token')
      })
    }
  }

  // Edit game
  edit (id) {
    this.setState({
      changePage: true,
      nextPage: '/editGame/' + id.toString()
    })
  }

  // Delete a game
  delete (id) {
    axios.delete('http://localhost:5005/admin/quiz/' + id.toString(), { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r => {
      alert('You have deleted this game')
      window.location.reload()
    }).catch(e => {
      console.log(e)
      alert('Invalid Input/Token')
    })
  }

  // After start, go to next question
  next (id) {
    axios.post(`http://localhost:5005/admin/quiz/${id}/advance`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(r => {
        alert('Next question is shown to players!')
      }).catch(e => {
        console.log(e)
        alert('No more questions!')
      })
  }

  // Start the game
  start (id) {
    // console.log(`Bearer ${localStorage.getItem('token')}`)
    axios.post(`http://localhost:5005/admin/quiz/${id}/start`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(r => {
        axios.get(`http://localhost:5005/admin/quiz/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r2 => {
          alert('Please copy http://localhost:3000/playJoin/' + r2.data.active + ' to join the game')
        })
      }).catch(e => {
        console.log(e)
        alert('Invalid input/token')
      })
  }

  // stop the game
  stop (id) {
    axios.post(`http://localhost:5005/admin/quiz/${id}/end`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(r => {
      alert('The game has been stopped!')
    }).catch(e => {
      console.log(e.response.data.error)
      alert('Invalid input/token!')
    })
  }

  componentDidMount () {
    axios.get('http://localhost:5005/admin/quiz/', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(r => {
        const rows = []
        const q = []
        const allQuiz = r.data.quizzes
        // get all quiz info
        allQuiz.forEach(e => {
          q.push(axios.get('http://localhost:5005/admin/quiz/' + e.id.toString(), { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }))
        });
        Promise.all(q).then(r1 => {
          for (let i = 0; i < r1.length; i++) {
            let time = 0;
            r1[i].data.questions.forEach(e => { time += parseInt(e.time) })
            rows.push({
              id: allQuiz[i].id,
              name: allQuiz[i].name,
              numQuestion: r1[i].data.questions.length,
              thumbnail: allQuiz[i].thumbnail,
              url: allQuiz[i].url,
              totalTime: time
            })
          }
          this.setState({ rows: rows })
        })
      }).catch(e => {
        console.log(e)
        alert('Invalid Token/Input')
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
    // show no game if applied
    let td = ''
    if (this.state.rows.length === 0) {
      td = "You don't have any games, try to create one!"
    } else {
      td = 'You are in charge of ' + this.state.rows.length + ' games in total!'
    }
    /* else {
      for (var i = 0; i < this.state.rows.length; i++) {
        console.log(this.state.rows[i])
        td += '<tr><td>' + this.state.rows[i].name + '</td>' + '<td>' + this.state.rows[i].numQuestion + '</td>' + '<td><img src={' + this.state.rows[i].thumbnail + '} /</td>' + '<td>' + this.state.rows[i].totalTime + '</td>'
        td += '<td><ButtonGroup vertical><DropdownButton as={ButtonGroup} title="See Action" id="bg-vertical-dropdown-1">'
        td += '<Dropdown.Item onClick={() => this.edit(' + this.state.rows[i].id + ')}>Edit</Dropdown.Item>'
        td += '<Dropdown.Item onClick={() => this.delete(' + this.state.rows[i].id + ')}>Delete</Dropdown.Item>'
        td += '</DropdownButton></ButtonGroup></td><td><ButtonGroup vertical><DropdownButton as={ButtonGroup} title="Control Game" id="bg-vertical-dropdown-1">'
        td += '<Dropdown.Item onClick={() => this.start(' + this.state.rows[i].id + ')}>Start</Dropdown.Item>'
        td += '<Dropdown.Item onClick={() => this.stop(' + this.state.rows[i].id + ')}>Stop</Dropdown.Item>'
        td += '</DropdownButton></ButtonGroup></td></tr>'
      }
    }
    console.log(td) */
    return (
      <div>
        <h1>Welcome to Dashboard Page</h1>
        <Head></Head>
        <Form.Group size="sm">
          <Form.Label size="sm">Add a new Game here</Form.Label>
          <Form.Control value={this.state.newGameName} type="text" name="newGameName" data-testid="newGameName" placeholder="Type game name here..." onChange={this.change}/>
          <Button variant="success" onClick={() => this.create()} data-testid="add">Add!</Button>
        </Form.Group>
        <h3>{td}</h3>
        <Table striped bordered hover variant="dark" responsive="sm">
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Game Title</th>
              <th>Number of Questions</th>
              <th>Thumbnail</th>
              <th>Total Time (s)</th>
              <th>URL</th>
              <th>Admin Action</th>
              <th>Control Game</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((v, i) => (
              <tr key={i}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.numQuestion}</td>
                <td><img src={v.thumbnail} /></td>
                <td>{v.totalTime}</td>
                <td>{v.url}</td>
                <td>
                  <ButtonGroup vertical>
                    <DropdownButton as={ButtonGroup} title="See Action" id="bg-vertical-dropdown-1">
                      <Dropdown.Item onClick={() => this.edit(v.id)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.delete(v.id)}>Delete</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </td>
                <td>
                  <ButtonGroup vertical>
                    <DropdownButton as={ButtonGroup} title="Control Game" id="bg-vertical-dropdown-1">
                      <Dropdown.Item onClick={() => this.start(v.id)} data-testid="start">Start</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.next(v.id)} data-testid="next">Next Question</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.stop(v.id)} data-testid="end">Stop</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Dashboard;
