const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('public/uploads')); // Serve static files from uploads
app.set('view engine', 'ejs');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
    }
});

const upload = multer({ storage: storage });

// Dummy product data
const products = [
    { name: 'Product 1', description: 'Description for Product 1', image: 'uploads/product1.jpg' },
    { name: 'Product 2', description: 'Description for Product 2', image: 'uploads/product2.jpg' },
    { name: 'Product 3', description: 'Description for Product 3', image: 'uploads/product3.jpg' }
];

// Route to render the product catalog
app.get('/catalog', (req, res) => {
    res.render('catalog', { products });
});

// Route to render the upload form
app.get('/upload', (req, res) => {
    res.render('upload');
});

// Route to handle image uploads
app.post('/upload', upload.single('productImage'), (req, res) => {
    const { name, description } = req.body;
    const image = `uploads/${req.file.filename}`; // Store the image path

    // Here you would typically save the product to a database
    products.push({ name, description, image }); // For simplicity, we're adding it to the array

    res.redirect('/catalog');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
