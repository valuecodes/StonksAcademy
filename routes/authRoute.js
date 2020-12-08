const express = require('express')
const passport = require('passport')
const router = express.Router()
const { getToken, isAuth } = require('../utils');

/**
 *  @desc   Auth with Google
 *  @router  GET /auth/google 
 */
router.get('/google', 
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
        let user = {
          name:req.user.name,
          email:req.user.email,
          isAdmin:req.user.isAdmin,
          token:getToken(req.user),
        }
        res.cookie('auth', JSON.stringify(user),{httpOnly: true, sameSite:'Strict' })
        return res.redirect('http://localhost:3000');
    }    
)

/**
 *  @desc    Login success returning user info httoOnly cookie is provided
 *  @router  POST /auth/login/success
 */
router.post("/login/success", (req, res) => {
    if (req.cookies.auth) {
      const cookie= JSON.parse(req.cookies.auth)
      const user = {
        name: cookie.name,
        isAdmin:cookie.isAdmin,
        email:cookie.email
      }
      res.json({
        success: true,
        msg: "User has successfully authenticated",
        user,
      });
    }else{
      res.status(401).send({msg: 'No user authentication provided'})
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