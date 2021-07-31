// ** REQUIRES
const express = require('express');
const hbs = require('hbs');
require("dotenv").config()
const DogApi = require('doggo-api-wrapper');

// ** API SETUP
const myDog = new DogApi();
// ! THIS IS WHERE WE WOULD USE .env FOR API CREDENTIALS
console.log(process.env.SUPER_SECRET_API_KEY)

// ** SERVER SETUP
const app = express()

// ** VIEWS SETUP
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');

// ** MIDDLEWARES
app.use(express.static(__dirname + '/public'));

app.use(express.json()); // SETUP FOR BEING ABLE TO ACCESS THE BODY OF A POST REQUEST
app.use(express.urlencoded({ extended: false })); // SETUP FOR BEING ABLE TO ACCESS THE BODY OF A POST REQUEST

// ** ROUTES
app.get('/', (req, res) => {
  myDog.getARandomDog()
  .then( (data) => res.render('index', { data: data.message }))
  .catch( (err) => console.log(err));
})

// ! GET ROUTE. PARAMS
app.get('/dog/:name', (req, res) => {
  console.log(req.params)
  const { name } = req.params
  // const name = req.params.name // same as above. But above is for GOOD developers
  res.render("dog-profile", { name })
})

// ! GET ROUTE. QUERIES
app.get('/search', (req, res) => {
  console.log(req.query)
  const { breed } = req.query
  myDog.getAllDogsByBreed(breed)
  .then( (data) => res.render("search-results", { data: data.message }))
  .catch( (err) => console.log(err));
})

// ! GET ROUTE. BODY
app.post("/add-info", (req, res) => {
  console.log(req.body)
  // NOTE: GET REQUESTS DO NOT HAVE ACCESS TO THE REQ.BODY
})

// ** SERVER LISTENING
console.log(process.env.PORT) // => the PORT coming from the .env file
// .env files are used to store private information
// currently in the .env file should be:
// PORT=3000
// SUPER_SECRET_API_KEY=BANANA
// .env files should NEVER be published on github
app.listen(process.env.PORT, () => console.log(`🏃‍ on port ${process.env.PORT}`));