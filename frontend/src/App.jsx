import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Container } from 'react-bootstrap'

import Header from "./components/Header"
import Footer from "./components/Footer"
import ExercisesListScreen from "./screens/ExercisesListScreen";
import EditExerciseScreen from "./screens/EditExerciseScreen";
import CreateExerciseScreen from "./screens/CreateExerciseScreen";
import CreateUserScreen from "./screens/CreateUserScreen";

function App() {
  return (
    <Router>
      <Header />
      <Container> 
        <Route path="/" exact component={ExercisesListScreen} />
        <Route path="/edit/:id" component={EditExerciseScreen} />
        <Route path="/create" component={CreateExerciseScreen} />
        <Route path="/user" component={CreateUserScreen} />
      </Container>
      <Footer />
    </Router>
  );
}

export default App;