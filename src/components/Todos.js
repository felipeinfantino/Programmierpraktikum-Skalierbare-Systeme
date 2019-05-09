import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import firebase from '../config/firebase';
import 'firebase/database';

class Todos extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.database = firebase
      .database()
      .ref()
      .child('todos');

    this.handleShow = this.handleShow.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false,
      isEditDialog: false,
      todos: [],
      formTodo: {
        id: '',
        text: '',
        progress: '',
        deadline: new Date()
      }
    };
  }
  componentWillMount() {
    const previousTodos = this.state.todos;

    console.log(previousTodos);
    // DataSnapshot
    this.database.on('child_added', snap => {
      previousTodos.push({
        id: snap.key,
        text: snap.val().text,
        progress: snap.val().progress,
        deadline: snap.val().deadline
      });

      this.setState({
        todos: previousTodos
      });
    });

    this.database.on('child_changed', snap => {
      console.log(snap);
      const todoId = snap.key;
      const todoToUpdate = previousTodos.find(todo => todo.id === todoId);
      todoToUpdate['text'] = snap.val().text;
      todoToUpdate['progress'] = snap.val().progress;
      todoToUpdate['deadline'] = snap.val().deadline;

      this.setState({
        todos: previousTodos
      });
    });

    this.database.on('child_removed', snap => {
      for (var i = 0; i < previousTodos.length; i++) {
        if (previousTodos[i].id === snap.key) {
          previousTodos.splice(i, 1);
        }
      }

      this.setState({
        todos: previousTodos
      });
    });
  }

  handleClose() {
    this.resetForm();
    this.setState({ show: false });
  }

  resetForm() {
    this.setState({
      formTodo: {
        text: '',
        progress: '',
        deadline: new Date()
      }
    });
  }

  handleShow(event) {
    console.log(this.database);
    if (typeof event === 'string') {
      // that means an id was passed and we are actually editing and not creating
      const todo = this.state.todos.find(todo => todo.id === event);
      const dateSplitted = todo.deadline.split('/');
      const day = dateSplitted[0];
      const month = dateSplitted[1];
      const year = dateSplitted[2];
      this.setState({
        isEditDialog: true,
        formTodo: {
          id: todo.id,
          text: todo.text,
          progress: todo.progress,
          deadline: new Date(year, month, day)
        }
      });
    } else {
      this.setState({ isEditDialog: false });
    }
    this.setState({ show: true });
  }

  handleCalendarChange(date) {
    var formTodo = { ...this.state.formTodo };
    formTodo['deadline'] = date;
    this.setState({ formTodo: formTodo });
    console.log(formTodo);
  }

  handleChange(event) {
    // we only allow integers in progress . isNaN means is not a number
    if (event.target.name === 'progress') {
      if (isNaN(event.target.value)) {
        alert('Progess can only be a number');
        return;
      }
      if (parseFloat(event.target.value) > 100.0) {
        alert('Progress cant be higher than 100 %');
        return;
      }
      if (parseFloat(event.target.value) < 0) {
        alert('Progress cant be lower than 0 %');
        return;
      }
    }

    var formTodo = { ...this.state.formTodo };
    formTodo[event.target.name] = event.target.value;
    this.setState({ formTodo: formTodo });
  }

  handleSubmit(event) {
    event.preventDefault();
    var date = this.state.formTodo.deadline;
    var year = date.getFullYear().toString();
    var month = date.getMonth().toString();
    var day = date.getDate().toString();

    const todoId = this.state.formTodo.id;
    const existentTodo = this.state.todos.find(todo => todo.id === todoId);
    date = day + '/' + month + '/' + year;

    // if we are in the editing dialog we want to update the database, otherwise we want to update the node
    if (this.state.isEditDialog) {
      this.database.child(existentTodo.id).set({
        text: this.state.formTodo.text,
        progress: this.state.formTodo.progress,
        deadline: date
      });
    } else {
      // if we are creating we want to check that the todo text is unique
      if (existentTodo) {
        alert('You already have to do that');
        return;
      }
      this.database.push().set({
        text: this.state.formTodo.text,
        progress: this.state.formTodo.progress,
        deadline: date
      });
    }
    this.handleClose();
  }

  deleteItem(todoId) {
    // delete it on firebase. The listener child_removed is already implemented.
    this.database.child(todoId).remove();
    alert('Successfully deleted');
  }

  render() {
    return (
      <div>
        <Button className="mt-3" variant="primary" onClick={this.handleShow}>
          Create a todo
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {this.state.isEditDialog ? 'Edit a todo' : 'Create a todo'}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <TodoForm todo={this.state.formTodo} handler={this.handleChange} dateHandler={this.handleCalendarChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} className="mt-5">
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit} className="mt-5">
              {this.state.isEditDialog ? 'Edit' : 'Save'}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="col-10 offset-1 mt-3">
          {this.state.todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} delete={this.deleteItem} showForm={this.handleShow} />
          ))}
        </div>
      </div>
    );
  }
}

export default Todos;
