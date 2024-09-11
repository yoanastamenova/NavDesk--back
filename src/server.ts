import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/db';

const app = express();
app.use(cors())
app.use(express.json())

//CONFIG
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })

//Home

app.get('/healthy', (req, res) => {
    // res.send('Server is healthy');
  
    res.status(200).json(
      {
        success: true,
        message: 'Server is Healthy'
      }
    )
  })