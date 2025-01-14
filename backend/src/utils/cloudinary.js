const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');


// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Upload function to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null; // Fixed typo
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        // console.log('File uploaded successfully:', response);
        // Optionally delete the local file after upload
        // fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error('Upload failed:', error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Remove the local file if upload fails
        }
        return null;
    }
};

// Export the function
module.exports = {
    uploadOnCloudinary,
};
