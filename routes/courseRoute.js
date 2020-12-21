const express = require('express')
const router = express.Router()
const { isAuth, courseLimiter } = require('../utils');
const { completeSection, deleteArticles } = require('../controllers/courseController')

router
    .route('/')
    .post(courseLimiter, isAuth, completeSection)
    .delete(courseLimiter, isAuth, deleteArticles)

module.exports = router