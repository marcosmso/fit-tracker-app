import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

function CreateExerciseScreen () {

  const [users, setUsers ] = useState([]);

  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
  });
  
  useEffect(()=>{ 
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username))
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  function handleChange(event){
    const { name, value } = event.target;
    
    setState((prevState) => {
      return { ...prevState, [name]: value }
    });
  }

  function handleDateChange(newDate){
    setState((prevState)=>{
      return { ...prevState, date: newDate}
    })
  }

  function onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  return (
    <FormContainer>
      <h3>Create New Exercise Log</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group> 
          <Form.Label>Username: </Form.Label>
          <select
              required
              name="username"
              className="form-control"
              value={state.username}
              onChange={handleChange}>
              {
                users.map(function(user) {
                  return <option key={user} value={user}>{user}</option>;
                })
              }
          </select>
        </Form.Group>

        <Form.Group> 
          <Form.Label>Description: </Form.Label>
          <input type="text"
              name="description"
              className="form-control"
              value={state.description}
              onChange={handleChange}
              />
        </Form.Group>

        <Form.Group>
          <Form.Label>Duration (in minutes): </Form.Label>
          <Form.Control
              type="text" 
              name="duration" 
              value={state.duration}
              onChange={handleChange}
              />
        </Form.Group>

        <Form.Group>
          <Form.Label>Date: </Form.Label>
            <DatePicker
              name="date"
              selected={state.date}
              onChange={handleDateChange}
            />
        </Form.Group>
        
        <Button type='submit' variant='primary'>Create Exercise Log</Button>
      </Form>
    </FormContainer>
  )
}

export default CreateExerciseScreen;