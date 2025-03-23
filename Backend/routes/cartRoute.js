import express from "express"
import { addCartProduct, clearCart, createCart, deleteCartProduct, fetchCartProducts, updateProductQuantity } from "../controllers/cartController.js"


const router = express.Router();

router.post('/create/:userId', createCart);
router.post('/add', addCartProduct);
router.get('/get/:userId', fetchCartProducts);
router.put('/update', updateProductQuantity);
router.delete('/delete/:userId/:productId', deleteCartProduct);
router.delete('/clear/:userId', clearCart);

export default router