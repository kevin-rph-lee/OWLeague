exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([

        knex('teams').insert({name: 'Atlanta Reign',
                              icon: 'https://liquipedia.net/commons/images/f/fd/Atlanta_Reign_logo.png'}),
        knex('teams').insert({name: 'Boston Uprising',
                              icon: 'https://liquipedia.net/commons/images/3/3d/Boston_Uprising_blue_logo.png'}),
        knex('teams').insert({name: 'Chengdu Hunters',
                              icon: 'https://liquipedia.net/commons/images/e/ef/Chengdu_Hunters_logo.png'}),
        knex('teams').insert({name: 'Dallas Fuel',
                              icon: 'https://liquipedia.net/commons/images/0/01/Dallas_Fuel_logo.png'}),
        knex('teams').insert({name: 'Guangzhou Charge',
                              icon: 'https://liquipedia.net/commons/images/2/26/Guangzhou_Charge_logo.png'}),
        knex('teams').insert({name: 'Hangzhou Spark',
                              icon: 'https://liquipedia.net/commons/images/f/f1/Hangzhou_Spark_logo.png'}),
        knex('teams').insert({name: 'Houston Outlaws',
                              icon: 'https://liquipedia.net/commons/images/2/2c/Houston_Outlaws_logo.png'}),
        knex('teams').insert({name: 'London Spitfire',
                              icon: 'https://liquipedia.net/commons/images/9/99/London_Spitfire_logo.png'}),
        knex('teams').insert({name: 'Los Angeles Gladiators',
                              icon: 'https://liquipedia.net/commons/images/4/43/Los_Angeles_Gladiators_logo.png'}),
        knex('teams').insert({name: 'Los Angeles Valiant',
                              icon: 'https://liquipedia.net/commons/images/d/de/LA_Valiant_logo.png'}),
        knex('teams').insert({name: 'Florida Mayhem',
                              icon: 'https://liquipedia.net/commons/images/5/54/Florida_Mayhem_logo.png'}),
        knex('teams').insert({name: 'New York Excelsior',
                              icon: 'https://liquipedia.net/commons/images/6/6c/New_York_Excelsior_logo.png'}),
        knex('teams').insert({name: 'Paris Eternal',
                              icon: 'https://liquipedia.net/commons/images/f/fc/Paris_Eternal_logo.png'}),
        knex('teams').insert({name: 'Philadelphia Fusion',
                              icon: 'https://liquipedia.net/commons/images/d/d6/Philadelphia_Fusion_logo.png'}),
        knex('teams').insert({name: 'San Francisco Shock',
                              icon: 'https://liquipedia.net/commons/images/0/0c/San_Francisco_Shock_logo.png'}),
        knex('teams').insert({name: 'Seoul Dynasty',
                              icon: 'https://liquipedia.net/commons/images/2/2d/Seoul_Dynasty_logo.png'}),
        knex('teams').insert({name: 'Shanghai Dragons',
                              icon: 'https://liquipedia.net/commons/images/e/e3/Shanghai_Dragons_logo.png'}),
        knex('teams').insert({name: 'Toronto Defiant',
                              icon: 'https://liquipedia.net/commons/images/1/1d/Toronto_Defiant_logo.png'}),
        knex('teams').insert({name: 'Vancouver Titans',
                              icon: 'https://liquipedia.net/commons/images/2/29/Vancouver_Titans_logo.png'}),
        knex('teams').insert({name: 'Washington Justice',
                              icon: 'https://liquipedia.net/commons/images/b/b0/Washington_Justice_logo.png'}),
        knex('teams').insert({name: 'Atlantic All-Stars',
                      icon: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/BST61S6NNJBU1531445222451.svg'}),
        knex('teams').insert({name: 'Pacific All-Stars',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/39ZY2EI63SV91531445222570.svg'})

      ]);
    });
};

