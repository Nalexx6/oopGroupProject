const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { type: String, required: true },
    code: { type: String, required: true },
    tags: [{ type: String, required: false }],
    rating: { type: Number, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    reviews: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Review'}]

})

module.exports = mongoose.model('Project', projectSchema);