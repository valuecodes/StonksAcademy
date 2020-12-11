const express = require('express')
const router = express.Router()
const { isAuth } = require('../utils');
const { completeSection, deleteArticles } = require('../controllers/courseController')

router
    .route('/')
    .post(isAuth, completeSection)
    .delete(isAuth, deleteArticles)

module.exports = router