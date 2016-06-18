'use strict';

// Import the users components

module.exports = function (app, express, usersComponents, jwtObj, jwtConfig, mongooseOpt) {

  var usersRouter = express.Router()

  usersRouter.post('/', function(req, res) {

    var userData = {}

    userData.email = req.body.email
    userData.name = req.body.name

    var usersStatus = usersComponents.saveUser(userData)

    usersStatus.onFulfill(function(usersData) {

      if(usersData.status === 'OK') {
        res.status(200).send(usersData.data)
      } else if(usersData.status === 'ERR') {
        res.status(404).send('credentials error')
      }
    })

    usersStatus.onReject(function(err) {
      res.status(400).send('something went wrong')
    })
  })

  app.use('/auths', usersRouter)
}