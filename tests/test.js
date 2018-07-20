import { expect } from 'chai'
import RequestBuilder from '../requests/RequestBuilder'
import LaunchRequest from '../requests/json/LaunchRequest.json'
import cloneDeep from 'lodash.clonedeep'

describe('RequestBuilder', () => {

    it('should set the version', () => {
        const builder = new RequestBuilder(LaunchRequest)
        // Defaults to 1.0
        expect(builder.getVersion()).to.be.equal('1.0')
        // Change version
        builder.setVersion('2.0')

        expect(builder.getVersion()).to.be.equal('2.0')
    });


    it('should set new session', () => {
        const builder = new RequestBuilder(LaunchRequest)
        // Default's to true
        expect(builder.getIsNewSession()).to.be.true

        builder.setIsNewSession(false)

        expect(builder.getIsNewSession()).to.be.false
    });


    it('should set the session id to the passed param', () => {
        const builder = new RequestBuilder(LaunchRequest)
        // Change session Id
        builder.setSessionId('foo')

        expect(builder.getSessionId()).to.equal('foo')
    });


    it('should set the session id to a random id', () => {

        const sessionId1 = new RequestBuilder(cloneDeep(LaunchRequest))
		const sessionId2 = new RequestBuilder(cloneDeep(LaunchRequest))


        expect(sessionId1.getSessionId()).not.to.equal(sessionId2.getSessionId())
    });


    it('should set the application id to the passed param', () => {
        const builder = new RequestBuilder(LaunchRequest)
        // Change application Id
        builder.setApplicationId('foo')

        expect(builder.getApplicationId()).to.equal('foo')
    });


    it('should set the application id to a random id', () => {

        const applicationId1 = new RequestBuilder(cloneDeep(LaunchRequest))
		const applicationId2 = new RequestBuilder(cloneDeep(LaunchRequest))

        expect(applicationId1.getApplicationId()).not.to.equal(applicationId2.getApplicationId())

    });

    it('should set the application id in context to the same as session', () => {

        const builder = new RequestBuilder(LaunchRequest)
        const request = builder.getRequest()

        expect(request.session.application.applicationId).to.equal(request.context.System.application.applicationId)

    });


    it('should set the user id to the passed param', () => {
        const builder = new RequestBuilder(LaunchRequest)
        // Change user Id
        builder.setUserId('foo')

        expect(builder.getUserId()).to.equal('foo')
    });


    it('should set the user id to a random id', () => {

        const userId1 = new RequestBuilder(cloneDeep(LaunchRequest))
		const userId2 = new RequestBuilder(cloneDeep(LaunchRequest))

        expect(userId1.getUserId()).not.to.equal(userId2.getUserId())

    });

    it('should set the user id in context to the same as session', () => {

        const builder = new RequestBuilder(LaunchRequest)
        const request = builder.getRequest()

        expect(request.session.user.userId).to.equal(request.context.System.user.userId)

    });

    it('should set the device id to the passed param', () => {

        const builder = new RequestBuilder(LaunchRequest)
        builder.setDeviceId('foo')

        expect(builder.getDeviceId()).to.equal('foo')

    });

    it('should set the device id to a random id', () => {

        const builder = new RequestBuilder(LaunchRequest)

        expect(builder.getDeviceId()).to.match(/amzn1\.ask\.device\.[0-9A-Z]+/)

    });

    it('should set the api endpoint to the passed param', () => {

        const builder = new RequestBuilder(LaunchRequest)
        builder.setApiEndpoint('foo')

        expect(builder.getApiEndpoint()).to.equal('foo')

    });

    it('should set the locale', () => {
        const builder = new RequestBuilder(LaunchRequest)
        // Default's to en-US
        expect(builder.getLocale()).to.be.equal('en-US')
        // Change locale
        builder.setLocale('en-GB')
        // get request
        expect(builder.getLocale(LaunchRequest)).to.be.equal('en-GB')
    });

});