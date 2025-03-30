import mongoose from "mongoose";



const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    }
}, {
    timestamps: true
})

const Review = mongoose.model("Review", reviewSchema)
export default Review;