import Feature from "../../models/FeatureModel.js";


const addFeatureImage = async (req, res) => {
    try {
        const {image} = req.body;

        if(!image){
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }

        const featureImage = new Feature({
            image
        })

        await featureImage.save()
        res.status(201).json({
            success: true,
            message: "Feature image added successfully",
            data: featureImage
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error adding feature image"
        })
        
    }
};


const getFeatureImages = async (req, res) => {
    try {
        const images = await Feature.find({})

        res.status(200).json({
            success: true,
            message: 'feature images got successfully.',
            data: images
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error getting feature image"
        })
        
    }
};

const deleteFeatureImages = async (req, res) => {
    try {
        const id = req.params.id
        const image = await Feature.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'feature images delete successfully.',
            data: image
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error deleting feature image"
        })
        
    }
};

export {addFeatureImage, getFeatureImages, deleteFeatureImages}