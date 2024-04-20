// The Project Controller
const fs = require('fs');
const path = require('path');
const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.render('home', { body: projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateProjectTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    await Project.findByIdAndUpdate(id, { title });
    res.redirect(`/projects/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


exports.getNewProjectForm = (req, res) => {
  res.render('newProject', { body: [] });
};


exports.createProject = async (req, res) => {
  try {
    await Project.create(req.body);
    res.redirect('/projects');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.render('projectDetails', { project, body: project });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.addTodo = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    project.todos.push(req.body);
    await project.save();
    res.redirect(`/projects/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { projectId, todoId } = req.params;
    const { description, status } = req.body;
    const updatedTodo = await Project.findOneAndUpdate(
      { _id: projectId, 'todos._id': todoId },
      { $set: { 'todos.$.description': description, 'todos.$.status': status, 'todos.$.updatedDate': new Date() } },
      { new: true }
    );
    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { projectId, todoId } = req.params;
    await Project.findByIdAndUpdate(projectId, { $pull: { todos: { _id: todoId } } });
    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.exportProjectSummary = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).send('Project not found');
    }
    
    const completedTodos = project.todos.filter(todo => todo.status === 'completed');
    const totalTodos = project.todos.length;
    
    let markdownContent = `# ${project.title}\n\n`;
    markdownContent += `**Summary:** ${completedTodos.length} / ${totalTodos} completed.\n\n`;
    
    markdownContent += '## Pending Todos\n\n';
    project.todos.forEach(todo => {
      if (todo.status === 'pending') {
        markdownContent += `- [ ] ${todo.description}\n`;
      }
    });
    
    markdownContent += '\n## Completed Todos\n\n';
    project.todos.forEach(todo => {
      if (todo.status === 'completed') {
        markdownContent += `- [x] ${todo.description}\n`;
      }
    });
    
    // Set headers to trigger download
    res.setHeader('Content-Disposition', `attachment; filename="${project.title}.md"`);
    res.setHeader('Content-Type', 'text/markdown');
    
    // Send the Markdown content as response
    res.send(markdownContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};