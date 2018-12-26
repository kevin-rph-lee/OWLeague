const express = require('express')
const path = require('path')
const OverwatchLeague = require('overwatchleague');
const OWL = new OverwatchLeague();
const axios = require('axios');


// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))



app.get('/owl', function(req, res) {
  let data = {};
  console.log('HIt route')

  axios.get('https://api.overwatchleague.com/schedule?expand=team.content&locale=en_US&season=2018').then(response => {
    console.log('Response ', response.data.data.stages)
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

      for(let x = 0; x < stages[i].matches.length; x ++){
        const match = stages[i].matches[x]
        console.log('Match ', match)
        data[stage]['matchID'] =  match.id;
        data[stage]['team1'] = match.competitors[0].name;
        data[stage]['team2'] = match.competitors[1].name;
        data[stage]['winner'] = match.winner.name;
        data[stage]['date'] = match.startDate;
        data[stage]['games'] = []
        for(let y = 0; y < stages[i].matches[x].games.length; y ++){
          const gameID = stages[i].matches[x].games[y].id;
          const points = stages[i].matches[x].games[y].points;
          const map = stages[i].matches[x].games[y].attributes.map;

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
// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
