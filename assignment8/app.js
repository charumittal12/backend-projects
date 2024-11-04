const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route to render the contact form
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route to handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic form validation
    if (!name || !email || !message) {
        return res.status(400).send("All fields are required. Please fill out the form completely.");
    }

    // Render thank you page with submitted data
    res.render('thankyou', { name, email, message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
