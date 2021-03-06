const express = require('express');
const projectsControllers = require('../controllers/projects-controllers');

const router = express.Router();



router.get('/:pid', projectsControllers.getProjectById);

router.get('/', projectsControllers.getAllProjects);

router.get('/user/:uid', projectsControllers.getProjectsByUserId);

// position is important!!!! block all the requests comming to below without token 
// router.use(checkAuth);

router.post('/', projectsControllers.createProject);

router.patch('/:pid', projectsControllers.updateProject);

router.patch('/mark/:pid', projectsControllers.addMark);

router.delete('/:pid', projectsControllers.deleteProject);

module.exports = router;