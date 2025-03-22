import express from 'express'
import { addBannerImage, deleteBannerImages, getBannerImages } from '../controllers/bannerController.js';
import { upload } from '../helpers/cloudinary.js';

const router = express.Router();

router.post('/add', upload.array("images", 10), addBannerImage)
router.get('/get', getBannerImages)
router.delete('/delete/:id', deleteBannerImages)

export default router