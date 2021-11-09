const express = require('express');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const MongoDBStore = require('connect-mongodb-session')(session)
require('dotenv').config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
})

const accessRouter = require('./src/routes/access.routes');
const accountRouter = require('./src/routes/account.routes')

// CONNECT SESSIONS DB
const connectDB = require("./src/config/db");
const mongoURI = process.env.DATABASE_URL;

const app = express();
connectDB()
const cors = require('cors');

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "mysessions",
})


//Session middleware
app.use(session({
  name: "kapi-session",
  secret: [`${process.env.SESSION_SECRET}`],
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false,
  saveUninitialized: false,
  store: store,
}))

// // Cookie parser middleware
// app.use(cookieParser());

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
app.use('/account', accountRouter);


const PORT = process.env.APP_PORT || 5051
app.listen(PORT, () => {
  (console.log(`👾 Server running at port: ${PORT}`))
})