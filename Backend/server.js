import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoute.js'
import productRouter from './routes/productsRoute.js'
import cartRouter from './routes/cartRoute.js'
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js'
import bannerRouter from './routes/bannerRoute.js'
import paymentRouter from './routes/paymentRoute.js';
import reviewRouter from './routes/reviewRoute.js'

import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.MONGODB_URL).then(() => console.log("mongoDB connected...")).catch((error) => console.log(error))


const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_URL.split(',');

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error("Not allowed by CORS"));
            }
          },
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
        ],
        credentials: true
    })
);

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/addresses", addressRouter)
app.use("/api/orders", orderRouter)
app.use("/api/banner", bannerRouter)
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))