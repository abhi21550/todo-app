# Todo Management Application
### Application HOST LINK : [Project Manager](https://project-manager-8q8e.onrender.com/projects)
## Introduction

The Todo Management Application is a project aimed at assisting users in organizing and managing their tasks efficiently. This document serves as a guide to understanding the features, functionality, and implementation details of the application.

## Objective

The objective of this project is to develop an application that allows users to create projects, manage todos within those projects, and export project summaries as gists. Key functionalities include project creation, todo management (addition, editing, updating, and marking as complete), and exporting project summaries in markdown format.

## Features

1. **Project Management:**
   - Create a new project with a unique identifier, title, and creation date.
   - List all projects on the home page.
   - View detailed project information including title and list of todos.

2. **Todo Management:**
   - Add new todos to a project with a unique identifier, description, status, creation date, and last updated date.
   - Edit existing todos to update their description or status.
   - Mark todos as complete or pending.

3. **Export Summary as Gist:**
   - Generate project summary in markdown format.
   - Export the summary as a secret gist on GitHub with the following format:
     - File name: `<Project title>.md`
     - Project title as heading.
     - Summary: `<No. of completed todos> / <No. of total todos> completed`.
     - Section 1: Task list of pending todos (with an open checkbox).
     - Section 2: Task list of completed todos (with a checked box).
