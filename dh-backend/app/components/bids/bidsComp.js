'use strict';

var returnObject = require('../shared/returnObject')

var bidsModel = require('../../models/bids')

var usersClass = require('../users/usersComp')

class bidsComp {

  constructor(name) {
    this.name = name
  }

  saveUserBidsOpinion(bidsId, eventsId, usersId, opinion, bidPoints) {

    var returnObj = returnObject

    var returnThis = this

    var usersObj = new usersClass('usersComponents')

    var usersBid = {
      usersId: usersId,
      bet: opinion
    }

    return bidsModel.findById(bidsId)
    .exec()
    .then(function(bidsData) {

      if(bidsData) {
        bidsData.users.push(usersBid)
        console.log(bidsData.users)

        var bidsModelData = new bidsModel(bidsData)

        return bidsModel.findByIdAndUpdate(bidsId, {
          $set: {
            users: bidsData.users
          }
        })
        .then(function(bidsDataNew) {

          return usersObj.setUserPoints(usersId, eventsId, bidsId, bidPoints)
        })

      } else {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'bids none'

        return returnObj
      }
    })
    .catch(function(err) {
      console.log(err)
    })
    .end()
  }

  getUserBids(bidsId) {

    var returnObj = returnObject

    return bidsModel.findById(bidsId)
    .exec()
    .then(function(bidsData) {

      if(bidsData) {
        returnObj.status = 'OK'
        returnObj.data = bidsData
        returnObj.error = ''

      } else {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'bids none'
      }

      return returnObj
    })
    .catch(function(err) {
      console.log(err)
    })
    .end()
  }

  getUserBidsByEvents(eventsId) {

    var returnObj = returnObject

    return bidsModel.find({eventsId: eventsId})
    .exec()
    .then(function(bidsData) {

      if(bidsData) {
        returnObj.status = 'OK'
        returnObj.data = bidsData
        returnObj.error = ''

      } else {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'bids none'
      }

      return returnObj
    })
    .catch(function(err) {
      console.log(err)
    })
    .end()
  }
}

module.exports = bidsComp