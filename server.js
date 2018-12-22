'use strict';

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const sass        = require('node-sass-middleware');
const app         = express();
const bcrypt      = require('bcrypt');
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
const cookieParser = require('cookie-parser');
const OverwatchLeague = require('overwatchleague');
const OWL = new OverwatchLeague();

const season1 = require('./season1.json')
const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Mount all resource routes
app.use('/users', usersRoutes(knex, bcrypt));


app.get('/owl', function(req, res) {
  let data;


  // console.log(season1.data.stages)
  for(let i = 0; i < season1.data.stages.length; i ++){
    console.log(season1.data.stages[i].slug);
    for(let x = 0; x < season1.data.stages[i].matches.length; x ++){
      console.log('-------------')
      console.log('Match ID: ', season1.data.stages[i].matches[x].id)
      console.log('Contendor 1 ', season1.data.stages[i].matches[x].competitors[0].name)
      console.log('Contendo 2 ', season1.data.stages[i].matches[x].competitors[1].name)
      console.log('Winner: ',season1.data.stages[i].matches[x].winner.name)
      console.log('Date: ',season1.data.stages[i].matches[x].startDate)
      for(let y = 0; y < season1.data.stages[i].matches[x].games.length; y ++){
        console.log('Game ID', season1.data.stages[i].matches[x].games[y].id)
        console.log('Game ID', season1.data.stages[i].matches[x].games[y].points)
        console.log('Game ID', season1.data.stages[i].matches[x].games[y].attributes.map)
      }
    }
    // console.log(season1.data.stages[i].matches);
  }
  // console.log(season1)

  // OWL.getInfo().then(response => {
  //   res.json({
  //      data
  //   });
  // });
  res.sendStatus(200);
});



app.get('/test/login', function(req, res) {
  console.log(req.body);
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  console.log(token);
  res.sendStatus(200);
});


app.post('/test/login', function(req, res) {
    const payload = {email: 'TEst'};

    const token = jwt.sign(payload, secret, {
      expiresIn: '1h'
    });
    console.log(token);
    res.json({
       user: 'Test user',
       token: token
    });
});




console.log(secret)
// Home page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
