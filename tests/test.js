import { expect } from 'chai'
import { RequestBuilder } from '../index'

describe('RequestBuilder', () => {
    it('should set the version', () => {
        const builder = new RequestBuilder()
        // Defaults to 1.0
        expect(builder.getVersion()).to.be.equal('1.0')
        // Change version
        builder.setVersion('2.0')

        expect(builder.getVersion()).to.be.equal('2.0')
    });

    it('should set new session', () => {
        const builder = new RequestBuilder()
        // Default's to true
        expect(builder.getIsNewSession()).to.be.true

        builder.setIsNewSession(false)

        expect(builder.getIsNewSession()).to.be.false
    });


    it('should set the session id to the passed param', () => {
        const builder = new RequestBuilder()
        // Change session Id
        builder.setSessionId('foo')

        expect(builder.getSessionId()).to.equal('foo')
    });


    it('should set the locale', () => {
        const builder = new RequestBuilder()
        // Default's to en-US
        expect(builder.getLocale()).to.be.equal('en-US')
        // Change locale
        builder.setLocale('en-GB')
        // get request
        expect(builder.getLocale()).to.be.equal('en-GB')
    });
});