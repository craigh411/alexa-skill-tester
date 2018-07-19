const RequestBuilder = require('./RequestBuilder')
const LaunchRequest = require('./json/LaunchRequest.json')

class LaunchRequestBuilder extends RequestBuilder {
  constructor(request = {}) {
    super(Object.assign(LaunchRequest,request))
  }
}

module.exports = LaunchRequestBuilder