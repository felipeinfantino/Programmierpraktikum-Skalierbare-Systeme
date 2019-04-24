import React from 'react';

class Todos extends React.Component {
  render() {
    return (
      <table class="table table-dark mt-3">
        <thead>
          <tr>
            <th scope="col">Text</th>
            <th scope="col">Deadline</th>
            <th scope="col">Prozent</th>
            <th scope="col">Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">This is a todo</th>
            <td>Apr 14</td>
            <td>0</td>
            <td>
              <button class="btn btn-secondary mr-2">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <th scope="row">This is another todo</th>
            <td>May 23</td>
            <td>0</td>
            <td>
              <button class="btn btn-secondary mr-2">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <th scope="row">This is the last todo</th>
            <td>Okt 2</td>
            <td>0</td>
            <td>
              <button class="btn btn-secondary mr-2">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Todos;
