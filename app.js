// required modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');

// express function
const app = express();

// load routes
const users = require('./routes/users');

// Remove the Warning on mongoose
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/schoolportaldb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


// middlewares
// middleware for explicit file path 
app.use(express.static(path.join(__dirname, 'public')));

// middleware for express handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// middleware for method-override
app.use(methodOverride('_method'))

// middleware for express-session
app.use(session({
  secret: 'set',
  resave: true,
  saveUninitialized: true
}));

// middelware for connect-flash
app.use(flash());

// Global Variables for flash messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// index route
app.get('/', function (req, res) {
  res.render('index');
})

// about route
app.get('/about', function (req, res) {
  res.render('about');
})


// use middleware routes
app.use('/users', users);

// port for server
const port = 8700;

// listen method for the server
app.listen(port, function () {
  console.log(`Server running at port ${port}`);
});