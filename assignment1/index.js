const express = require('express');
const app = express();
const PORT = 8000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static('public'));
// Function to get greeting based on the time of day
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "Good morning";
    } else if (hour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

app.get('/welcome', (req, res) => {
    const userName = "Charu";
    const message = getGreeting(); 
    res.render('index1', { userName, message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});