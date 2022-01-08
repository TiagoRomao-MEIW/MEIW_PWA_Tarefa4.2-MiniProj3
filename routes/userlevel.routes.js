const express = require('express');
let router = express.Router();
const UserLevelController = require('../controllers/userlevel.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post( [body('name').isString(),
        body('level').isNumeric(),
        body('avatar').isString(),
        body('max').isNumeric()
    ], UserLevelController.create)
    .get( UserLevelController.get);

router.route('/:id')
    .get( [param("id").isMongoId()], UserLevelController.getOne)
    .put( [param("id").isMongoId()], UserLevelController.update)
    .delete( [param("id").isMongoId()], UserLevelController.delete);

module.exports = router;