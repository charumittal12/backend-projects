const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Task array to hold the tasks
let tasks = [];

// Route to display the to-do list and the form
app.get('/todo', (req, res) => {
  res.render('index', { tasks });
});

// Route to handle adding new tasks
app.post('/addtask', (req, res) => {
  const newTask = req.body.task;
  if (newTask) {
    tasks.push(newTask);
  }
  res.redirect('/todo');
});

// Route to handle deleting a task
app.post('/deletetask', (req, res) => {
  const taskIndex = req.body.index;
  if (taskIndex !== undefined) {
    tasks.splice(taskIndex, 1);
  }
  res.redirect('/todo');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
