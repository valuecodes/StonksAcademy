const User = require('../models/userModel')

/**
 *  @desc    Complete section of a course
 *  @router  POST /api/course 
 */
exports.completeSection = async (req,res) => {
    
    const userId = req.user._id
    const section = req.body.section
   
    let newSection = {
        course: section.course,
        name:section.name,
        sectionId: section.sectionId,
        score: section.score,
    }
    
    let found = await User.findOne(
        { "_id":userId, 
        completedSections: { 
            $elemMatch : {
                sectionId: newSection.sectionId ,
            }
        }
    })
    console.log(found,newSection)
    if(found){
        await User.updateOne(
            { "_id": userId,"completedSections.sectionId": newSection.sectionId},
            {"$set": { 
                "completedSections.$.score": newSection.score,
                "completedSections.$.name": newSection.name
            }},
        )  
        return res.status(200).json({msg:'Article updated succesfully',data:newSection})
    }else{
        let result = await User.updateOne(
            { "_id": userId},
            { $push: { "completedSections": newSection }}
        )         
        return res.status(200).send({msg:'Article created succesfully',data:newSection})
    }     
}

/**
 *  @desc    Resets user completed sections
 *  @router  DELETE /api/course 
 */
exports.deleteArticles = async (req,res) => {
    console.log('deleting')
    const userId = req.user._id
    let result = await User.updateOne(
        {_id:userId},
        {"$set": { 
            "completedSections": [],
        }}
    )
    return res.status(200)
    console.log(result)
}


/**
 *  @desc    Get user completed sections
 *  @router  GET /api/course/completed 
 */
exports.getCompletedSections = async (req,res) => {
    console.log('getting user',req.user)

    const userId = req.user._id
    const user = await User.findById(userId)
    if(user){
        console.log(user)
        res.status(200).send({data:user.completedSections})
    }else{
        res.status(401).send({msg: 'User not found'})
    }
}