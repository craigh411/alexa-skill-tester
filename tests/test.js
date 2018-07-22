import { expect, assert } from 'chai'
import { RequestBuilder, LaunchRequestBuilder, IntentRequestBuilder } from '../index.js'
import Client from '../handlers/Client'
import LaunchRequest from '../requests/json/LaunchRequest.json'
import IntentRequest from '../requests/json/IntentRequest.json'

import path from 'path'

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

        const sessionId1 = new RequestBuilder(LaunchRequest)
        const sessionId2 = new RequestBuilder(LaunchRequest)


        expect(sessionId1.getSessionId()).not.to.equal(sessionId2.getSessionId())
    });


    it('should set the application id to the passed param', () => {
        const builder = new RequestBuilder(LaunchRequest)
        // Change application Id
        builder.setApplicationId('foo')

        expect(builder.getApplicationId()).to.equal('foo')
    });


    it('should set the application id to a random id', () => {

        const applicationId1 = new RequestBuilder(LaunchRequest)
        const applicationId2 = new RequestBuilder(LaunchRequest)

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

        const userId1 = new RequestBuilder(LaunchRequest)
        const userId2 = new RequestBuilder(LaunchRequest)

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


    it('should set the request id to the passed param', () => {

        const builder = new RequestBuilder(LaunchRequest)
        builder.setRequestId('foo')

        expect(builder.getRequestId()).to.equal('foo')

    });

    it('should set the device id to a random id', () => {

        const builder = new RequestBuilder(LaunchRequest)

        expect(builder.getRequestId()).to.match(/amzn1\.echo-api\.request\.[a-z0-9-]+/)

    });

    it('should set the api access token to the passed param', () => {

        const builder = new RequestBuilder(LaunchRequest)
        builder.setApiAccessToken('foo')

        expect(builder.getApiAccessToken()).to.equal('foo')

    });

    it('should set the api access token to a random token', () => {

        const builder = new RequestBuilder(LaunchRequest)
        builder.setApiAccessToken()

        expect(builder.getApiAccessToken()).to.match(/[A-Z0-9_]+/)

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


    it('should set the timestamp to the passed param', () => {
        const builder = new RequestBuilder(LaunchRequest)
        builder.setTimestamp('foo')

        expect(builder.getTimestamp()).to.equal('foo')
    });

    it('should set supported interfaces to the passed param', () => {
        const builder = new RequestBuilder(LaunchRequest)
        builder.setSupportedInterfaces({
            foo: 'bar'
        })

        expect(builder.getSupportedInterfaces().foo).to.equal('bar')
    });

    it('should set the AudioPlayer interface', () => {
        const builder = new RequestBuilder(LaunchRequest)
        builder.supportsAudioInterface()
        assert.isObject(builder.getSupportedInterfaces().AudioPlayer)
    });


    it('should set the timestamp to the current UTC time', () => {
        const builder = new RequestBuilder(LaunchRequest)
        const now = new Date(new Date().toUTCString().substr(0, 25)).toISOString()

        expect(builder.getTimestamp()).to.equal(now)
    });

    it('should set the intent name', async() => {
        const builder = new RequestBuilder(IntentRequest)
        builder.setIntentName('foo')

        expect(builder.getIntentName()).to.equal('foo')
    });


    it('should set the request type', async() => {
        const builder = new RequestBuilder(IntentRequest)
        builder.setRequestType('foo')
        
        expect(builder.getRequestType()).to.equal('foo')
    });

    it('should set the config', () => {
        RequestBuilder.config = {
            lambdaPath: 'bar',
            lambdaHandler: 'baz',
            timeoutMs: 'qux'
        }

        const config = RequestBuilder.config

        expect(config.lambdaPath).to.equal('bar')
        expect(config.lambdaHandler).to.equal('baz')
        expect(config.timeoutMs).to.equal('qux')
    });

});



describe('Client', () => {
    it('should send the request and return the launch response', async() => {
        const config = {
            lambdaPath: path.join(__dirname, '/helpers', '/helloworld.js'),
        }

        const response = await Client.send(LaunchRequest, config, true)
        expect(response.response.outputSpeech.ssml).to.equal('<speak>Hello World!</speak>')

    });
});

describe('LaunchRequestBuilder', () => {
	 it('should generate a LaunchRequest', async() => {
        const builder = new LaunchRequestBuilder();

        expect(builder.getRequestType()).to.equal('LaunchRequest')
    });


    it('should send the launch request', async() => {
        const request = new LaunchRequestBuilder();
        var config = {
            lambdaPath: path.join(__dirname, '/helpers', '/helloworld.js')
        }


        const response = await Client.send(request, config, true)
        expect(response.response.outputSpeech.ssml).to.equal('<speak>Hello World!</speak>')

    });

});

describe('IntentRequestBuilder', () => {
    it('should generate an IntentRequest', async() => {
        const builder = new IntentRequestBuilder('foo');

        expect(builder.getRequestType()).to.equal('IntentRequest')
    });


    it('should set the intent name', async() => {
        const builder = new IntentRequestBuilder('foo');

        expect(builder.getIntentName()).to.equal('foo')
    });

});