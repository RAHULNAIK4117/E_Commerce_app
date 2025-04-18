import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({
    image: String
},{
    timestamps: true
})

const Banner = mongoose.model('Banner', bannerSchema)
export default Banner;
