const express = require('express');
let router = express.Router();
const SponsorController = require('../controllers/sponsor.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        body('animals').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('animals').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], SponsorController.create)
    .get( SponsorController.get);

router.route('/:id')
    .get( [param("id").isMongoId()], SponsorController.getOne)
    .put( [param("id").isMongoId()], SponsorController.update)
    .delete( [param("id").isMongoId()], SponsorController.delete);

module.exports = router;