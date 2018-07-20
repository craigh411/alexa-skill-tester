import RequestBuilder from './RequestBuilder'
import LaunchRequest from './json/LaunchRequest.json'
import cloneDeep from 'lodash.clonedeep'

class LaunchRequestBuilder extends RequestBuilder {
  constructor(request = {}) {
  	request = Object.assign(LaunchRequest, request)
    super(cloneDeep(request))
  }
}

export default LaunchRequestBuilder