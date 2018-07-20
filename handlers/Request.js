const lambdaLocal = require('lambda-local');
import path from 'path'
import winston from 'winston'
import RequestBuilder from '../requests/RequestBuilder'

class Request {
    static async send(request, config, suppressConsoleOutput = false, logFile = null) {
        // Allow us to send requests to file and or suppress them from the console.
        if (!!logFile || suppressConsoleOutput) {
            this.setLogger(suppressConsoleOutput, logFile)
        }

        request = (request instanceof RequestBuilder) ? request.getRequest() : request
        config = Object.assign(this.getDefaultConfig(), config)

        return await new Promise((resolve, reject) => {
            lambdaLocal.execute({
                event: request,
                lambdaPath: config.lambdaPath,
                lambdaHandler: config.lambdaHandler,
                timeoutMs: config.timeoutMs
            }).then(done => {
                resolve(done)
            }).catch(err => {
                reject(err)
            });
        });
    }

    static setLogger(suppress, file) {

        var transports = []

        if (!suppress) transports.push(new(winston.transports.Console)())
        if (!!file) transports.push(new(winston.transports.File)({ filename: file }))


        lambdaLocal.setLogger(new(winston.Logger)({
            transports: transports
        }));
    }

    static getDefaultConfig() {
    	return {
            lambdaPath: '../../../index.js', // this is probably the root, but it can be overridden
            lambdaHandler: 'handler',
            timeoutMs: 3000,
    	}
    }
}


export default Request