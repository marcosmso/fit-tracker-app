import express from 'express'
import mongoose from 'mongoose'
const router = express.Router()
import Exercise from "../models/exerciseModel.js"
import User from "../models/userModel.js"

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route('/calendar').get(async (req, res) => {

  const loggedExercises = await Exercise.aggregate(
    [
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date"} },
          count: { $sum: 1}
        }
      }
    ]
  )

  loggedExercises.forEach( obj => {
    obj['date'] = obj['_id']
    delete obj['_id']
  })

  res.json(loggedExercises)
})

router.route('/calendar/user/:id').get(async (req, res) => {

  const loggedExercises = await Exercise.aggregate(
    [
      { 
        $match: { 'user': new mongoose.Types.ObjectId(req.params.id)}
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date"} },
          count: { $sum: 1}
        }
      }
    ]
  )

  loggedExercises.forEach( obj => {
    obj['date'] = obj['_id']
    delete obj['_id']
  })

  res.json(loggedExercises)
})

router.route('/user/:id').get((req, res) => {
  Exercise.find({user: req.params.id})
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json("Error: " + err))
});

router.route('/add').post(async (req, res) => {

    const foundUser = await User.find({username: req.body.user})

    const newExercise = new Exercise({
        user: foundUser[0]._id,
        name: foundUser[0].name,
        description: req.body.description,
        duration: req.body.duration,
        date: Date.parse(req.body.date)
    })

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => {
          console.log(err)
          res.status(400).json('Error: ' + err)
        })
})

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
})
  
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})
  
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);
    
            exercise.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router