'use strict';

// Import the users components

module.exports = function (app, express, scoresComponents, jwtObj, jwtConfig, mongooseOpt) {

  var scoresRouter = express.Router()

  scoresRouter.get('/', function(req, res) {

    var scoresStatus = scoresComponents.getScores(req.query.usersId)

    scoresStatus.onFulfill(function(scoresData) {

      if(scoresData.status === 'OK') {
        res.status(200).send(scoresData.data)
      } else if(scoresData.status === 'ERR') {
        res.status(404).send(scoresData.error)
      }
    })

    scoresStatus.onReject(function(err) {
      res.status(400).send('something went wrong')
    })
  })

  scoresRouter.post('/', function(req, res) {

    var scoresStatus = scoresComponents.setScores(req.query.eventsId)

    scoresStatus.onFulfill(function(scoresData) {

      if(scoresData.status === 'OK') {
        res.status(200).send(scoresData.data)
      } else if(scoresData.status === 'ERR') {
        res.status(404).send(scoresData.error)
      }
    })

    scoresStatus.onReject(function(err) {
      res.status(400).send('something went wrong')
    })
  })

  app.use('/scores', scoresRouter)
}