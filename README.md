# Todo List Application

This is a fullstack Todo List application built with React and Node.js.

## Features

### Main Feature

- Server-side persistence of todo lists using a simple in-memory data store on the Node.js backend

### Additional Features

1. Todo completion status - Mark individual todos as completed
2. List completion indication - Lists are automatically marked as completed when all todo items within them are completed
3. Due dates for todos - Add completion dates to todos with visual indicators for time remaining or overdue status

## Tech Stack

### Frontend

- React
- Material UI
- Styled Components
- Date-fns for date manipulation

### Backend

- Node.js
- Express

## Project Structure

The project consists of two main folders:

- `backend`: Contains the Node.js server code
- `frontend`: Contains the React application

## Implementation Details

### Data Persistence

- Todo lists are persisted in-memory on the server using a simple JS object structure
- All data is lost when the server restarts, but remains persistent during normal operation

### Todo Completion

- Individual todo items can be marked as completed with a checkbox
- Completed todos display with a strikethrough and gray background

### List Completion

- A todo list is automatically considered complete when all todo items in it are completed
- Completed lists display with a strikethrough and gray background

### Due Dates

- Each todo item can have an optional due date
- The application shows how much time is remaining:
  - Green: More than 3 days left
  - Orange: 3 days or less
  - Orange: Due today
  - Red: Overdue

## API Endpoints

- `GET /api/todolists`: Get all todo lists
- `POST /api/todolists`: Create a new todo list
- `PUT /api/todolists/:id`: Update a todo list

The backend server will run on http://localhost:3001

The frontend application will run on http://localhost:3000

# Sellpy web interview

Welcome to Sellpy's web interview repo!

## Prerequisites

NodeJS - if you don't already have it installed, check out [nvm](https://github.com/nvm-sh/nvm).

## Getting started

Fork the repository (see top-right button on GitHub) and clone the fork to your computer.

### To start the backend:

- Navigate to the backend folder
- Run `npm ci`
- Run `npm start`

### To start the frontend:

- Navigate to the frontend folder
- Run `npm ci`
- Run `npm start`

A browsertab will automatically open and load the app.

### Development set-up

If you don't have a favorite editor we highly recommend [VSCode](https://code.visualstudio.com). We've also had some ESLint rules set up which will help you catch bugs etc. If you're using VSCode, install the regular [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and you should be good to go!

You can open the root folder in one workspace, or `/frontend` and `/backend` in seperate workspaces - both should work fine.

Check `.nvmrc` to see what node version is required to run the project. Just run `nvm use` if you have `nvm` installed. Later versions of node might work fine as well, but probably not earlier versions.

For those of you using Prettier (not a requirement), there's an .prettierrc file to ensure no unnecessary changes to the existing code. It should be picked up automatically by Prettier.

## Assignment

Your assignment is to improve this todo list application. At the moment the application is simple and can only create and remove todos.
As is, nothing is persisted in the server. As a result all state is cleared when refreshing the page!
Below follows one main task and 4 additional tasks. Your assignment is to complete the main task together with at least 2 out of 4 of the additional tasks.
If you feel constrained by time (which is totally fine!), prioritize quality over quantity.

### Main Task

Persist the todo lists on the server. Persisting in a database is not required. (Simple js structures on the server is fine). If you do go for an actual DB (again not required), be sure to include instructions of how to get it up and running.

### Additional tasks

- Don't require users to press save when an item is added/edited in the todo list. (Autosave functionality)
- Make it possible to indicate that a todo is completed.
- Indicate that a todo list is completed if all todo items within are completed.
- Add a date for completion to todo items. Indicate how much time is remaining or overdue.

## Submission

Before submitting, read through all changes one last time - code quality matters!

If you have developed without ESLint set up, run `npm run lint` in both `/backend` and `/frontend` and fix any errors/warnings.

Send a link to your forked repository to your contact at Sellpy. Don't forget to mention which tasks you completed.
