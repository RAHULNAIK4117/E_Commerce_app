import express from 'express';
import { createReview, deleteReview, getReview, getReviews } from '../controllers/reviewController.js';


const router = express.Router();

router.post('/create', createReview)
router.get('/get', getReviews)
router.get('/get/:reviewId', getReview)
router.delete('/delete/:reviewId', deleteReview)

export default router


