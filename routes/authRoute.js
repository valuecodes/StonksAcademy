const express = require('express')
const passport = require('passport')
const router = express.Router()
const { getToken, isAuth, loginLimiter } = require('../utils');
const User = require('../models/userModel')

/**
 *  @desc   Auth with Google
 *  @router  GET /auth/google 
 */
router.get('/google', 
  loginLimiter,
  passport.authenticate('google',{scope: ['profile', 'email']})
)

/**
 *  @desc    Google auth callback
 *  @router  GET /auth/google/callback
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
        session: false,
        failureRedirect: '/' 
    }),(req, res) => {
        let token = getToken(req.user)
        res.cookie('auth', JSON.stringify(token),{httpOnly: true, sameSite:'Strict' })
        return res.redirect('http://localhost:3000');
    }    
)

/**
 *  @desc    Returns user info
 *  @router  POST /auth/userInfo
 */
router.post("/userInfo", loginLimiter, isAuth, async (req, res) => {

    const userId = req.user._id
    const user = await User.findById(userId)

    if(user){
      const userInfo = {
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email,
        // completedSections:user.completedSections,
        score:user.score,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
      }
      res.json({
        success: true,
        msg: "User has successfully authenticated",
        userInfo,
      });
    }else{
      res.status(401).send({msg: 'User not found'})
    }
});

/**
 *  @desc    Logout user and clear cookies
 *  @router  POST /auth/logout
 */
router.post('/logout', (req, res) => {
  res.clearCookie('auth')
  res.clearCookie('userInfo')
  res.status(200).json({msg:'User Logged out'})
})

module.exports = router