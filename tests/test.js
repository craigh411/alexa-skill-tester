import { expect } from 'chai'
import { RequestBuilder } from '../index'

describe('RequestBuilder', function() {
    it('should set the version', function() {
        const builder = new RequestBuilder()
        // Default's to 1.0
        expect(builder.getVersion()).to.be.equal('1.0')
        // Change version
        builder.setVersion('2.0')

        expect(builder.getVersion()).to.be.equal('2.0')
    });

    it('should set new session', function() {
        const builder = new RequestBuilder()
        // Default's to true
        expect(builder.getIsNewSession()).to.be.true

        builder.setIsNewSession(false)

        expect(builder.getIsNewSession()).to.be.false
    });


    it('should set the session id to the passed param', function() {
        const builder = new RequestBuilder()
        // Change session Id
        builder.setSessionId('foo')

        expect(builder.getSessionId()).to.equal('foo')
    });


    it('should set the locale', function() {
        const builder = new RequestBuilder()
        // Default's to en-US
        expect(builder.getLocale()).to.be.equal('en-US')
        // Change locale
        builder.setLocale('en-GB')
        // get request
        expect(builder.getLocale()).to.be.equal('en-GB')
    });
});