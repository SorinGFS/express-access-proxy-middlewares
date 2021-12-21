'use strict';
// log access into access.logs db
const accessLogs = async (req, res, next) => {
    if (req.server.accessLogs) {
        const log = {};
        const start = req.start;
        log.app = process.env.APP_NAME;
        if (req.server.fingerprint) log.fingerprintHash = req.fingerprint.hash;
        if (Array.isArray(req.server.accessLogs)) {
            req.server.accessLogs.forEach((item) => (log[item] = req[item]));
        }
        req.on('end', () => {
            req.accessDb.controller('logs').insertOne({ time: new Date(start), durationMs: new Date().getTime() - start, ...log });
        });
    }
    next();
};

module.exports = accessLogs;
