import dotenv from 'dotenv';
dotenv.config(); // Phải đặt ở đầu file

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRouters.js';
import categoryRoutes from './routes/categoryRoutes.js' 
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT || 5000;

connectDB(); // Kết nối database

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use('/api/category', categoryRoutes)
app.use('/api/products', productRoutes)


app.listen(port, () => console.log(`Server running on port: ${port}`));
