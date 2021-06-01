const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/Needy", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Successfullt Connected to MongoDB...')).catch((error) => console.log("error occured: ", error));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    companyname: String,
    city: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    photo: {
        type: {
            data: Buffer,
            contentType: String
        }
    },
    followers: {
        type: Number,
        default: 0
    },
    savedPosts: []
});

const User = mongoose.model('User', userSchema);

module.exports = User;