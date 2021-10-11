import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

function CreateUserScreen (props) {
  const [username, setUsername] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const user = { username: username }

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    setUsername('');
  }

  return (
    <FormContainer>
      <h3>Create New User</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>User</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter new user'
            value={username}
            onChange={e => setUsername(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Create User</Button>
      </Form>
    </FormContainer>
  );
}

export default CreateUserScreen;