'use strict';

// Import the users components

module.exports = function (app, express, authsComponents, jwtObj, jwtConfig, mongooseOpt) {

  var authsRouter = express.Router()

  authsRouter.post('/', function(req, res) {

  })

  app.use('/auths', authsRouter)
}