import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Exercise from '../components/Exercise'
import {Table, Form} from 'react-bootstrap'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

const today = new Date()

function ExercisesListScreen() {
  
  const [exercises, setExercises] = useState([])
  const [selectedUser, setSelectedUser] = useState({username:''})
  const [users, setUsers ] = useState([])
  const [dates, setDates] = useState([]) 

  useEffect(() => {
    if (selectedUser.username !== ''){
      axios.get(`http://localhost:5000/exercises/user/${selectedUser._id}` )
      .then(response => {
        setExercises(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
    }
    else {
      axios.get('http://localhost:5000/exercises/')
      .then(response => {
        setExercises(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, [selectedUser])

  useEffect(()=>{ 
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (selectedUser.username !== ''){
      axios.get(`http://localhost:5000/exercises/calendar/user/${selectedUser._id}`)
      .then(response => {
        if (response.data.length > 0) {
          setDates(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
    else {
      axios.get('http://localhost:5000/exercises/calendar')
      .then(response => {
        if (response.data.length > 0) {
          setDates(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [selectedUser])

  function deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+ id)
      .then(response => { console.log(response.data)})

    setExercises(()=>{
      return exercises.filter((elem) => elem._id !== id)
    })
  }

  function handleChange(e) { 
    const selected = users.filter((user) => {
      return user.username === e.target.value
    })
    if (selected.length > 0) {
      setSelectedUser(selected[0]) 
    } else {
      setSelectedUser({username:''}) 
    }
  }

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  return (
    <>
      <h3>Logged Exercises</h3>

      <CalendarHeatmap
        startDate={shiftDate(today, -365)}
        endDate={today}
        values={dates}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={value => {
            const tip = value.date ? `${value.date} has count: ${value.count}` : 'No counts'
            return {
              'data-tip': tip
            }
        }}
        showWeekdayLabels={false}
        onClick={value => {
          if (value){
            alert(`${value.date} has count: ${value.count}`)
          }
        }}
      />
      <ReactTooltip />

      <Form className='mb-3 mt-6'>
        <Form.Group> 
          <Form.Label> </Form.Label>
          <select
              required
              name="username"
              className="form-control"
              value={selectedUser.username}
              onChange={handleChange}>
              <option defaultValue="">All Users</option>
              {
                users.map(function(selectedUser) {
                  return <option key={selectedUser._id} value={selectedUser.username}>{selectedUser.username}</option>
                })
              }
          </select>
        </Form.Group>
      </Form>

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

export default ExercisesListScreen