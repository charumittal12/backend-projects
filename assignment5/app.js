// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse query strings
app.use(express.urlencoded({ extended: true }));

// Mock search results (replace with actual search logic later)
const mockResults = {
    movie: ['The Matrix', 'Inception', 'Interstellar'],
    book: ['The Hobbit', '1984', 'Brave New World'],
    product: ['Laptop', 'Phone', 'Tablet']
};

// Route to render search form
app.get('/search', (req, res) => {
    res.render('search');  // Render the search form
});

// Route to handle search and show results
app.get('/results', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';  // Get the search term from the query string and make it lowercase
    let results = [];

    // Check if query exists and find matching results
    if (query && mockResults[query]) {
        results = mockResults[query];
    }

    // Render the results template
    res.render('results', { query, results });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
