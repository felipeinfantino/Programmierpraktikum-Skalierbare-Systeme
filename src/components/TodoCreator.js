import React from 'react';
import Calendar from 'react-calendar';

class TodoCreator extends React.Component {
  state = {
    date: new Date()
  };

  onChange = date => {
    this.setState({ date });
    console.log(this.state);
  };


  render() {
    return (
      <>
      <input className="form-control" type="text" placeholder="Todo text" />
      <br />
      <h6>Set a deadline</h6>
      <Calendar onChange={this.onChange} value={this.state.date} />
      </>
    );
  }
}

export default TodoCreator;
