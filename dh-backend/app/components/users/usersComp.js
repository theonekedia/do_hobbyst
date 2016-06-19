'use strict';

var returnObject = require('../shared/returnObject')

var usersModel = require('../../models/users')

class usersComp {

  constructor(name) {
    this.name = name
  }

  saveUser(usersData) {

    var returnObj = returnObject

    var usersModelData = new usersModel(usersData)

    return usersModel.findOne({email: usersData.email})
    .exec()
    .then(function(user) {
      if(user) {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'user exists'

        return returnObj
      } else {
        return usersModelData.save()
        .then(function(users) {

          if(users) {
            returnObj.status = 'OK'
            returnObj.data = 'save success'
            returnObj.error = ''
          } else {
            returnObj.status = 'OK'
            returnObj.data = ''
            returnObj.error = 'save error'
          }

          return returnObj
        })
      }
    })
    .catch(function(err) {
      console.log(err)
    })
    .end()
  }

  getUser(usersEmailId) {

    var returnObj = returnObject

    return usersModel.findOne({email: usersEmailId})
    .exec()
    .then(function(usersData) {

      if(usersData) {
        returnObj.status = 'OK'
        returnObj.data = usersData
        returnObj.error = ''
      } else {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'save error'
      }

      return returnObj
    })
    .catch(function(err) {
      console.log(err)
    })
    .end()
  }

  setUserPoints(usersId, bidsId, eventsId, bidPoints) {

    var returnObj = returnObject

    return usersModel.findById(usersId)
    .exec()
    .then(function(usersData) {

      if(usersData) {

        var userBidsObj = {
          eventsId: eventsId,
          bidId: bidsId,
          status: 'n'
        }

        // console.log(usersData.bids)
        usersData.bids.push(userBidsObj)
        return usersModel.findByIdAndUpdate(usersId, {
          $set: {
            points: usersData.points - bidPoints,
            bids: usersData.bids
          }
        })
        .then(function(usersPointsData) {
          // console.log(usersPointsData)
          returnObj.status = 'OK'
          returnObj.data = 'user bid saved'
          returnObj.error = ''

          return returnObj
        })

      } else {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'save error'
      }

      return returnObj
    })
    .catch(function(err) {
      console.log(err)
    })
    .end()
  }

  getUserBids(usersId) {

    var returnObj = returnObject

    return usersModel.findById(usersId)
    .exec()
    .then(function(usersData) {

      if(usersData) {
        returnObj.status = 'OK'
        returnObj.data = usersData
        returnObj.error = ''
      } else {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'user none'
      }

      return returnObj
    })
    .catch(function(err) {
      console.log(err)
    })
    .end()
  }
}

module.exports = usersComp