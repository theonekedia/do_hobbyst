'use strict';

var bluePromise = require('bluebird')

var returnObject = require('../shared/returnObject')

var teamsModel = require('../../models/teams')
var teamsModelBluebird = bluePromise.promisifyAll(teamsModel)

class teamsComp {

  constructor(name) {
    this.name = name
  }

  getTeamsDetails(teamsArray) {

    var returnObj = returnObject

    return bluePromise.map(teamsArray, function(team) {

      return teamsModelBluebird.findById(team._id)
      .then(function(teamData) {
        return teamData
      })
    }, { concurrency: 10})
  }

  getAllTeams() {

    var returnObj = returnObject

    return teamsModel.find({})
    .exec()
    .then(function(allTeamsArray) {

      if(allTeamsArray.length === 0) {
        returnObj.status = 'ERR'
        returnObj.data = ''
        returnObj.error = 'teams none'

      } else {
        returnObj.status = 'OK'
        returnObj.data = allTeamsArray
        returnObj.error = ''
      }

      return returnObj
    })
    .catch(function(err) {
      console.log(err)
    })
    .end()
  }
}

module.exports = teamsComp