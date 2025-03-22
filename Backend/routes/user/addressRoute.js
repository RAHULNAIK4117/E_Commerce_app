import express from 'express'
import { addAddress, deleteAddress, getAddress, updateAddress } from '../../controllers/user/addressController.js'

const router = express.Router();

router.post('/add', addAddress)
router.get('/get/:userId', getAddress)
router.put('/update/:userId/:addressId', updateAddress)
router.delete('/delete/:userId/:addressId', deleteAddress)


export default router