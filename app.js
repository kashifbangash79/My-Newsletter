//jshint esversion: 6
const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const https = require('https');

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName

            }
        }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/4beeab277e";

    const options = {
        method: "POST",
        auth:"kashifkhankk799872@gmail.com:325a99c39a0b1c823dfe0ac73a62a6f7-us17"
    }

    const request = https.request(url, options, function (response) {


        if(response.statusCode == 200)
            {
                res.sendFile(__dirname + "/success.html")
            }
            else
            {
                res.sendFile(__dirname + "/failure.html")
            }
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })


    request.write(jsonData);
    request.end();

})


app.listen(process.env.PORT || 3000, function () {
    console.log('server is running on port number 3002')

})
