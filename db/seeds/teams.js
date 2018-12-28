exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('teams').insert({name: 'Florida Mayhem',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/4GO273NATVWM1508792362854.png'}),
        knex('teams').insert({name: 'Los Angeles Valiant',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/0D8BNUWVZP6B1508792362890.PNG'}),
        knex('teams').insert({name: 'Seoul Dynasty',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/LHRSIW3NWH211508792362796.png'}),
        knex('teams').insert({name: 'Shanghai Dragons',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/B0R64QSNCDLX1508792362793.png'}),
        knex('teams').insert({name: 'Los Angeles Gladiators',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/3AEMOZZL76PF1508792362892.PNG'}),
        knex('teams').insert({name: 'London Spitfire',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/NW461AQIYQMK1508792363133.png'}),
        knex('teams').insert({name: 'Dallas Fuel',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/NO44N7DDJAPF1508792362936.png'}),
        knex('teams').insert({name: 'Houston Outlaws',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/HLRHYU5MT9MD1508792362935.png'}),
        knex('teams').insert({name: 'New York Excelsior',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/9r/9RYLM8FICLJ01508818792450.png'}),
        knex('teams').insert({name: 'Boston Uprising',
                              icon: 'https://bnetcmsus-a.akamaihd.net/cms/page_media/43UINMGMA83X1513383982827.png'})
      ]);
    });
};

