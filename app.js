// required modules
const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');

// express function
const app = express();

// middlewares
// express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// public folder
app.use(express.static(path.join(__dirname, 'public')));

// index route
app.get('/', function(req, res){
  res.render('index');
})


// port for server
const port = 8700;

// listen method for the server
app.listen(port, function(){
  console.log(`Server running at port ${port}`);
});