const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})
exports.User = mongoose.model('User', productSchema);
