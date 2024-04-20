const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Define project routes
router.get('/', projectController.getAllProjects);
router.get('/new', projectController.getNewProjectForm);
router.post('/new', projectController.createProject);
router.get('/:id', projectController.getProjectDetails);
router.post('/:id/todo', projectController.addTodo);
router.post('/:id/title', projectController.updateProjectTitle);
router.post('/:projectId/todo/:todoId', projectController.updateTodo);
router.post('/:projectId/todo/:todoId/delete', projectController.deleteTodo);
router.post('/:id/updateTitle', projectController.updateProjectTitle);
router.get('/:id/export-summary', projectController.exportProjectSummary);

module.exports = router;
