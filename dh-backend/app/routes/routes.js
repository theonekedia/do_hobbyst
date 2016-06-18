'use strict';

// Will initialize all the routes for the express app

module.exports = function (app, express, jwtObj, jwtConfig, components, mongooseOpt) {

  // Auths
  var authsComponents = new components.authsComponents('authsComponents')

  require('./auths/authsRoutes')
  (app, express, authsComponents, jwtObj, jwtConfig[0], mongooseOpt)

}