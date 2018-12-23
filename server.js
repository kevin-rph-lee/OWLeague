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
const path = require('path');


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


app.use(express.static(path.join(__dirname, 'client/build')));


// Mount all resource routes
app.use('/users', usersRoutes(knex, bcrypt));


app.get('/owl', function(req, res) {
  let data = {};
  console.log('HIt route')
  OWL.getMatches().then(response => {
    console.log('Got Data')
    for(let i = 0; i < season1.data.stages.length; i ++){
      const stage = season1.data.stages[i].slug;
      data[stage] = {}

      if(stage === 'preseason'){
        data[stage]['image'] = 'https://i.imgur.com/zpTSuyY.jpg'
        data[stage]['friendlyName'] = 'Preseason'
      } else if (stage === 'stage1'){
        data[stage]['image'] = 'https://i.imgur.com/4mB4B75.jpg'
        data[stage]['friendlyName'] = 'Stage 1'
      } else if (stage === 'stage2'){
        data[stage]['image'] = 'https://i.imgur.com/DNztqtx.jpg'
        data[stage]['friendlyName'] = 'Stage 2'
      } else if (stage === 'stage3'){
        data[stage]['image'] = 'https://i.imgur.com/2y6E6HY.jpg'
        data[stage]['friendlyName'] = 'Stage 3'
      } else if (stage === 'stage4'){
        data[stage]['image'] = 'https://i.imgur.com/P8ZDIJi.jpg'
        data[stage]['friendlyName'] = 'Stage 4'
      } else if (stage === 'playoffs'){
        data[stage]['image'] = 'https://i.imgur.com/og4p9Ct.jpg'
        data[stage]['friendlyName'] = 'Playoffs & Grand Finals'
      } else {
        data[stage]['image'] = 'https://i.imgur.com/FDydIvH.jpg'
        data[stage]['friendlyName'] = 'All Star Weekend'
      }

      for(let x = 0; x < season1.data.stages[i].matches.length; x ++){
        const match = season1.data.stages[i].matches[x]
        data[stage]['matchID'] =  match.id;
        data[stage]['team1'] = match.competitors[0].name;
        data[stage]['team2'] = match.competitors[1].name;
        data[stage]['winner'] = match.winner.name;
        data[stage]['date'] = match.startDate;
        data[stage]['games'] = []
        for(let y = 0; y < season1.data.stages[i].matches[x].games.length; y ++){
          const gameID = season1.data.stages[i].matches[x].games[y].id;
          const points = season1.data.stages[i].matches[x].games[y].points;
          const map = season1.data.stages[i].matches[x].games[y].attributes.map;

          data[stage]['games'].push({
            gameID: gameID,
            points: points,
            map: map
          })
        }
      }
    }
    res.json({
       data
    });

  });



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
