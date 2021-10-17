'use strict';
// http://expressjs.com/en/4x/api.html#router.route
const router = require('express').Router();

const csrfProtection = require('./csrf-protection');
const fingerprint = require('./fingerprint');
const setDevice = require('./mobile-detect');
const setUser = require('./set-user');
const accessLogs = require('./access-logs');

router.use(setDevice, csrfProtection, fingerprint, setUser, accessLogs);

module.exports = router;
