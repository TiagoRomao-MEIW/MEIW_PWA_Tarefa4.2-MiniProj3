const express = require('express');
let router = express.Router();
const AnimalController = require('../controllers/animal.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

/*  router.route('/')
.get(AuthController.checkAuth, AnimalController.get)
.post(AuthController.checkAuth, [body('name').isString(),
    body('group').isString(),
    body('description').isString(),
    body('level').isInt(),
    body('links.*.types').isAlpha(),
    body('links.*.url').isURL(),
    sanitizeBody('description').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
], AnimalController.create);   */

 router.route('/')
    .get(AnimalController.get)
    .post([body('name').isString(),
        body('group').isString(),
        body('description').isString(),
        body('level').isInt(),
        body('links.*.types').isAlpha(),
        body('links.*.url').isURL(),
        sanitizeBody('description').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], AnimalController.create);
    
router.route("/deactivate/:id")
    .put( [param("id").isMongoId()], AnimalController.deactivate);

router.route("/activate/:id")
    .put( [param("id").isMongoId()], AnimalController.activate);

router.route('/:id')
    .get( [param("id").isMongoId()], AnimalController.getOne)
    .put( [param("id").isMongoId()], AnimalController.update)
    .delete( [param("id").isMongoId()], AnimalController.delete);

module.exports = router;