import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Welcome from './pages/welcome';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import EditGame from './pages/editGame';
import EditQuestion from './pages/editQuestion';
import PlayGame from './pages/playGame';
import PlayJoin from './pages/playJoin';
import PlayFinish from './pages/playFinish'

function App () {
  const loginSuccess = () => {
    if (localStorage.getItem('token')) {
      console.log('ture')
      return true
    } else {
      console.log('false')
      return false
    }
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Welcome}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/dashboard' component={loginSuccess() ? Dashboard : Login}></Route>
          <Route exact path='/editGame/:currGameId' component={loginSuccess() ? EditGame : Welcome}></Route>
          <Route exact path='/editQuestion/:currGameId/:questionId' component={loginSuccess() ? EditQuestion : Welcome}></Route>
          <Route exact path='/playGame/:sessionId/:playerId' component={PlayGame}></Route>
          <Route exact path='/playJoin/:sessionId' component={PlayJoin}></Route>
          <Route exact path='/playFinish' component={PlayFinish}></Route>
          <Route exact path='/register' component={Register}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
