'use strict';
// https://expressjs.com/en/4x/api.html#express.router
const router = require('express').Router();

const setDevice = require('./mobile-detect');
const csrfProtection = require('./csrf-protection');
const localization = require('./localization');
const fingerprint = require('./fingerprint');
const authenticate = require('./authenticate');
const accessLogs = require('./access-logs');

router.use(setDevice, csrfProtection, localization, fingerprint, authenticate, accessLogs);

module.exports = router;
