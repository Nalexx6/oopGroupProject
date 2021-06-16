const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUserById = async (req, res, next) => {
    const id = req.params.uid; // {pid: 'p1'}

    let user;
    try {
        user = await User.findById(id);
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not find a user.',
            500
        );
        return next(error);
    }
    if(!user){
        const error = new HttpError('Could not find user for the provided id.', 404);
        return next(error);
    }
    res.json({ user: user.toObject({getters: true }) });
}

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
            { userId: createdUser.id, login: createdUser.login },
            'supersecret_dont_share', 
            { expiresIn: '1h' }
            );
    } catch(err){
        const error = new HttpError('Signing up failed, please try again', 500);
        return next(error); 
    }
    res.status(201).json({ 
        user: createdUser.toObject({getters: true }), 
    });
};

const login = async (req, res, next) => {
    const {login, password} = req.body;
    //step1: check if user exists
    let existingUser;
    try{
        existingUser = await User.findOne({login: login});
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
            { userId: existingUser.id, login: existingUser.login },
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
        user: existingUser.toObject({getters: true }),
        token: token,
    })
};

const updateUserImage = async (req, res, next) => {
    const id = req.params.uid;
    const { image } = req.body;
    let user
    try{
        user = await User.findById(id);
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not update the project', 500
        );
        return next(error);
    }

    // if(project.creator.toString() !== req.userData.userId){
    //     const error = new HttpError(
    //         'You are not allowed to edit this place.',
    //         401
    //     )
    //     return next(error);
    // }
    user.imag = image;

    try{
        await user.save();
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not update the place', 500
        );
        return next(error);
    }
    res.status(200).json({user: user.toObject({ getters: true })});
}

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.updateUserImage = updateUserImage;