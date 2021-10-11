import React from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
import { Form} from 'react-bootstrap'

const SelectUser = () => {

  const [users, setUsers] = useState([])

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
  }, [])

  function handleChange(event){
    const { name, value } = event.target
    
    setState((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  function onSubmit (e) {
    e.preventDefault();
  }

  return (
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
                return <option key={user} value={user}>{user}</option>
              })
            }
        </select>
      </Form.Group>
    </Form>
  )
}

export default SelectUser
