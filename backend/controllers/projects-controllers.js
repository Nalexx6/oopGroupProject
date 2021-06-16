const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Project = require('../models/project');
const User = require('../models/user');

const getProjectById = async (req, res, next) => {
    const id = req.params.pid; // {pid: 'p1'}

    let project;
    try {
        project = await Project.findById(id);
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not find a project.', 
            500
        );
        return next(error);
    }
    if(!project){
        const error = new HttpError('Could not find project for the provided id.', 404);
        return next(error);
    }
    res.json({ project: project.toObject({getters: true }) });
}

const getAllProjects = async (req, res, next) => {
    let projects;
    try{
        projects = await Project.find({}); // exclude password
    } catch(err){
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({projects: projects.map(user => user.toObject({ getters: true }))});
}

const getProjectsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let projects;
    try{
        projects = await Project.find( {creator: userId} );
    } catch(err){
        const error = new HttpError('Fetching projects failed, please try again later', 500);
        return next(error);
    }
    res.json({projects: projects.map(project => project.toObject({ getters: true }))});
}

const createProject = async (req, res, next) => {
    const { title, description, code, tags, creator } = req.body;
    const createdProject = new Project({
        title, 
        description,
        code, 
        tags, 
        rating: 0,
        reviews: [],
        marksNumber: 0,
        creator,
    })
    let user;
    try {
        user = await User.findById(creator);
    } catch(err){
        const error = new HttpError('Creating project failed, please try again later', 500);
        return next(error);
    }
    if(!user){
        const error = new HttpError('Could not find user for the provided id', 404);
        return next(error);
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdProject.save({ session: sess });
        user.projects.push(createdProject);
        await user.save({ session: sess});
        await sess.commitTransaction();
    } catch (err){
        const error = new HttpError(
            'Creating project failed, please try again',
            500
        );
        return next(error);
    }
    res.status(201).json({project: createdProject});
}

const updateProject = async (req, res, next) => {
    const id = req.params.pid;
    const { title, description, code, tags } = req.body;
    let project
    try{
        project = await Project.findById(id);
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not update the project', 500
        );
        return next(error);
    }

    // if(project.creator.toString() !== req.userData.userId){
    //     const error = new HttpError(
    //         'You are not allowed to edit this project.',
    //         401 
    //     )
    //     return next(error);
    // }
    project.description = description;
    project.title = title;
    project.code = code;
    project.tags = tags;

    try{
        await project.save();
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not update the project', 500
        );
        return next(error);
    }
    res.status(200).json({project: project.toObject({ getters: true })});
}

const addMark = async (req, res, next) => {
    const id = req.params.pid;
    const { mark } = req.body;
    let project
    try{
        project = await Project.findById(id);
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not update mark', 500
        );
        return next(error);
    }
    project.marksNumber = project.marksNumber + 1
    let newRating = (project.rating * (project.marksNumber - 1) + parseInt(mark))/ project.marksNumber
    project.rating = newRating;

    try{
        await project.save();
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not update the project', 500
        );
        return next(error);
    }

    let creator
    try{
        creator = await User.findById(project.creator);
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not update mark', 500
        );
        return next(error);
    }

    let projects;
    try{
        projects = await Project.find( {creator: creator.id} );
    } catch(err){
        const error = new HttpError('Fetching projects failed, please try again later', 500);
        return next(error);
    }

    let newUserRating = 0;
    projects.forEach(p => newUserRating += p.rating);
    newUserRating /= projects.length;
    console.log("rating: ", newUserRating);
    creator.rating = newUserRating;

    try{
        await creator.save();
    } catch(err){
        const error = new HttpError(
            'Something went wrong, could not update the project', 500
        );
        return next(error);
    }
    res.status(200).json({project: project.toObject({ getters: true })});
}

const deleteProject = async (req, res, next) => {
    const id = req.params.pid;

    let project;
    try {
      project = await Project.findById(id);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete project.',
        500
      );
      return next(error);
    }
  
    if (!project) {
      const error = new HttpError('Could not find project for this id.', 404);
      return next(error);
    }

    // if(project.creator.id !== req.userData.userId){
    //     const error = new HttpError(
    //         'You are not allowed to delete this project.',
    //         401 
    //     )
    //     return next(error);
    // }
  
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();

      await project.remove({ session: sess });
      project.creator.projects.pull(project);
      await project.creator.save({ session: sess });

      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete project.',
        500
      );
    return next(error);
    }
    res.status(200).json({ message: 'Deleted successfully.' });    
}

exports.getProjectById = getProjectById;
exports.getAllProjects = getAllProjects;
exports.getProjectsByUserId = getProjectsByUserId;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
exports.addMark = addMark;