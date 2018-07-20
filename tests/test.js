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