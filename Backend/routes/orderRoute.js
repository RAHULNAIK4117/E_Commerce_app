import express from 'express'
import { addOrder, getAllOrders, getOrder, getOrders, updateOrder,} from '../controllers/orderController.js'




const router = express.Router()

router.post('/addOrder', addOrder)
router.get('/get/:userId', getOrders)
router.get('/getAllOrders', getAllOrders)
router.get('/get-order/:orderId', getOrder)
router.put('/update/:orderId', updateOrder)






export default router
