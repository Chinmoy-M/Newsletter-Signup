const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.FN;
  const lastName  = req.body.LN;
  const email = req.body.email;

  const data = {
    members : [
      {
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

  const url = "https://us13.api.mailchimp.com/3.0/lists/13647911d0"

  const options = {
    method: "POST",
    auth: "chinmoy:f38f39efef469a18c24f8e952801d52c-us13"
  }

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data){
      //console.log(JSON.parse(data));

    })
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000!");
});


// API Key
// 757fb12f23913e0b1826dadb5facb4c4-us13
// f38f39efef469a18c24f8e952801d52c-us13

//List id
// 13647911d0
