const express = require("express")
const axios  =  require("axios")
const bodyParser = require("body-parser")
const app =  express();
const cors = require('cors');
app.use(cors())
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    return res.status(200).json({message: "welcome to online compiler"})
})

app.get("/getOutput",(req,res)=>
{
    console.log("reaced")
    const client_id = "9cbbcc66bf3d559a97587fd08757726b";
    const client_secret = "93ec9c0785b4a46b3016e7bd41aa2f5f77323a375fba91e975aff8c0539f28a4";
    const code = req.query.code;
    const language = req.query.language;
    console.log(code,language)
    var program = {
        script : code,
        language:language,
        versionIndex: "0",
        clientId: client_id,
        clientSecret:client_secret
    };

    axios.post('https://api.jdoodle.com/v1/execute', program)
    .then(response => {
      console.log(response.statusCode);
      return res.status(200).json({data:response.data})
    })
    .catch(error => {
       console.log(error)
    });
})

app.listen(port,(req,res)=>{
    console.log("server is running");
})