import RequestBuilder from './RequestBuilder'
import IntentRequest from './json/IntentRequest.json'
import cloneDeep from 'lodash.clonedeep'

export default class IntentRequestBuilder extends RequestBuilder {
    constructor(intentName, request = {}) {
        request = Object.assign(IntentRequest, request)
        super(cloneDeep(request))
        this.setIntentName(intentName)
    }

    setIntentName(intentName) {
        this.request.request.intent.name = intentName
    }

    getIntentName() {
        return this.request.request.intent.name
    }
}