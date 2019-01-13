'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.get('/', (req, res) => {
  //   knex
  //     .select('*')
  //     .from('teams')
  //     .then((results) => {
  //       res.send(results);
  //       // res.sendStats(300)
  //     });
  // });
  return router;
}
