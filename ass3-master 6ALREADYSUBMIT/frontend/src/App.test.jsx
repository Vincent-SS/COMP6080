import React from 'react';
import { render, screen } from '@testing-library/react';
// import App from './App';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Login from './pages/login';
import PlayGame from './pages/playGame';
import PlayJoin from './pages/playJoin';
import EditGame from './pages/editGame';
import EditQuestion from './pages/editQuestion';

// Test Dashboard page
test('test Dashboard', () => {
  render(<Dashboard/>)
  const linkElement = screen.getByText('Game Title');
  expect(linkElement).toBeInTheDocument();
})

test('test Dashboard', () => {
  render(<Dashboard/>)
  const linkElement = screen.getByText('Admin Action');
  expect(linkElement).toBeInTheDocument();
})

// Test Register
test('test Register', () => {
  render(<Register/>)
  const linkElement = screen.getByText('Email:');
  expect(linkElement).toBeInTheDocument();
})

// Test Edit Game
test('test EditGame', () => {
  const match = { params: { gameId: '336731648' } }
  render(<EditGame match={match}/>)
  const linkElement = screen.getByText('Admin Action');
  expect(linkElement).toBeInTheDocument();
})

// Test Login
test('test Login', () => {
  render(<Login/>)
  const linkElement = screen.getByText('Email:');
  expect(linkElement).toBeInTheDocument();
})

// Test Login
test('test Login', () => {
  render(<Login/>)
  const linkElement = screen.getByText('Password:');
  expect(linkElement).toBeInTheDocument();
})

// Test Edit Question
test('test EditQuestion', () => {
  const match = { params: { currGameId: '939863169', questionId: '1' } }
  render(<EditQuestion match={match}/>)
  const linkElement = screen.getByText('Tick the Correct Answer');
  expect(linkElement).toBeInTheDocument();
})

// Test Play game
test('test PlayGame', () => {
  const match = { params: { sessionId: '427010', playerId: '546116405' } }
  render(<PlayGame match={match}/>)
  const linkElement = screen.getByText('Welcome to Play Game Page');
  expect(linkElement).toBeInTheDocument();
})

// Test Play Join
test('test PlayJoin', () => {
  const match = { params: { sessionId: '427010' } }
  render(<PlayJoin match={match}/>)
  const linkElement = screen.getByText('Please type your name to join!');
  expect(linkElement).toBeInTheDocument();
})
