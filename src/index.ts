import { PrismaClient } from '@prisma/client';
import express from 'express';
import * as dotenv from 'dotenv';
import routes from './routes';

const prisma = new PrismaClient();

const app = express();
dotenv.config();
app.use(express.json())

app.get('/', async (req, res) => {
  res.json({
    success: true,
    payload: [],
    message: "Home",
  })
})

app.use('/api/', routes);

app.use((req, res, next) => {
    res.status(404);
    return res.json({
      success: false,
      payload: null,
      message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
  });

// #6
app.listen(8888, () =>
  console.log('REST API server ready at: http://localhost:8888'),
)