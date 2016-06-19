'use strict';

// Import the users components

module.exports = function (app, express, teamsComponents, jwtObj, jwtConfig, mongooseOpt) {

  var teamsRouter = express.Router()

  teamsRouter.get('/all', function(req, res) {

    var teamsStatus = teamsComponents.getAllTeams()

    teamsStatus.onFulfill(function(teamsData) {

      if(teamsData.status === 'OK') {
        res.status(200).send(teamsData.data)
      } else if(teamsData.status === 'ERR') {
        res.status(404).send(teamsData.error)
      }
    })

    teamsStatus.onReject(function(err) {
      res.status(400).send('something went wrong')
    })
  })

  app.use('/teams', teamsRouter)
}
