import React from 'react';
import Calendar from 'react-calendar';

class TodoCreator extends React.Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Text:
          <input value={this.props.todo.text} onChange={this.props.handler} name="text" type="text" className="form-control" />
        </label>
        <label>
          Progress (in %):
          <input value={this.props.todo.progress} onChange={this.props.handler} name="progress" type="text" className="form-control" />
        </label>
        <h6>Set a deadline</h6>
        <Calendar value={this.props.todo.deadline} onChange={this.props.dateHandler} />
      </form>
    );
  }
}
export default TodoCreator;
