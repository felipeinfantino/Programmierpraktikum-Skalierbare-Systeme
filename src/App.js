import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import {BrowserRouter, Route} from 'react-router-dom'
import Impressum from './components/Impressum'
import Todos from './components/Todos'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>
              <h3>React-Todo-App</h3>
            </Navbar.Brand>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/impressum">Impressum</Nav.Link>
          </Navbar>
          <Route exact path='/' component={Todos}/>
          <Route path='/impressum' component={Impressum}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
