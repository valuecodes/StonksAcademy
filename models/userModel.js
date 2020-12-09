const mongoose = require('mongoose')

const completedArticlesSchema = new mongoose.Schema({
    section:{type: String, required: true},
    articleId:{type: String, required: true},
    correct:{type: Number, default:0,required: true},
    wrong:{type: Number, default:0,required: true},
    notAnswered:{type: Number, default:0,required: true},
    total:{type: Number, default:0,required: true},
},{
    timestamps:true
})

const userSchema = new mongoose.Schema({
    googleId:{type: String, required: true},
    name:{type: String, required: true},
    email:{type: String, required:true, unique: true},
    isAdmin:{type: Boolean, default: false, required: true},
    score:{type: Number, default:0},
    completedArticles:[completedArticlesSchema],
},{
    timestamps: true
})

const User = mongoose.model("User",userSchema)

module.exports = User