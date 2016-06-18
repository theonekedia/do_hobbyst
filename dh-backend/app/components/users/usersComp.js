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
}

module.exports = usersComp