const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
// const MongoDBSession = require('connect-mongodb-session')(session),
// const mongoose = require('mongoose')
const cors = require('cors');
const accessRouter = require('./src/routes/access.routes');
// const accountRouter = require('./src/routes/account.routes')
require('dotenv').config()


//Session middleware
app.use(sessions({
  name: 'kapipay-session',
  secret: ['k@pip@y2021'],
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false,
  saveUninitialized: true,
}))
//cookie parser middleware
app.use(cookieParser());

//Template Engine
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/imgs', express.static(__dirname + 'public/imgs'));
app.use('/js', express.static(__dirname + 'public/js'));
// app.set('views', __dirname + 'src/views')

//Set Views
app.set('views', './src/views');
app.set('view engine', 'ejs');



//Routes
app.use('/', accessRouter);
// app.use('/account', accountRouter);





const PORT = process.env.APP_PORT || 5051
app.listen(PORT, () => {
  (console.log(`👾 Server running at port: ${PORT}`))
})