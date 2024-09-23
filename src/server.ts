import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/db';
import authRouter from "./routes/authRouter"

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
app.use('/api/auth', authRouter);
// app.use('/api/users', userRouter);
// app.use('/api/services', roomRouter);
// app.use('/api/appointments', accessRouter);
// app.use('/api/roles', accessHistoryRouter);
// app.use('/api/roles', administrationRouter);