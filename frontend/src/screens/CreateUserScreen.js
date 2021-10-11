import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

function CreateUserScreen (props) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  // const [state, setState] = useState({})
  // const [success, setSuccess] = useState()

  function onSubmit(e) {
    e.preventDefault()
    
    const user = { 
      username: email, 
      name: name 
    }

    axios.post('/users/add', user)
      .then(res => console.log(res.data))

    setEmail('')
    setName('')
  }

  return (
    <FormContainer>
      <h3>Create New User</h3>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            required
            type='email' 
            placeholder='Enter user email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>User</Form.Label>
          <Form.Control 
            required
            type='text' 
            placeholder='Enter new user'
            value={name}
            onChange={e => setName(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button className='mt-3' type='submit' variant='primary'>Create User</Button>
      </Form>
    </FormContainer>
  )
}

export default CreateUserScreen