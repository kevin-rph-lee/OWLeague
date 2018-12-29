
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const sass        = require('node-sass-middleware');
const bcrypt      = require('bcrypt');
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
const cookieParser = require('cookie-parser');
const OverwatchLeague = require('overwatchleague');
const path = require('path');
const axios = require('axios');
const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');


const app         = express();
const OWL = new OverwatchLeague();


// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');
const teamsRoutes = require('./routes/teams');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))


// Mount all resource routes
app.use('/users', usersRoutes(knex, bcrypt));
app.use('/teams', teamsRoutes(knex));


app.get('/owl', function(req, res) {
  let data = {};
  console.log('HIt route')

  axios.get('https://api.overwatchleague.com/schedule?expand=team.content&locale=en_US&season=2018').then(response => {
    // console.log('Response ', response.data.data.stages)
    const stages = response.data.data.stages
    console.log('Got Data')

    for(let i = 0; i < stages.length; i ++){
      const stage = stages[i].slug;
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
      data[stage]['matches'] = []
      for(let x = 0; x < stages[i].matches.length; x ++){

        const matchData = stages[i].matches[x]
        console.log(matchData.games);

        const match = {
          id: matchData.id,
          team1: {name:matchData.competitors[0].name, icon: matchData.competitors[0].icon},
          team2: {name:matchData.competitors[1].name, icon: matchData.competitors[1].icon},
          winner: matchData.winner.name,
          date: matchData.startDate,
          games: matchData.games
        }
        data[stage]['matches'].push(match)
      }
    }
    res.json({
       data
    });

  });
});
// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
