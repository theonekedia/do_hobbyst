'use strict';

var returnObject = require('../shared/returnObject')

var bidsModel = require('../../models/bids')

var usersClass = require('../users/usersComp')

class bidsComp {

  constructor(name) {
    this.name = name
  }

  checkUserUniqueBid(bidsId, usersId) {

    return bidsModel.findById(bidsId)
    .exec()
    .then(function(bidsData) {

      var flag = false

      if(bidsData) {
        var bidsUsers = bidsData.users

        for(var iter = 0;iter < bidsUsers.length;iter++) {
          if(bidsUsers[iter].usersId === usersId) {
            flag = true
            break;
          }
        }

        return flag
      } else {
        return false
      }
    })
    .catch(function(err) {
      console.log(err)
    })
    .end()
  }

  saveUserBidsOpinion(bidsId, eventsId, usersId, opinion, bidPoints) {

    var returnObj = returnObject

    var returnThis = this

    var usersObj = new usersClass('usersComponents')

    var usersBid = {
      usersId: usersId,
      bet: opinion
    }

    return this.checkUserUniqueBid(bidsId, usersId)
    .then(function(uniqueStatus) {
      if(!uniqueStatus) {
        return bidsModel.findById(bidsId)
        .exec()
        .then(function(bidsData) {

          if(bidsData) {
            bidsData.users.push(usersBid)

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

      } else {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'bids not uniue'

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


// var test = new bidsComp(' ')

// var bidsStatus = test.checkUserUniqueBid("57658fa09c6f0b1913f5a5f6","5765d542f4b272f6f9a4145")

// bidsStatus.onFulfill(function(bidsData) {
//   console.log(bidsData)
//   // if(bidsData.status === 'OK') {
//   //   res.status(200).send(bidsData.data)
//   // } else if(bidsData.status === 'ERR') {
//   //   res.status(404).send(bidsData.error)
//   // }
// })

// bidsStatus.onReject(function(err) {
//   res.status(400).send('something went wrong')
// })