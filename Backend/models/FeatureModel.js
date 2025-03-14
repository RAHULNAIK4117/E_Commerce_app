import mongoose from 'mongoose'

const featureSchema = new mongoose.Schema({
    image: String
},{
    timestamps: true
})

const Feature = mongoose.model('Feature', featureSchema)
export default Feature;