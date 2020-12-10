const User = require('../models/userModel')

/**
 *  @desc    Complete article
 *  @router  POST /api/article 
 */
exports.completeArticle = async (req,res) => {
    
    const userId = req.user._id
    const article = req.body.article

    let newArticle = {
        course: article.course,
        name:article.name,
        articleId: article.articleId,
        score: article.score,
    }
    
    let found = await User.findOne(
        { "_id":userId, 
        completedArticles: { 
            $elemMatch : {
                articleId: newArticle.articleId ,
            }
        }
    })

    if(found){
        await User.updateOne(
            { "_id": userId,"completedArticles.articleId": newArticle.articleId},
            {"$set": { 
                "completedArticles.$.score": newArticle.score,
                "completedArticles.$.name": newArticle.name
            }},
        )  
        return res.status(200).json({msg:'Article updated succesfully',data:newArticle})
    }else{
        let result = await User.updateOne(
            { "_id": userId},
            { $push: { "completedArticles": newArticle }}
        )         
        return res.status(200).send({msg:'Article created succesfully',data:newArticle})
    }     
}


exports.deleteArticles = async (req,res) => {
    console.log('deleting')
    const userId = req.user._id
    let result = await User.updateOne(
        {_id:userId},
        {"$set": { 
            "completedArticles": [],
        }}
    )
    return res.status(200)
    console.log(result)
}