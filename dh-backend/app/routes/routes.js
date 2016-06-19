'use strict';

// Will initialize all the routes for the express app

module.exports = function (app, express, jwtObj, jwtConfig, components, mongooseOpt) {

  // Users
  var usersComponents = new components.usersComponents('usersComponents')

  require('./users/usersRoutes')
  (app, express, usersComponents, jwtObj, jwtConfig[0], mongooseOpt)

  var eventsComponents = new components.eventsComponents('eventsComponents')

  require('./events/eventsRoutes')
  (app, express, eventsComponents, jwtObj, jwtConfig[0], mongooseOpt)

  var teamsComponents = new components.teamsComponents('teamsComponents')

  require('./teams/teamsRoutes')
  (app, express, teamsComponents, jwtObj, jwtConfig[0], mongooseOpt)

  var bidsComponents = new components.bidsComponents('bidsComponents')

  require('./bids/bidsRoutes')
  (app, express, bidsComponents, jwtObj, jwtConfig[0], mongooseOpt)

  var scoresComponents = new components.scoresComponents('scoresComponents')

  require('./scores/scoresRoutes')
  (app, express, scoresComponents, jwtObj, jwtConfig[0], mongooseOpt)
}