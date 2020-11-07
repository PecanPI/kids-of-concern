
const express = require('express');

const bodyParser = require('body-parser')
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();
const port = 3000;
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session')
const cookieParser = require("cookie-parser")





app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

//Flash Middleware

app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.use(flash());


app.set("veiw engine", "ejs")


app.get("/", (req, res) => {

    res.sendFile(__dirname + '/index.html');
});


app.post("/mail-sign-up", (req, res) => {
    console.log(req.body);
    res.render('/', { messages: req.flash('info', 'Flash is Back!') });
    const email = req.body.email;

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