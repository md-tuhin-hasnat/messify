const createHttpError = require("http-errors");
const { contribution } = require("../models/contribution.model");
async function addMoney(req,res,next){
  const {userId,date,month,year, amount,mess_code} = req.body;
  try {
    const newContribution = new contribution({
      userId: userId,
      date: date,
      month: month,
      amount: amount,
      mess_code: mess_code,
      year: year
    });
    await newContribution.save();
    res.status(201).send({success: true});
  } catch (error) {
    console.log(error);
    next(createHttpError(500,error));
  }
}

async function getContribution(req,res,next){
  const {month,year,mess_code} = req.params;
  // console.log(date, month, mess_code);
  try {
    const contributions = await contribution.find({month: month, year: year, mess_code:mess_code});
    let totalContribution = [];
    let mp = new Map();
    for (let i = 0; i < contributions.length; i++) {
      const _contribution = contributions[i];
      if(mp.has(_contribution.userId)){
        const total = _contribution.amount;
        mp.set(
          _contribution.userId, 
          {
            userId: _contribution.userId,
            date:'-',
            month:_contribution.month,
            amount: total+mp.get(_contribution.userId).amount,
          }
        );
      }
      else{
        mp.set(_contribution.userId, _contribution);
      }
    }
    for(const [key, value] of mp){
      totalContribution.push(value);
    }
    res.status(200).send({
      contributions: totalContribution,
      contributionsByDate: contributions
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500,error));
  }
}

async function getTotalContribution(req,res,next){
  const {month,year,mess_code} = req.params;
  try {
    const contributions = await contribution.find({month: month,year:year, mess_code:mess_code});
    let total = 0;
    for (let i = 0; i < contributions.length; i++) {
      total += contributions[i].amount;
    }
    res.status(200).send({
      total: total
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500,error));
  }
}
module.exports = {
  addMoney,
  getContribution,
  getTotalContribution
}