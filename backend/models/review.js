const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: { type: String, required: true },
    mark: { type: Array, required: true },
    project: { type: mongoose.Types.ObjectId, required: true, ref: 'Project' },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Project', reviewSchema);