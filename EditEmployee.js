jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditEmployee(props) {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios.get(`/api/employees/${props.match.params.empId}`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.match.params.empId]);

  const handleSubmit = event => {
    event.preventDefault();
    axios.put(`/api/employees/${props.match.params.empId}`, employee)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = event => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={employee.name} onChange={handleChange} name="name" />
        </label>
        <br />
        <label>
          Position:
          <input type="text" value={employee.position} onChange={handleChange} name="position" />
        </label>
        <br />
        <label>
          Salary:
          <input type="number" value={employee.salary} onChange={handleChange} name="salary" />
        </label>