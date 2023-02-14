const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    url: { type: String },
    title: { type: String },
    desc: { type: String },
    viewcount: { type: Number }
});

const images = mongoose.model("images", imageSchema);
module.exports = { images }