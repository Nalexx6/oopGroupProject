const express = require('express');
const projectsControllers = require('../controllers/projects-controllers');

const router = express.Router();

router.get('/:pid', projectsControllers.getProjectById);

router.get('/user/:uid', projectsControllers.getProjectsByUserId);

// position is important!!!! block all the requests comming to below without token 
// router.use(checkAuth);

router.post('/', projectsControllers.createProject);

router.patch('/:pid', projectsControllers.updateProject);

router.delete('/:pid', projectsControllers.deleteProject);

module.exports = router;