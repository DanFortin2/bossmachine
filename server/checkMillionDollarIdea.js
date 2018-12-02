/////////////////////////
/////////MiddleWare/////
///////////////////////

const checkMillionDollarIdea = (req, res, next) => {
  const numOfWeeks = req.body.numWeeks;
  const weeklyRevenue = req.body.weeklyRevenue;
  const total = numOfWeeks * weeklyRevenue;
  if(typeof numWeeks === 'String' || typeof weeklyRevenue === 'String' || total >= 1000000) {
    next();
  } else {
    res.status(400).send();
  }
};


// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
