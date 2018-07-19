import {expect} from 'chai'
import { RequestBuilder } from '../index'

describe('RequestBuilder', function() {
    it('should set the locale', function() {
		const builder = new RequestBuilder()
		// Default's to en-US
		expect(builder.getRequest().request.locale).to.be.equal('en-US')
		// Change locale
		builder.setLocale('en-GB').getRequest()
		// get request
		expect(builder.getRequest().request.locale).to.be.equal('en-GB')
    });
});