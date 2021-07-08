const _ = require("lodash");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const postStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./static/usersPost/"),
  filename: async (req, file, cb) => {
    const currentUserId = await _.pick(
      jwt.verify(req.session.token, "MySecureKey"),
      ["_id"]
    );
    cb(null, currentUserId._id + file.originalname);
  },
});

//IMAGE UPLOAD AND STORING DATABASE FOR PROFILE
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./static/profiles/"),
  filename: async (req, file, cb) => {
    const currentUserId = await _.pick(
      jwt.verify(req.session.token, "MySecureKey"),
      ["_id"]
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
  storage: postStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//UPLOAD FOR PROFILE
const uploadProfileImage = multer({
  storage: profileStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = {
  uploadPostImage: uploadPostImage.single("image"),
  uploadProfileImage: uploadProfileImage.single("profileImg"),
};
