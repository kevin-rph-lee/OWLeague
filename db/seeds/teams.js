exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([

        knex('teams').insert({name: 'Atlanta Reign',
                              icon: 'https://i.imgur.com/G1mzxqe.png'}),
        knex('teams').insert({name: 'Boston Uprising',
                              icon: 'https://i.imgur.com/VfFBsIt.png'}),
        knex('teams').insert({name: 'Chengdu Hunters',
                              icon: 'https://i.imgur.com/Df2S8uV.png'}),
        knex('teams').insert({name: 'Dallas Fuel',
                              icon: 'https://i.imgur.com/9P3DzGR.png'}),
        knex('teams').insert({name: 'Guangzhou Charge',
                              icon: 'https://i.imgur.com/lRLnXbA.png'}),
        knex('teams').insert({name: 'Hangzhou Spark',
                              icon: 'https://i.imgur.com/MwpCaGN.png'}),
        knex('teams').insert({name: 'Houston Outlaws',
                              icon: 'https://i.imgur.com/SrxTFBX.png'}),
        knex('teams').insert({name: 'London Spitfire',
                              icon: 'https://i.imgur.com/IDi1kYX.png'}),
        knex('teams').insert({name: 'Los Angeles Gladiators',
                              icon: 'https://i.imgur.com/avMScZg.png'}),
        knex('teams').insert({name: 'Los Angeles Valiant',
                              icon: 'https://i.imgur.com/4tJJzu3.png'}),
        knex('teams').insert({name: 'Florida Mayhem',
                              icon: 'https://i.imgur.com/rM8mWgu.png'}),
        knex('teams').insert({name: 'New York Excelsior',
                              icon: 'https://i.imgur.com/XBLkt3Z.png'}),
        knex('teams').insert({name: 'Paris Eternal',
                              icon: 'https://i.imgur.com/BWwnqfb.png'}),
        knex('teams').insert({name: 'Philadelphia Fusion',
                              icon: 'https://i.imgur.com/EUDYhVp.png'}),
        knex('teams').insert({name: 'San Francisco Shock',
                              icon: 'https://i.imgur.com/MKx335X.png'}),
        knex('teams').insert({name: 'Seoul Dynasty',
                              icon: 'https://i.imgur.com/5HxRG1X.png'}),
        knex('teams').insert({name: 'Shanghai Dragons',
                              icon: 'https://i.imgur.com/RM9XTLZ.png'}),
        knex('teams').insert({name: 'Toronto Defiant',
                              icon: 'https://i.imgur.com/Omt5IM3.png'}),
        knex('teams').insert({name: 'Vancouver Titans',
                              icon: 'https://i.imgur.com/ixIbWoG.png'}),
        knex('teams').insert({name: 'Washington Justice',
                              icon: 'https://i.imgur.com/BMpQggi.png'}),
        knex('teams').insert({name: 'Atlantic All-Stars',
                      icon: 'https://i.imgur.com/2MzdGvK.jpg'}),
        knex('teams').insert({name: 'Pacific All-Stars',
                              icon: 'https://i.imgur.com/12LJJaP.jpg'})

      ]);
    });
};

