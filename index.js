const express = require('express');
const bodyParser = require('body-parser')
const { passport } = require('./security/security')
const { SESSION_SECRET } = require('./config')

const app = express();
const port = process.env.PORT || 5000;

const sessionOptions = { 
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}

app.use(require('express-session')(sessionOptions));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/public`));

app.use('/', require('./router'))
app.use('/api', require('./router'))

app.listen(port, () => console.log(`::: ${port}`))