require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();
const port = 3000;
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require("cookie-parser")




app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.set("view engine", "ejs")

//Flash Middleware

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000, }
}))
app.use(flash());

app.get("/", (req, res) => {
    // console.log(req.flash('success_message'), test);
    res.render('index', {
        success_message: req.flash('success_message'),
        failure_message: req.flash('failure_message')
    })
});


app.post("/", (req, res) => {
    const email = req.body.email;
    req.flash('success_message','test message')
    res.redirect('/#newsletter')
    const data = {
        member: [{
            email_address: email,
            status: 'subscribed',
        }]
    };
    const jsonData = JSON.stringify(data);

    mailchimp.setConfig({
        apiKey: '',
        server: '',
    })

    const listID = ''

    const options = {
        url: 'https://' + '' + '.api.mailchimp.com/3.0/lists/' + '',
        method: 'POST',
        headers: {
            Authorization: 'atuh:' + '',
        },
        body: jsonData,
    }

    const run = async () => {
        const respose = await mailchimp.lists.batchListMembers(listID, {
            memebers: [{
                email_address: email,
                status: 'subscribed'
            }],
        }).then(responses => {
            console.log(responses.error_count);
            if (responses.error_count < 1) {
                res.jsonp({ succes: true })
            } else {

            }
        })
    }
});


app.listen(port, () => {
    console.log('Running on server on port 3000')
});