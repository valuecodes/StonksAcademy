const express = require('express')
const router = express.Router()
const { isAuth } = require('../utils');
const { completeArticle } = require('../controllers/articleController')

router
    .route('/')
    .post(isAuth,completeArticle)

module.exports = router