import Request from '../handlers/Request'
import RandExp from 'randexp'
import cloneDeep from 'lodash.clonedeep'

export default class RequestBuilder {

    constructor(request) {
        this.request = cloneDeep(request)
        this.initting = true
        this.buildRequest()
        this.initting = false
    }

    getRequest() {
        return this.request
    }

    buildRequest() {
        this.setUserId()
        this.setSessionId()
        this.setRequestId()
        this.setApplicationId()
        this.setDeviceId()
        this.setTimestamp()
    }

    setVersion(version) {
        this.request.version = version

        return this
    }

    getVersion() {
        return this.request.version
    }

    setIsNewSession(isNew) {
        this.request.session.new = isNew
        return this
    }

    getIsNewSession(isNew) {
        return this.request.session.new
    }


    setSessionId(id) {
        let sessionId = id || this.generateRandomString('amzn1.ask.session')

        if (this.shouldSet(this.request.session.sessionId)) {
            this.request.session.sessionId = sessionId
        }

        return this
    }

    getSessionId() {
        return this.request.session.sessionId
    }

    setApplicationId(id) {
        let applicationId = id || this.generateRandomString('amzn1.ask.skill.')

        if (this.shouldSet(this.request.session.application.applicationId)) {
            this.request.session.application.applicationId = applicationId
            this.request.context.System.application.applicationId = applicationId
        }

        return this
    }

    getApplicationId() {
        return this.request.session.application.applicationId
    }

    setUserId(id) {
        let userId = id || new RandExp(/amzn1\.ask\.account\.[0-9A-Z]{207}/).gen();

        if (this.shouldSet(this.request.session.user.userId)) {
            this.request.session.user.userId = userId
            this.request.context.System.user.userId = userId
        }

        return this
    }

    getUserId() {
        return this.request.session.user.userId
    }

    setDeviceId(id) {
        let deviceId = id || new RandExp(/amzn1\.ask\.device\.[0-9A-Z]{156}/).gen();

        if (this.shouldSet(this.request.context.System.device.deviceId)) {
            this.request.context.System.device.deviceId = deviceId
        }

        return this
    }

    getDeviceId() {
        return this.request.context.System.device.deviceId
    }

    setSupportedInterfaces(interfaces) {
        this.request.context.System.device.supportedInterfaces = interfaces

        return this
    }

    getSupportedInterfaces() {
        return this.request.context.System.device.supportedInterfaces
    }

    addSupportedInterface(name, value = {}) {
        this.request.context.System.device.supportedInterfaces[name] = {}

        return this
    }

    /**
     * Let's allow the interfaces to be set through chaining, so we don't have to remember the prop names and format
     */
    supportsAudioInterface(value = {}) {
        this.addSupportedInterface('AudioPlayer', value)

        return this
    }


    setApiEndpoint(endpoint) {
        this.request.context.System.apiEndpoint = endpoint

        return this
    }

    getApiEndpoint() {
        return this.request.context.System.apiEndpoint
    }

    /**
     * Set request Id
     */
    setRequestId(id) {
        let requestId = id || this.generateRandomString('amzn1.echo-api.request.')

        this.request.request.requestId = requestId


        return this
    }

    getRequestId() {
        return this.request.request.requestId
    }

    /**
     * Sets an API access token for the request
     */
    setApiAccessToken(token) {
        token = token || new RandExp(/[0-9A-Z_]{50}/).gen();
        this.request.context.System.apiAccessToken = token


        return this
    }

    getApiAccessToken() {
        return this.request.context.System.apiAccessToken
    }

    setLocale(locale) {
        this.request.request.locale = locale
        return this
    }

    getLocale() {
        return this.request.request.locale
    }

    setTimestamp(timestamp) {
        if (this.shouldSet(this.request.request.timestamp)) {
            this.request.request.timestamp = timestamp || new Date(new Date().toUTCString().substr(0, 25)).toISOString()
        }

        return this
    }

    getTimestamp() {
        return this.request.request.timestamp
    }

    setRequestType(requestType) {
        this.request.request.type = requestType
    }

    getRequestType() {
        return this.request.request.type
    }

    setIntentName(intentName) {
        this.request.request.intent.name = intentName
    }

    getIntentName() {
        return this.request.request.intent.name
    }

    generateRandomString(prepend = '') {
        var string = new RandExp(/[0-9a-z]{7}[0-9]-[0-9a-z]{3}[0-9]-[0-9a-z]{3}[0-9]-[0-9a-z]{3}[0-9]-[0-9a-z]{11}[0-9]/).gen();

        return prepend + string
    }

    shouldSet(prop) {
        return !this.initting || (this.initting && !prop)
    }

}