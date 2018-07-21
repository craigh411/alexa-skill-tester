import RequestBuilder from './RequestBuilder'
import LaunchRequest from './json/LaunchRequest.json'
import cloneDeep from 'lodash.clonedeep'

export default class LaunchRequestBuilder extends RequestBuilder {
    constructor(request = {}) {
        request = Object.assign(LaunchRequest, request)
        super(cloneDeep(request))
    }
}