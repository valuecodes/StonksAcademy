const express = require('express')
const router = express.Router()
const { isAuth } = require('../utils');
const { completeArticle, deleteArticles } = require('../controllers/articleController')

router
    .route('/')
    .post(isAuth, completeArticle)
    .delete(isAuth, deleteArticles)

module.exports = router