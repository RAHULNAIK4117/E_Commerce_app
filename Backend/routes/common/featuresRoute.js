import express from 'express'
import { addFeatureImage, deleteFeatureImages, getFeatureImages } from '../../controllers/admin/featureController.js';

const router = express.Router();

router.post('/add', addFeatureImage)
router.get('/get', getFeatureImages)
router.delete('/delete/:id', deleteFeatureImages)

export default router