jsx
import React, { useState } from 'react';
import axios from 'axios';

function AddEmployee() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const employee = { name, position, salary };
    axios.post('/api/employees', employee)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Position:
          <input type="text" value={position} onChange={event => setPosition(event.target.value)} />
        </label>
        <br />
        <label>
          Salary:
          <input type="number" value={salary} onChange={event => setSalary(event.target.value)} />
        </label>
        <br />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
