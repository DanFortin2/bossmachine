const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');

//Minions Routes
apiRouter.get('/minions', (req, res, next) => {
  let minions = db.getAllFromDatabase('minions');
  res.send(minions);
});


apiRouter.post('/minions', (req, res, next) => {


});


apiRouter.get('/minions/:minionId', (req, res, next) => {
    let minion = db.getFromDatabaseById('minions', req.params.minionId);
    console.log('Minion Id Located Here');
    if (minion) {
      res.send(minion);
    } else {
      res.status(404).send();
    }
});


apiRouter.put('/minions/:minionId', (req, res, next) => {});


apiRouter.delete('minions/:minionId', (req, res, next) => {});


//ideas



//meetings




module.exports = apiRouter;
