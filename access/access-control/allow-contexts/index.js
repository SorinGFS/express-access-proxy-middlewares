'use strict';
// context based access control
const createError = require('http-errors');
// allow contexts
const allowContexts = (req, res, next) => {
    if (req.server.accessControl && req.server.accessControl.allowContexts) {
        req.server.fn.hasExactContextMatches(req, req.server.accessControl.allowContexts) ? next() : next(createError.Forbidden());
    }
    next();
}

module.exports = allowContexts;