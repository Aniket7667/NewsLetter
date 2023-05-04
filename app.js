const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https"); 

const app = express();
// const LIST_ID = "605744cda3"; 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",(req,res)=>{

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    // res.send("<h1>Please Check the console</h1>");

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed", 
                merge_fields : {  FNAME: fname,LNAME: lname}
            }
        ]
    }

    let jsonData = JSON.stringify(data);
    const url = 'https://us21.api.mailchimp.com/3.0/lists/605744cda3'

    const options = {
         method: "POST",
         auth: "Aniket:4b8f94c6b98e121c241e4f15776e4da2-us21"
    }

    const requestSaved = https.request(url, options, (response)=>{
        
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else 
        res.sendFile(__dirname+"/failure.html");
        
        response.on("data", (datad)=>{
            // console.log(JSON.stringify(datad));
        })
    });

    requestSaved.write(jsonData);
    console.log(requestSaved)
    requestSaved.end();
});


app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running at 3000");
}); 

// const API_KEY = "4b8f94c6b98e121c241e4f15776e4da2-us21";
// 605744cda3