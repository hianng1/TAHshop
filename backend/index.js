import dotenv from 'dotenv';
dotenv.config(); // Phải đặt ở đầu file

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

const port = process.env.PORT || 4999;

connectDB(); // Kết nối database

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
