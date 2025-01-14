const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure the directory exists
const tempDirectory = './public/temp';
if (!fs.existsSync(tempDirectory)) {
  fs.mkdirSync(tempDirectory, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDirectory);  // Save files temporarily in 'temp' folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);  // Use a unique filename
  }
});

// File filter to allow only image files
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },  // Limit files to 2MB
  fileFilter: (req, file, cb) => {
    console.log("File upload in progress...");
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg","image/webp"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
    }
  }
});

// Export the upload instance
module.exports = upload;








// // multer.middleware.js
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/temp');  // Save files temporarily in 'temp' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);  // Use a unique filename
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 },  // Limit files to 2MB
//   fileFilter: (req, file, cb) => {
//     const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
//     }
//   }
// });

// // Export the upload instance correctly
// module.exports = upload;
