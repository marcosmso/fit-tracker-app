import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Exercise from '../components/Exercise'
import {Table} from 'react-bootstrap'


function ExercisesListScreen() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        setExercises(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  function deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+ id)
      .then(response => { console.log(response.data)});

    setExercises(()=>{
      return exercises.filter((elem) => elem._id !== id)
    })
  }

  return (
    <>
      <h3>Logged Exercises</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        { 
          exercises.map((currentexercise) => {
            return (
              <Exercise 
                exercise={currentexercise} 
                onDelete={deleteExercise} 
                key={currentexercise._id}
                id={currentexercise._id}
              />);
          })
        }
        </tbody>
      </Table>
    </>
  )
}

export default ExercisesListScreen;