import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todos from './components/Todos';
import TodoCreator from './components/TodoCreator';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Todos</h1>
        <TodoCreator />
        <Todos />
      </div>
    );
  }
}

export default App;
