import RandExp from 'randexp'
import cloneDeep from 'lodash.clonedeep'

export default class RequestBuilder {

    /**
     * Constructor
     *
     * @param {Object} request - The alexa request object
     */
    constructor(request) {
        this.request = cloneDeep(request)
        this.initting = true
        this.__buildRequest()
        this.initting = false
    }

    /**
     * Builds the initial request.
     */
    __buildRequest() {
        this.setUserId()
        this.setSessionId()
        this.setRequestId()
        this.setApplicationId()
        this.setDeviceId()
        this.setTimestamp()
    }

    /**
     * Returns the Request Object
     *
     * @returns {Object}
     */
    getRequest() {
        return this.request
    }


    /**
     * Sets the request's version property
     *
     * @param {String} version
     * @returns {RequestBuilder}
     */
    setVersion(version) {
        this.request.version = version

        return this
    }

    /**
     * Gets the request's version property
     *
     * @returns {String}
     */

    getVersion() {
        return this.request.version
    }

    /**
     * Sets the request's session.new property
     *
     * @param {Boolean} isNew
     * @returns {RequestBuilder}
     */
    setIsNewSession(isNew) {
        this.request.session.new = isNew

        return this
    }

    /**
     * Gets the request's session.new property
     *
     * @returns {Boolean}
     */
    getIsNewSession() {
        return this.request.session.new
    }

    /**
     * Sets the request's sessionId property. If no param is passed then a random requestId is assigned
     *
     * @param {String} id
     * @returns {RequestBuilder}
     */
    setSessionId(id) {
        let sessionId = id || this.__generateRandomString('amzn1.ask.session')

        if (this.__shouldSet(this.request.session.sessionId)) {
            this.request.session.sessionId = sessionId
        }

        return this
    }

    /**
     * Gets the request's sessionId property
     *
     * @returns {String}
     */
    getSessionId() {
        return this.request.session.sessionId
    }

    /**
     * Sets the request's applicationId properties. If no param is passed then a random applicationId is assigned
     *
     * @param {String} id
     * @returns {RequestBuilder}
     */
    setApplicationId(id) {
        let applicationId = id || this.__generateRandomString('amzn1.ask.skill.')

        if (this.__shouldSet(this.request.session.application.applicationId)) {
            this.request.session.application.applicationId = applicationId
            this.request.context.System.application.applicationId = applicationId
        }

        return this
    }

    /**
     * Gets the request's applicationId property
     *
     * @returns {String}
     */
    getApplicationId() {
        return this.request.session.application.applicationId
    }


    /**
     * Sets the request's userId properties. If no param is passed then a random userId is assigned
     *
     * @param {String} id
     * @returns {RequestBuilder}
     */
    setUserId(id) {
        let userId = id || new RandExp(/amzn1\.ask\.account\.[0-9A-Z]{207}/).gen()

        if (this.__shouldSet(this.request.session.user.userId)) {
            this.request.session.user.userId = userId
            this.request.context.System.user.userId = userId
        }

        return this
    }

    /**
     * Gets the request's applicationId property
     *
     * @returns {String}
     */
    getUserId() {
        return this.request.session.user.userId
    }

    /**
     * Sets the request's deviceId properties. If no param is passed then a random deviceId is assigned
     *
     * @param {String} id
     * @returns {RequestBuilder}
     */
    setDeviceId(id) {
        let deviceId = id || new RandExp(/amzn1\.ask\.device\.[0-9A-Z]{156}/).gen()

        if (this.__shouldSet(this.request.context.System.device.deviceId)) {
            this.request.context.System.device.deviceId = deviceId
        }

        return this
    }

    /**
     * Gets the request's deviceId property
     *
     * @returns {String}
     */
    getDeviceId() {
        return this.request.context.System.device.deviceId
    }


    /**
     * Sets the request's supportedInterfaces property. 
     *
     * @param {Object} interfaces
     * @returns {RequestBuilder}
     */
    setSupportedInterfaces(interfaces) {
        this.request.context.System.device.supportedInterfaces = interfaces

        return this
    }

    /**
     * Gets the request's supportedInterfaces property
     *
     * @returns {Object}
     */
    getSupportedInterfaces() {
        return this.request.context.System.device.supportedInterfaces
    }

    /**
     * Adds an interface to the supportedInterfaces property
     *
     * @param {String} name - The name of the supported Interface
     * @param {Object} value - The value of the supported interface. Defaults to an empty object
     * @returns {RequestBuilder}
     */
    withSupportedInterface(name, value = {}) {
        this.request.context.System.device.supportedInterfaces[name] = value

        return this
    }

    /**
     * Adds the Audio Interface to the supportedInterfaces
     *
     * @param {Object} value - The value of the supported interface. Defaults to an empty object
     * @returns {RequestBuilder}
     */
    withAudioInterface(value = {}) {
        this.withSupportedInterface('AudioPlayer', value)

        return this
    }


    /**
     * Sets the request's apiEndpoint property. 
     *
     * @param {String} endpoint
     * @returns {RequestBuilder}
     */
    setApiEndpoint(endpoint) {
        this.request.context.System.apiEndpoint = endpoint

        return this
    }

    /**
     * Gets the request's apiEndpoint property. 
     *
     * @returns{String} endpoint
     */
    getApiEndpoint() {
        return this.request.context.System.apiEndpoint
    }

    /**
     * Sets the request's requestId property. If no param is passed then a random requestId is assigned
     *
     * @param {String} id
     * @returns {RequestBuilder}
     */
    setRequestId(id) {
        let requestId = id || this.__generateRandomString('amzn1.echo-api.request.')

        if (this.__shouldSet(this.request.request.requestId)) {
            this.request.request.requestId = requestId
        }


        return this
    }

    /**
     * Gets the request's requestId property. 
     *
     * @returns{String} endpoint
     */
    getRequestId() {
        return this.request.request.requestId
    }

    /**
     * Sets the request's apiAccessToken property. If no param is passed then a random apiAccessToken is assigned
     *
     * @param {String} token
     * @returns {RequestBuilder}
     */
    setApiAccessToken(token) {
        token = token || new RandExp(/[0-9A-Z_]{50}/).gen()
        this.request.context.System.apiAccessToken = token


        return this
    }

    /**
     * Gets the request's apiAccessToken property. 
     *
     * @returns{String} endpoint
     */
    getApiAccessToken() {
        return this.request.context.System.apiAccessToken
    }


    /**
     * Sets the request's locale property.
     *
     * @param {String} locale
     * @returns {RequestBuilder}
     */
    setLocale(locale) {
        this.request.request.locale = locale

        return this
    }

    /**
     * Gets the request's locale property.
     *
     * @returns {String} locale
     */
    getLocale() {
        return this.request.request.locale
    }

    /**
     * Sets the request's timestamp property. If no param is passed, it sets the timestamp to the current UTC time.
     *
     * @param {String} timestamp - A timestamp. This should be in ISO-8601 format
     * @returns {RequestBuilder} 
     */
    setTimestamp(timestamp) {
        if (this.__shouldSet(this.request.request.timestamp)) {
            this.request.request.timestamp = timestamp || new Date(new Date().toUTCString().substr(0, 25)).toISOString()
        }

        return this
    }

    /**
     * Gets the request's timestamp property.
     *
     * @returns {String} timestamp
     */
    getTimestamp() {
        return this.request.request.timestamp
    }

    /**
     * Sets the request's request.type property.
     *
     * @param {String} requestType
     * @returns {RequestBuilder}
     */
    setRequestType(requestType) {
        this.request.request.type = requestType

        return this
    }

    /**
     * Gets the request's request.type property.
     *
     * @returns {String} requestType
     */
    getRequestType() {
        return this.request.request.type
    }

    /**
     * Sets the request's intent name property.
     *
     * @param {String} intentName
     * @returns {RequestBuilder}
     */
    setIntentName(intentName) {
        this.request.request.intent.name = intentName

        return this
    }

    /**
     * Gets the request's intent name property.
     *
     * @returns{String} intentName
     */
    getIntentName() {
        return this.request.request.intent.name
    }

    /**
     * Sets the request's intent ConfirmationStatus property
     *
     * @param {String} status - Possible values NONE, CONFIRMED, DENIED 
     * @throws Error
     * @returns {RequestBuilder}
     */
    setIntentConfirmationStatus(status) {
        if (status === 'NONE' || status === 'CONFIRMED' || status === 'DENIED') {
            this.request.request.intent.confirmationStatus = status

            return this
        } else {
            throw new Error('Confirmation status must be \'NONE\', \'CONFIRMED\' or \'DENIED\'')
        }
    }


    /**
     * Gets the request's intent ConfirmationStatus property.
     *
     * @returns {String} intentName
     */
    getIntentConfirmationStatus() {
        return this.request.request.intent.confirmationStatus
    }

    /**
     * Sets the request's dialogState property (see: https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html)
     *
     * @param {String} state - Possible values STARTED, IN_PROGRESS, COMPLETED
     * @throws Error
     * @returns {RequestBuilder}
     */
    setDialogState(state) {
        if (state === 'STARTED' || state === 'IN_PROGRESS' || state === 'COMPLETED') {
            this.request.request.dialogState = state

            return this
        } else {
            throw new Error('dialogState must be \'STARTED\', \'IN_PROGRESS\', or \'COMPLETED\'')
        }
    }

    /**
     * Gets the request's intent dialogState property.
     *
     * @returns {String} intentName
     */
    getDialogState() {
        return this.request.request.dialogState
    }

    /**
     * Sets the request's intent slots property
     *
     * @param {Object} slots
     * @throws Error
     * @returns {RequestBuilder}
     */
    setSlots(slots) {
        this.request.slots = slots

        return this
    }

    /**
     * Gets the request's intent slots property
     *
     * @param {Object} slots
     * @throws Error
     * @returns {RequestBuilder}
     */
    getSlots(slots) {
        return this.request.slots
    }

    /**
     * Returns the slot for the given name
     *
     * @param {String} name - The name of the slot
     * @return {Object} - the slot object
     */
    getSlot(name) {
        if (this.request.slots) {
            if (this.request.slots[name]) {
                return this.request.slots[name]
            }
        }

        throw new Error('Unable to get slot. ' + name + ' doesn\'t exist.')
    }

    /**
     *
     */
    getSlotId(name) {

    }

    /**
     * Resolves a slot to it's names
     *
     * @param {String} name - The names of the slot
     * @return {array} - And array of slot names
     */
    resolveSlotToNames(name) {
        try {
            return this.resolveSlot(name).map(value => value.value.name);
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Resolves a slot to it's ids
     *
     * @param {String} name - The names of the slot
     * @return {array} - And array of slot ids
     */
    resolveSlotToIds(name) {
        try {
            return this.resolveSlot(name).map(value => value.value.id);
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Resolves a slot to it's original values
     *
     * @param {String} name - The names of the slot
     */
    resolveSlot(name) {
        try {
            return this.getSlot(name).resolutions.resolutionsPerAuthority.map(resolution => resolution.values)[0]
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Creates a slot that has been resolved via a synonym. If no id is passed, a random id will be assigned
     *
     * @param {String} name - The name of the slot
     * @param {String} value - The slots resolved value 
     * @param {String} synonym - The synonym that is being resolved
     * @param {String} id - The slot id. If not set a random id is assigned
     * @return {RequestBuilder}
     */
    withSynonymSlot(name, value, synonym, id) {
        this.__initSlots()
        let slot = this.request.slots[name]
        id = (id) ? id : new RandExp(/[0-9a-f]/).gen()

        this.request.slots[name] = {
            name: name,
            value: synonym,
            resolutions: {
                resolutionsPerAuthority: [{
                    authority: "amzn1.er-authority.echo-sdk.amzn1.ask.skill." + this.getApplicationId + "." + name,
                    status: {
                        code: 'ER_SUCCESS_MATCH'
                    },
                    values: [{
                        value: {
                            name: value,
                            id: id
                        }
                    }]
                }]
            }
        }

        return this
    }


    /**
     * Creates a slot with the given name, value and id. If no id is passed, a random id will be assigned
     *
     * @param {String} name - The name of the slot
     * @param {String} value - The value of the slot
     * @param {String} id - The slot id. If not set a random id is assigned
     * @return {RequestBuilder}
     */
    withSlot(name, value, id) {
        this.__initSlots()
        let slot = this.request.slots[name]
        id = (id) ? id : new RandExp(/[0-9a-f]{32}/).gen()

        this.request.slots[name] = {
            name: name,
            value: value,
            resolutions: {
                resolutionsPerAuthority: [{
                    authority: "amzn1.er-authority.echo-sdk.amzn1.ask.skill." + this.getApplicationId + "." + name,
                    status: {
                        code: 'ER_SUCCESS_MATCH'
                    },
                    values: [{
                        value: {
                            name: name,
                            id: id
                        }
                    }]
                }]
            }
        }

        return this
    }


    withFailedSlot() {
        this.__initSlots()
    }

    withMultipleResolutionsSlot() {
        this.__initSlots()
    }

    /**
     * Adds the slots object to the request if it doesn't already exist
     */
    __initSlots() {
        if (!this.request.slots) {
            this.request.slots = {}
        }
    }

    withSlotResolutions(slotName) {
        if (this.request.slots[slotName]) {

        } else {
            throw new Error('Unable to add resolution. ' + slotName + ' doesn\'t exist. Make sure you create the slot first (see: withSlot method)')
        }
    }


    /**
     * Generates a random string in Alexa's id format
     *
     * @param prepend - The value to prepend to the string
     * @returns {String}
     */
    __generateRandomString(prepend = '') {
        let string = new RandExp(/[0-9a-f]{7}[0-9]-[0-9a-f]{3}[0-9]-[0-9a-f]{3}[0-9]-[0-9a-f]{3}[0-9]-[0-9a-f]{11}[0-9]/).gen()

        return prepend + string
    }

    /**
     * Returns true of the property should be set by the __buildRequest method
     *
     * @param prop - the property to check
     * @returns {Boolean}
     */
    __shouldSet(prop) {
        return !this.initting || (this.initting && !prop)
    }

}