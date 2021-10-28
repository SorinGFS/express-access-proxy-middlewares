'use strict';
// this is a custom handler for errors created with http-errors plus internal errors
const handleError = (err, req, res, next) => {
    const { statusCode = 500, expose, message, stack, headers, ...rest } = err;
    // log server errors (app errors are NOT logged into db, you may implement your own solution here)
    if (req.server && req.server.errorLogs) {
        const log = {};
        if (Array.isArray(req.server.errorLogs)) {
            req.server.errorLogs.forEach((item) => (log[item] = req[item]));
            req.accessDb.getController('errors').then((db) => db.insertOne({ time: new Date(), ...log }));
        } else {
            req.accessDb.getController('errors').then((db) => db.insertOne({ time: new Date(), ip: req.ip, ips: req.ips, method: req.method, protocol: req.protocol, hostname: req.hostname, url: req.url, message: message }));
        }
    }
    if (headers) res.set(headers);
    if (!expose && message && process.env.NODE_ENV === 'development') console.log(message, stack);
    if (!expose) return res.status(statusCode).end();
    return res.status(statusCode).json({ statusCode, message, ...rest });
};

module.exports = handleError;