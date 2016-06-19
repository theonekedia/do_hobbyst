'use strict';

// Import the users components

module.exports = function (app, express, bidsComponents, jwtObj, jwtConfig, mongooseOpt) {

  var bidsRouter = express.Router()

  bidsRouter.get('/', function(req, res) {

    var bidsStatus = bidsComponents.getUserBids(req.query.bidsId)

    bidsStatus.onFulfill(function(bidsData) {

      if(bidsData.status === 'OK') {
        res.status(200).send(bidsData.data)
      } else if(bidsData.status === 'ERR') {
        res.status(404).send(bidsData.error)
      }
    })

    bidsStatus.onReject(function(err) {
      res.status(400).send('something went wrong')
    })
  })

  bidsRouter.get('/events', function(req, res) {

    var bidsStatus = bidsComponents.getUserBidsByEvents(req.query.eventsId)

    bidsStatus.onFulfill(function(bidsData) {

      if(bidsData.status === 'OK') {
        res.status(200).send(bidsData.data)
      } else if(bidsData.status === 'ERR') {
        res.status(404).send(bidsData.error)
      }
    })

    bidsStatus.onReject(function(err) {
      res.status(400).send('something went wrong')
    })
  })

  bidsRouter.post('/', function(req, res) {

    // console.log(req.body.bidsId,
    //             req.body.eventsId,
    //             req.body.usersId,
    //             req.body.opinion,
    //             req.body.bidPoints)

    var bidsStatus = bidsComponents.saveUserBidsOpinion(req.body.bidsId,
                                                        req.body.eventsId,
                                                        req.body.usersId,
                                                        req.body.opinion,
                                                        req.body.bidPoints)

    bidsStatus.onFulfill(function(bidsData) {

      if(bidsData.status === 'OK') {
        res.status(200).send(bidsData.data)
      } else if(bidsData.status === 'ERR') {
        res.status(404).send(bidsData.error)
      }
    })

    bidsStatus.onReject(function(err) {
      res.status(400).send('something went wrong')
    })
  })

  app.use('/bids', bidsRouter)
}
