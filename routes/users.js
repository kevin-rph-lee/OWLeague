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
    console.log(req.body.uid)
    return res.sendStatus(300);
    // knex
    //   .select('*')
    //   .from('users')
    //   .where({email:req.body.email})
    //   .then((results) => {
    //     console.log(req.body);
    //     if(req.body.password === undefined || results.length === 0 || req.body.password.length === 0){
    //       return res.sendStatus(404);
    //     } else if (bcrypt.compareSync(req.body.password, results[0].password)) {
    //       return res.sendStatus(200);
    //     } else {
    //       return res.sendStatus(403);
    //     }
    //   });
  });

  return router;
}
