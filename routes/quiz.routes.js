const express = require('express');
let router = express.Router();
const QuizController = require('../controllers/quiz.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get( QuizController.get)
    .post( [body('name').isString(),
        body('points').isInt(),
        body('level').isInt(),
        body('questions.*').isMongoId()
    ], QuizController.create);

router.route("/deactivate/:id")
    .put( [param("id").isMongoId()], QuizController.deactivate);

router.route("/activate/:id")
    .put( [param("id").isMongoId()], QuizController.activate);

router.route('/:id')
    .get( [param("id").isMongoId()], QuizController.getOne)
    .put( [param("id").isMongoId()], QuizController.update)
    .delete( [param("id").isMongoId()], QuizController.delete);

module.exports = router;