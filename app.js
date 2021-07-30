// ** REQUIRES
const express = require('express');
const hbs = require('hbs');

// ** SERVER SETUP
const app = express()

// ** VIEWS SETUP
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');

// ** MIDDLEWARES
app.use(express.static(__dirname + '/public'));

// ** ROUTES
app.get('/', (req, res) => {
  res.render('index')
})

// ** LISTENING TO SERVER
const port = 3000
app.listen(port, () => console.log(`🏃‍ on port ${port}`));