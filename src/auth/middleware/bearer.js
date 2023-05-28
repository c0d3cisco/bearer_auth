'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login'); }

    const token = req.headers.authorization.split(' ')[1];//.pop();
    // console.log( '********************', token );
    const validUser = await users.authenticateToken(token);
    // console.log( '********************', token );

    req.user = validUser;
    req.token = validUser.token;
    next(); //! It was missing this

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
