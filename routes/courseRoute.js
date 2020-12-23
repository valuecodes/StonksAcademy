const express = require('express')
const router = express.Router()
const { isAuth, courseLimiter } = require('../utils');
const { completeSection, deleteArticles, getCompletedSections } = require('../controllers/courseController')

router
    .route('/')
    .post(courseLimiter, isAuth, completeSection)
    .delete(courseLimiter, isAuth, deleteArticles)

router
    .route('/completed')
    .get(courseLimiter, isAuth, getCompletedSections)

module.exports = router