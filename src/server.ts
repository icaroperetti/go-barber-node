import 'reflect-metadata';
import express from 'express';
import { appointmentsRoutes } from './routes';
import './database';


const app = express();
app.use(express.json());

app.use("/appointments", appointmentsRoutes)

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
