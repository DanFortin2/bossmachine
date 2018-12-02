const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');




/////////////////////////////////////
///////////Minions Routes///////////
///////////////////////////////////

//get all minions
apiRouter.get('/minions', (req, res, next) => {
  let minions = db.getAllFromDatabase('minions');
  res.send(minions);
});


//Get a specific minion
apiRouter.get('/minions/:minionId', (req, res, next) => {
  let minion = db.getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send();
  }
});

//create a minion
apiRouter.post('/minions', (req, res, next) => {
  const newMinion = db.addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});


//update a new minion
apiRouter.put('/minions/:minionId', (req, res, next) => {
  let minionId =  db.getFromDatabaseById('minions', req.params.minionId);
  if (minionId) {
    const minionUpdated = db.updateInstanceInDatabase('minions', req.body);
    res.send(minionUpdated);
  } else {
    res.status(404).send();
  }
});


//delete a minion
apiRouter.delete('/minions/:minionId', (req,res,next) =>{
  let minion =  db.getFromDatabaseById('minions', req.params.minionId);
  if(minion) {
    db.deleteFromDatabasebyId('minions', minion.id);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


////////////////////////////
///////////ideas///////////
//////////////////////////

//get all ideas
apiRouter.get('/ideas', (req, res, next) => {
  let ideas = db.getAllFromDatabase('ideas');
  res.send(ideas);
});


//Get a specific idea
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  let idea = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    res.send(idea);
  } else {
    res.status(404).send();
  }
});

//create an idea
apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = db.addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});


//update a new idea
apiRouter.put('/ideas/:ideaId',  (req, res, next) => {
  let ideaId =  db.getFromDatabaseById('ideas', req.params.ideaId);
  if (ideaId) {
    const ideaUpdated = db.updateInstanceInDatabase('ideas', req.body);
    res.send(ideaUpdated);
  } else {
    res.status(404).send();
  }
});


//delete a idea
apiRouter.delete('/ideas/:ideaId', (req,res,next) =>{
  let idea =  db.getFromDatabaseById('ideas', req.params.ideaId);
  if(idea) {
    db.deleteFromDatabasebyId('ideas', idea.id);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


///////////////////////////////
///////////meetings///////////
/////////////////////////////

//get all meetings
apiRouter.get('/meetings', (req, res, next) => {
  let meetings = db.getAllFromDatabase('meetings');
  res.send(meetings);
});


//create an meeting
apiRouter.post('/meetings', (req, res, next) => {
  const newIdea = db.createMeeting();
  db.addToDatabase('meetings', newIdea);
  res.status(201).send(newIdea);
});

//delete all meetings
apiRouter.delete('/meetings', (req, res, next) => {
  db.deleteAllFromDatabase('meetings');
  res.status(204).send();
});



///////////////////////////////
///////////Work///////////
/////////////////////////////





module.exports = apiRouter;
