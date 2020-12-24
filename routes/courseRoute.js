const express = require('express')
const router = express.Router()
const { isAuth, courseLimiter } = require('../utils');
const { completeSection, deleteCompletedSections, getCompletedSections } = require('../controllers/courseController')

router
    .route('/')
    .post(courseLimiter, isAuth, completeSection)
    .delete(courseLimiter, isAuth, deleteCompletedSections)

router
    .route('/completed/:id?')
    .get(courseLimiter, isAuth, getCompletedSections)

module.exports = router