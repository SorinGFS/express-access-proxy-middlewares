'use strict';
// http://expressjs.com/en/4x/api.html#router.route
const router = require('express').Router();

const csrfProtection = require('./csrf-protection');
const fingerprint = require('./fingerprint');
const setDevice = require('./mobile-detect');
const authenticate = require('./authenticate');
const accessLogs = require('./access-logs');

router.use(setDevice, csrfProtection, fingerprint, authenticate, accessLogs);

module.exports = router;
