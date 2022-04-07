const _ = require("lodash");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary");
require("dotenv").config();

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const postStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./static/usersPost/"),
    filename: async(req, file, cb) => {
        const currentUserId = await _.pick(
            jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"]
        );
        cb(null, currentUserId._id + file.originalname);
    },
});

//IMAGE UPLOAD AND STORING DATABASE FOR PROFILE
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./static/profiles/"),
    filename: async(req, file, cb) => {
        const currentUserId = await _.pick(
            jwt.verify(req.session.token, process.env.jwtPrivateKey), ["_id"]
        );
        cb(null, currentUserId._id + file.originalname);
    },
});

//file filter for image file
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jfif"
    ) {
        cb(null, true);
    } else {
        cb(new Error("image type is invalid!", false));
    }
};

//UPLOAD FOR POSTS
const uploadPostImage = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

//UPLOAD FOR PROFILE
const uploadProfileImage = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

module.exports = {
    uploadPostImage: uploadPostImage.single("image"),
    uploadProfileImage: uploadProfileImage.single("profileImg"),
};