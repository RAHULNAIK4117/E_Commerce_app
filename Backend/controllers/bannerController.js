import Banner from "../models/BannerModel.js";


const addBannerImage = async (req, res) => {
    try {
        const images = req.files?.map((image) => {
            return {
                image: image.path
            }
        }) || [];

        if(images.length === 0){
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }

        const bannerImage = await Banner.insertMany(images)

        // await featureImage.save()
        res.status(201).json({
            success: true,
            message: "Banner image added successfully",
            data: bannerImage
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error adding banner image"
        })
        
    }
};


const getBannerImages = async (req, res) => {
    try {
        const images = await Banner.find({})

        res.status(200).json({
            success: true,
            message: 'banner images got successfully.',
            data: images
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error getting banner image"
        })
        
    }
};

const deleteBannerImages = async (req, res) => {
    try {
        const id = req.params.id
        const image = await Banner.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'banner images delete successfully.',
            data: image
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error deleting banner image"
        })
        
    }
};

export {addBannerImage, getBannerImages, deleteBannerImages}
