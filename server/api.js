const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');


////////////////////////
////////Middleware/////
//////////////////////

///get Object by ID

apiRouter.use(['/minions/:minionId', '/ideas/:ideaId'], (req, res, next) => {
  const minion = db.getFromDatabaseById('minions', req.params.minionId);
  const idea = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (minion || idea) {
    req.minion = minion;
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

//get everything

apiRouter.use(['/minions','/ideas','/meetings'], (req, res, next) => {
  const allMinions = db.getAllFromDatabase('minions');
  const allIdeas = db.getAllFromDatabase('ideas');
  const allMeetings = db.getAllFromDatabase('meetings');
  const allWork = db.getAllFromDatabase('work');
  req.allMinions = allMinions;
  req.allIdeas = allIdeas;
  req.allMeetings = allMeetings;
  req.allWork = allWork;
  next();
});


/////////////////////////////////////
///////////Minions Routes///////////
///////////////////////////////////

//get all minions
apiRouter.get('/minions', (req, res, next) => {
  res.send(req.allMinions);
});


//Get a specific minion
apiRouter.get('/minions/:minionId', (req, res, next) => {
  res.send(req.minion);
});

//create a minion
apiRouter.post('/minions', (req, res, next) => {
  const newMinion = db.addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});


//update a new minion
apiRouter.put('/minions/:minionId', (req, res, next) => {
  const minionUpdated = db.updateInstanceInDatabase('minions', req.body);
  res.send(minionUpdated);
});


//delete a minion
apiRouter.delete('/minions/:minionId', (req,res,next) =>{
  db.deleteFromDatabasebyId('minions', req.minion.id);
  res.status(204).send();
});


////////////////////////////
///////////ideas///////////
//////////////////////////

//get all ideas
apiRouter.get('/ideas', (req, res, next) => {
  res.send(req.allIdeas);
});


//Get a specific idea
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

//create an idea
apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = db.addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});


//update a new idea
apiRouter.put('/ideas/:ideaId',  (req, res, next) => {
  const ideaUpdated = db.updateInstanceInDatabase('ideas', req.body);
  res.send(ideaUpdated);
});


//delete a idea
apiRouter.delete('/ideas/:ideaId', (req,res,next) =>{
  db.deleteFromDatabasebyId('ideas', req.idea.id);
  res.status(204).send();
});


///////////////////////////////
///////////meetings///////////
/////////////////////////////

//get all meetings
apiRouter.get('/meetings', (req, res, next) => {
  res.send(req.allMeetings);
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


//Get a specific minions work
apiRouter.get('/minions/:minionId/work', (req, res, next) => {
  const filterWork = req.allWork.filter(work => work.minionId === req.minion.id)
  res.send(filterWork);
});


//create a new minions work
apiRouter.post('/minions:minionId/work', (req, res, next) => {
  const newWork = db.addToDatabase('work', req.body);
  res.status(201).send(newWork);
});


//delete a minions work
apiRouter.delete('/minions/:minionId/work/:workId', (req,res,next) =>{
  db.deleteFromDatabasebyId('work', req.params.workId);
  res.status(204).send();
});


//update a minions work
apiRouter.put('/minions/:minionId/work/:workId', (req, res, next) => {
  const minion = db.getFromDatabaseById('minions',req.body.minionId);
	if (minion) {
		const updatedModel = db.updateInstanceInDatabase('work', req.body);
		res.send(updatedModel);
	} else if (req.body.minionId) {
		res.status(400).send();
	} else {
    res.status(404).send();
  }
});


module.exports = apiRouter;
