const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, requred: true, minlength: 6 },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    projects: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Projects'}],
    reviews: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Review'}],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);