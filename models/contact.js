const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;