// auth.js
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersFilePath = './users.json';

// Read users from the file
let users = [];
if (fs.existsSync(usersFilePath)) {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  users = JSON.parse(data);
}

// Endpoint to handle user registration
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Check if the email is already registered
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Save the new user
  users.push({ email, password });
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  // Redirect to ind2.html upon successful registration
  res.redirect('/ind2.html');
});

// Endpoint to handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = users.find(user => user.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Redirect to ind2.html upon successful login
  res.redirect('/ind 2.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
