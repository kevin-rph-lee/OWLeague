'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex, bcrypt) => {

  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('users')
      .then((results) => {
        return res.sendStatus(300);
      });
  });

  router.post('/register', (req, res) => {
      knex
        .insert({uid: req.body.uid})
        .into('users')
        .then((results) => {
          res.sendStatus(300)
        });

    })

  return router;
}
