import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  render() {
    const { id, text, deadline, progress } = this.props.todo;
    return (
        <div className="card mb-3">
          <div className="card-body">
          <div className="row">
            <div className="col-10 offset-1">
              <div className="row">
                <div className="col-5 d-flex align-items-center">
                  <div className="row no-gutters">
                  <p className="m-0">{text}</p>
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <p className="m-0">{deadline}</p>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <p className="m-0">{progress}</p>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <button type="button" className="btn btn-primary mr-1" onClick={this.props.showForm.bind(this, id)}>edit</button>
                  <button type="button" className="btn btn-danger">delete</button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default TodoItem;
