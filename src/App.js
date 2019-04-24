import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todos from './components/Todos';
import TodoCreator from './components/TodoCreator';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <h3>React-Todo-App</h3>
          </Navbar.Brand>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Impressum</Nav.Link>
        </Navbar>

        <TodoCreator />
        <Todos />
      </div>
    );
  }
}

export default App;
