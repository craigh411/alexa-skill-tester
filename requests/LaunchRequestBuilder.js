import RequestBuilder from './RequestBuilder'
import LaunchRequest from './json/LaunchRequest.json'

export default class LaunchRequestBuilder extends RequestBuilder {
    constructor(request = {}) {
        request = Object.assign(LaunchRequest, request)
        super(request)
    }
}