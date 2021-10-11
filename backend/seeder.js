import dotenv from 'dotenv'
import users from './data/users.js'
import exercises from './data/exercises.js'
import User from './models/userModel.js'
import Exercise from './models/exerciseModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async() => {
  try{ 
    await Exercise.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const descriptions = ['academia', 'run 10km', 'crossfit', 'tenis', 'futebol', 'volei']

    let iDescription = 0
    for (let seededUser of createdUsers) {
      iDescription += 1
      const loggedExercises = exercises.map(exercise => {
        return { ...exercise, user: seededUser._id, name: seededUser.name, description: descriptions[iDescription]}
      })

      await Exercise.insertMany(loggedExercises)
    }

    console.log("Data Imported".green.inverse)
  } catch(e){ 
    console.error(`${e}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async() => {
  try{ 
    await Exercise.deleteMany()
    await User.deleteMany()

    console.log("Data Destroyed".red.inverse)
  } catch(e){ 
    console.error(`${e}`.red.inverse)
    process.exit(1)
  }
}

if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

