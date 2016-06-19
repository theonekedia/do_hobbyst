'use strict';

// Import the users components

module.exports = function (app, express, eventsComponents, jwtObj, jwtConfig, mongooseOpt) {

  var eventsRouter = express.Router()

	eventsRouter.get('/live', function(req, res) {

    var eventsStatus = eventsComponents.getLiveEvents()

    eventsStatus.onFulfill(function(eventsData) {

      if(eventsData.status === 'OK') {
        res.status(200).send(eventsData.data)
      } else if(eventsData.status === 'ERR') {
        res.status(404).send(eventsData.error)
      }
    })

    eventsStatus.onReject(function(err) {
      res.status(400).send('something went wrong')
    })
	})

  app.use('/events', eventsRouter)
}
