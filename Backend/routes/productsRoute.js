import express from 'express'
import { addProduct, deleteProduct, getProductDetails, getProducts, updateProduct } from '../controllers/productsController.js'
import { upload } from '../helpers/cloudinary.js'

const router = express.Router()

// router.post("/upload-image", upload.single("my_file"), handleImageUpload)
router.post("/add", upload.array("images", 10), addProduct)
router.put("/update/:id", updateProduct)
router.delete("/delete/:id", deleteProduct)
router.get("/get", getProducts)
router.get("/get/:id", getProductDetails)



export default router