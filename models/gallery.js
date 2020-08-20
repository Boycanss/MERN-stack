const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Membuat schema
const GallerySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Gallery = module.exports = mongoose.model("gallery", GallerySchema);

module.exports.addImages = function (image, callback) {
    Gallery.create(image, callback)
}

module.exports.getImages = (callback) => {
    Gallery.find(callback)
}

module.exports.getImageById = (id, callback) => {
    Gallery.findById(id, callback)
}

module.exports.getImageByKeywords = (keywords, callback) => {
    Gallery.find(keywords, callback)
}

module.exports.deleteImage = (id, callback) => {
    Gallery.findByIdAndDelete(id, callback)
}