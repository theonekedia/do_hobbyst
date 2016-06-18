'use strict';

// Will initialize all the routes for the express app

module.exports = function (app, express, jwtObj, jwtConfig, components, mongooseOpt) {

  // Users
  var usersComponents = new components.usersComponents('usersComponents')

  require('./users/usersRoutes')
  (app, express, usersComponents, jwtObj, jwtConfig[0], mongooseOpt)

}