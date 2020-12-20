const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const passport = require('passport')
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())

require('./config/passport')(passport)
connectDB()
app.use(passport.initialize())

const authRoute = require('./routes/authRoute');
const courseRoute = require('./routes/courseRoute')

app.use('/auth', authRoute);
app.use('/api/course',courseRoute)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server started on ${PORT}`))