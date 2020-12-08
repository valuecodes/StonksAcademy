const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

// router
//     .route('/createadmin')
//     .get(createAdmin)

router.get("/createadmin", async (req,res) =>{
    try{
        const user = new User({
            name:'Juha',
            email:'juhakangas55@gmail.com',
            password: 1234,
            isAdmin: true
        })
        const newUser = await user.save()
        console.log('Admin created')
        res.send(newUser)
    } catch(err){
        console.log(err)
        res.send({msg:err.message})
    }
})

module.exports = router
