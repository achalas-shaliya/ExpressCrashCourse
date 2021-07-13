const express = require('express');

// deals with file paths
const path = require('path');

// Prints out every api used
const logger = require('./middleware/logger')

const exphbs = require('express-handlebars');
const members = require('./Members');

// Init express
const app = express();

// Init middleware
app.use(logger)

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); // setting the view engine

// Homepage Route
app.get("/", (req, res) => res.render('index', {
    title: 'Member APP',
    members
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members api route
app.use('/api/members', require('./routes/api/members'));

// checks if the port no. on the env is available else uses 5000
const PORT = process.env.PORT || 5000;

// Listen on port 5000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));