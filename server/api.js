const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');

//Minions Routes
apiRouter.get('/minions', (req, res, next) => {
  let minions = db.getAllFromDatabase('minions');
  res.send(minions);
});


apiRouter.post('/minions', (req, res, next) => {
  const newMinion = db.addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});


apiRouter.get('/minions/:minionId', (req, res, next) => {
  let minion = db.getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send();
  }
});


apiRouter.put('/minions/:minionId', (req, res, next) => {
  let minionId =  db.getFromDatabaseById('minions', req.params.minionId);
  if (minionId) {
    const minionUpdated = db.updateInstanceInDatabase('minions', req.body);
    res.send(minionUpdated);
  } else {
    res.status(404).send();
  }
});



apiRouter.delete('/minions/:minionId', (req,res,next) =>{
  let minion =  db.getFromDatabaseById('minions', req.params.minionId);
  if(minion) {
    db.deleteFromDatabasebyId('minions', minion.id);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


//ideas



//meetings




module.exports = apiRouter;
