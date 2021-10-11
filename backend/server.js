import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import exerciseRouter from "./routes/exerciseRoutes.js"
import userRouter from "./routes/UserRoutes.js"

dotenv.config()

connectDB()

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter)

const __dirname = path.resolve()

if(process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} 

const PORT = process.env.PORT || 5000; 
app.listen(PORT, ()=>{
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});