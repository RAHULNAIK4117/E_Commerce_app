import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv';
dotenv.config()


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const project_folder = 'Rahul_Store';

        console.log({file});
        

        const fileType = file.mimetype.split('/')[0];
        const fileExtension = file.mimetype.split('/')[1];

        // console.log("Uploaded file information:", file);

        let file_folder;
        let file_format;
        let resource_type;

        switch (fileType) {
            case 'image':
                file_folder = 'images';
                file_format = 'jpg';
                resource_type = 'image';
                break;
            case 'video':
                file_folder = 'videos';
                file_format = 'mp4'; // Optional: Cloudinary can handle various video formats
                resource_type = 'video';
                break;
            case 'audio':
                file_folder = 'audios';
                file_format = 'mp3'; // Optional: Cloudinary can handle various audio formats
                resource_type = 'video'; // Use 'video' resource type for audio files as well
                break;
            default:
                file_folder = 'documents';
                file_format = undefined;
                resource_type = 'raw'; // Use 'raw' for documents and unsupported files
        }

        return {
            folder: `${project_folder}/${file_folder}`,
            format: file_format,
            public_id: `${file.originalname.split(".")[0]}-${Date.now()}`,
            resource_type: resource_type,
        };
    },
});

export const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
});