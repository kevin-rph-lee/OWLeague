const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
      ]);
    });
};

