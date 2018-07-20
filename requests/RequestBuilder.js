import Request from '../handlers/Request'
import RandExp from 'randexp'

export default class RequestBuilder {
        constructor(request) {
            this.request = request
            this.buildRequest()
        }

        send() {
            Request.send(this.request)
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

            this.request.session.sessionId = sessionId
            return this
        }

        getSessionId() {
            return this.request.session.sessionId
        }

        setApplicationId(id) {
            let applicationId = id || this.generateRandomString('amzn1.ask.skill.')

            this.request.session.application.applicationId = applicationId
            this.request.context.System.application.applicationId = applicationId

            return this
        }

        getApplicationId() {
          return this.request.session.application.applicationId
        }

        setUserId(id) {
            let userId = id || new RandExp(/amzn1\.ask\.account\.[0-9A-Z]{207}/).gen();

            this.request.session.user.userId = userId
            this.request.context.System.user.userId = userId

            return this
        }

        getUserId() {
          return  this.request.session.user.userId
        }

        setDeviceId(id) {
            let deviceId = id || new RandExp(/amzn1\.ask\.device\.[0-9A-Z]{156}/).gen();

            this.request.context.System.device.deviceId = deviceId

            return this
        }

        getDeviceId() {
          return this.request.context.System.device.deviceId
        }

        setInterfaces(interfaces) {
            this.request.context.System.device.supportedInterfaces = interfaces

            return this
        }

        setApiEndpoint(endpoint) {
            this.request.context.System.apiEndpoint = endpoint

            return this
        }

        getApiEndpoint() {
          return  this.request.context.System.apiEndpoint
        }

        /**
         * Set request Id
         */
        setRequestId(id) {
            let requestId = id || this.generateRandomString('amzn1.echo-api.request.')

            this.request.request.requestId = requestId


            return this
        }

        setApiAccessToken(token) {
            token = token || new RandExp(/[0-9A-Z_]{50}/).gen();
            this.request.context.System.apiAccessToken = token


            return this
        }

        setLocale(locale) {
            this.request.request.locale = locale
            return this
        }

        getLocale() {
            return this.request.request.locale
        }

        setTimestamp(timestamp) {
            this.request.request.timestamp = timestamp || new Date(new Date().toUTCString().substr(0, 25)).toISOString()
            return this
        }

        generateRandomString(prepend = '') {
            var string = new RandExp(/[0-9a-z]{7}[0-9]-[0-9a-z]{3}[0-9]-[0-9a-z]{3}[0-9]-[0-9a-z]{3}[0-9]-[0-9a-z]{11}[0-9]/).gen();

            return prepend + string
        }

    }