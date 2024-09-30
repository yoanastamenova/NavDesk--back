import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/db';
import authRouter from "./routes/authRouter"
import userRouter from "./routes/userRouter"
import roomRouter from "./routes/roomRouter"
import accessRouter from "./routes/bookingRoutes"
import historyRouter from "./routes/historyRouter"
import adminRouter from "./routes/reportRoutes"

const app = express();
app.use(cors())
app.use(express.json())

//CONFIG
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })


//HOME HEALTHY ROUTE
app.get('/healthy', (req, res) => {
    res.status(200).json(
      {
        success: true,
        message: 'Server is Healthy'
      }
    )
  })

//ROUTES
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/rooms', roomRouter);
app.use('/access', accessRouter);
app.use('/history', historyRouter);
app.use('/report', adminRouter);