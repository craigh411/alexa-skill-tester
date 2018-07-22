import RequestBuilder from './RequestBuilder'
import IntentRequest from './json/IntentRequest.json'

export default class IntentRequestBuilder extends RequestBuilder {
    constructor(intentName, request = {}) {
        request = Object.assign(IntentRequest, request)
        super(request)
        super.setIntentName(intentName)
    }
}