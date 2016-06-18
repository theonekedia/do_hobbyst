'use strict';

var uuid = require('node-uuid')

class uuidgen {

  constructor(name) {
    this.name = name
  }

  activationUrlToken() {
    return uuid.v4().split('-').join('')
  }

  // Done seperately so that in future changes could be made
  resetPasswordToken() {
    return uuid.v4().split('-').join('')
  }

  uuidGeneratorValue() {
    return uuid.v4()
  }
}

module.exports = uuidgen