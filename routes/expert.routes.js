const express = require('express');
let router = express.Router();
const ExpertController = require('../controllers/expert.controller');
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
    ], ExpertController.create)
    .get( ExpertController.get);

router.route('/:id')
    .get( [param("id").isMongoId()], ExpertController.getOne)
    .put( [param("id").isMongoId()], ExpertController.update)
    .delete( [param("id").isMongoId()], ExpertController.delete);

module.exports = router;