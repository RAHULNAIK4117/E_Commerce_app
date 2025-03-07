import express from "express";
import {
  listproduct,
  addProduct,
  removeproduct,
  singleproduct,
} from "../controllers/productcontroller.js";
import { upload } from "../config/cloudinary.js";

const productRouter = express.Router();

// Correct API Endpoints
productRouter.post("/add", upload.array("images", 10), addProduct);
productRouter.get("/list", listproduct);
productRouter.delete("/remove/:id", removeproduct);
productRouter.get("/single/:id", singleproduct);

export default productRouter;
