# Todo Dashboard

The application is built using React, React Bootstrap, SASS SCSS Compiler and Typescript.

## Required External Dependencies

1. Node
2. Yarn
3. VS Code

## Run Project

To run the project on your system:
-> Open VS Code integrated terminal or your system zsh environemnt
-> Copy this command: **git clone https://github.com/ShubhamBudhiraja/todo-assignment.git** and run in the terminal
-> Open project directory and run the command: **yarn** in the terminal
-> Once the packages are installed, run command: **yarn start** to start the application

## Project Demonstration

The services in the application (src/services/index.ts) allow you the user to:
-> **get all the tasks list**: getTodoList function is executed on page load to render the list.
-> **add new tasks and assign a status to them**: React Bootstrap Modal is used to allow the user to enter the input and initialise the status of the task.
-> **the tasks status and the task can also be updated**: updateTask function is used to edit tasks and update their status. the status can also be updated using the drag and drop feature.
