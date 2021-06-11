const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    let users;
    try{
        users = await User.find({}, '-password'); // exclude password
    } catch(err){
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next) => {
    const { login, email, password, image } = req.body;

    // step1: check if user already exists
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later', 500)
        return next(error)
    }
    if (existingUser) {
        const error = new HttpError('User already exists, plase login instead.', 422)
        return next(error)
    }
    // step2: hash password 
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12); // second parametr is number of salting rounds; 12 is good 
    } catch(err){
        const error = new HttpError('Could not create user, please try again later.', 500);
        return next(error);
    }

    //step3: create user
    const createdUser = new User({
        login,
        email,
        password: hashedPassword, 
        image, 
        rating: 0,
        projects: [], 
        reviews: []
    });
    //step4: save user to db
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again', 500);
        return next(error);
    }
    //step5: create token
    let token;
    try{
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email }, 
            'supersecret_dont_share', 
            { expiresIn: '1h' }
            );
    } catch(err){
        const error = new HttpError('Signing up failed, please try again', 500);
        return next(error); 
    }
    res.status(201).json({ token });
};

const login = async (req, res, next) => {
    const {email, password} = req.body;
    //step1: check if user exists
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError('Logging in failed, please try again later', 500)
        return next(error)
    }
    if (!existingUser) {
        const error = new HttpError('Invalid credentials.', 401)
        return next(error)
    }

    //step2: create token
    let token;
    try{
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email }, 
            'supersecret_dont_share', 
            { expiresIn: '1h' }
            );
    } catch(err){
        const error = new HttpError('Logging in failed, please try again', 500);
        return next(error); 
    }
    //step3: check credentials
    let isValidPassword = false;
    try{
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch(err){
        const error = new HttpError('Logging in failed, please try again later', 500)
        return next(error)
    }
    if(!isValidPassword) {
        const error = new HttpError('Invalid credentials.', 401)
        return next(error)
    }
    res.json({ 
        userId: existingUser.id,
        token: token,
    })
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;