import RequestBuilder from './RequestBuilder'
import LaunchRequest from './json/LaunchRequest.json'

class LaunchRequestBuilder extends RequestBuilder {
  constructor(request = {}) {
    super(Object.assign(LaunchRequest,request))
  }
}

export default LaunchRequestBuilder