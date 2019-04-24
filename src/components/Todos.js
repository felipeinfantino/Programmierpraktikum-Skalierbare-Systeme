import React from 'react';
import TodoCreator from './TodoCreator';
import TodoItem from './TodoItem';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Todos extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      todos: [
        {
          id: 0,
          text: 'First task',
          deadline: '25-04-2019',
          progress: '0%'
        },
        {
          id: 1,
          text: 'Second task',
          deadline: '25-04-2019',
          progress: '0%'
        },
        {
          id: 2,
          text: 'Third task',
          deadline: '25-04-2019',
          progress: '0%'
        },
        {
          id: 3,
          text: 'Fourth task',
          deadline: '25-04-2019',
          progress: '0%'
        }
      ]
    };
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    console.log('this.state.show', this.state)
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Button className="mt-3" variant="primary" onClick={this.handleShow}>
          Create a todo
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a todo</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <TodoCreator/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} className="mt-5">
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose} className="mt-5">
              Create
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-10 offset-1 mt-3">
          {this.state.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} showForm={this.handleShow}/>
          ))}
        </div>
      </div>
    );
  }
}

export default Todos;
