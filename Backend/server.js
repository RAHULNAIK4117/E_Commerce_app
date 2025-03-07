import dotenv from "dotenv";
dotenv.config(); // Load .env variables at the very beginning

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userroute.js";
import productRouter from "./routes/productRoutes.js";

const app = express();
const port = process.env.PORT || 5500;

connectDB(); 

// Middlewares
app.use(express.json());
app.use(cors());


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
    res.send("API WORKING");
});

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
