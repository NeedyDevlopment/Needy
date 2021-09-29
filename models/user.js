const mongoose = require("mongoose");

// mongoose
//     .connect("mongodb://localhost/Needy", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("Successfully Connected to MongoDB..."))
//     .catch((error) => console.log("error occured: ", error));
mongoose
    .connect(
        "mongodb+srv://ahpatel9:ahpatel9@cluster0.ar3og.mongodb.net/Needy?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Successfully Connected to MongoDB..."))
    .catch((error) => console.log("error occured: ", error));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    companyname: String,
    city: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    photo: {
        url: String,
        cloudinary_id: String
    },
    followers: {
        type: Number,
        default: 0,
    },
    followersArray: [],
    savedPosts: [],
    followingsArray: [],
    followings: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
