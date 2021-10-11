import React, { useState, useEffect} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(props) {

  const [users, setUsers ] = useState([]);

  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
  });

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/'+ props.match.params.id)
      .then(response => {
        setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []) 

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

    axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
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
        </div>

        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              name="description"
              className="form-control"
              value={state.description}
              onChange={handleChange}
              />
        </div>

        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text"
              name="duration"
              className="form-control"
              value={state.duration}
              onChange={handleChange}
              />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              name="date"
              selected={state.date}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>

      </form>
    </div>
  )
  
}

export default EditExercise;