import express from 'express'
import { addOrder, getAllOrders, getOrders, updateOrder } from '../../controllers/user/orderController.js'




const router = express.Router()

router.post('/addOrder', addOrder)
router.get('/get/:userId', getOrders)
router.get('/getAllOrders', getAllOrders)
router.put('/update', updateOrder)


export default router
