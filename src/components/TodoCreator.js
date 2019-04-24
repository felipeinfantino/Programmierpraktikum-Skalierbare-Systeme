import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Calendar from 'react-calendar';

class TodoCreator extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }
  state = {
    date: new Date()
  };

  onChange = date => {
    this.setState({ date });
    console.log(this.state);
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <button class="btn btn-primary mt-3" variant="primary" onClick={this.handleShow}>
          Create a todo
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a todo</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input class="form-control" type="text" placeholder="Todo text" />
            <br />
            <h6>Set a deadline</h6>
            <Calendar onChange={this.onChange} value={this.state.date} />
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={this.handleClose}>
              Close
            </button>
            <button variant="primary" onClick={this.handleClose}>
              Create
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default TodoCreator;
