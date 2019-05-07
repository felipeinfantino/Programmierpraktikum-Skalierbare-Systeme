import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import firebase from '../config/firebase'
import 'firebase/database'

class Todos extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.database = firebase.database().ref().child('todos');

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false,
      todos: [],
      formTodo: {
        text: '',
        progress: '',
        deadline: new Date()
      }
    };
  }
  componentWillMount(){
    const previousTodos = this.state.todos;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousTodos.push({
        id: snap.key,
        text: snap.val().text,
        progress: snap.val().progress,
        deadline: snap.val().deadline
      })

      this.setState({
        todos: previousTodos
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousTodos.length; i++){
        if(previousTodos[i].id === snap.key){
          previousTodos.splice(i, 1);
        }
      }

      this.setState({
        todos: previousTodos
      })
    })
  }

  addTodo(text) {
    this.database.push().set({text: text})
  }
  handleClose() {
    this.setState({ show: false });
    this.resetForm()
  }

  resetForm() {
    var formTodo = {...this.state.formTodo}
    Object.keys(formTodo).forEach( k => {
      formTodo[k] = ''
    })
    formTodo['date'] = new Date()
    this.setState({formTodo: formTodo})
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleCalendarChange(date) {
    var formTodo = {...this.state.formTodo}
    formTodo['date'] = date
    this.setState({formTodo: formTodo})
  }

  handleChange(event) {
    var formTodo = {...this.state.formTodo}
    formTodo[event.target.name] = event.target.value
    this.setState({formTodo: formTodo})
  }

  handleSubmit(event) {
    var date = this.state.formTodo.deadline
    var year = date.getFullYear().toString()
    var month = date.getMonth().toString()
    var day = date.getDate().toString()

    date = day + '/' + month + '/' + year

    event.preventDefault();
    this.database.push().set({
      text: this.state.formTodo.text,
      progress: this.state.formTodo.progress,
      deadline: date,
    })
    this.handleClose()
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
            <TodoForm todo={this.state.formTodo} handler={this.handleChange} dateHandler={this.handleCalendarChange}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} className="mt-5">
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit} className="mt-5">
              Save
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
