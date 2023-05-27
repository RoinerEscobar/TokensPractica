const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.get("/api",(req , res)=>{
    res.json({
        message: "Practica Node y JWT"
    })
});

app.post("/api/login",(req , res)=>{
    
    const user = {
        nombre : "henry",
        email : "henry@hotmail.com"
    }
    
    jwt.sign({user}, 'secretkey', (err, token)=>{
        res.json({
            token
        })
    })

});

app.post("/api/posts", verifyToken, (req , res)=>{ 
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                message: "Post fue creado",
                authData
            })
        }
    })
});

function verifyToken(req, res, next){

 const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000, function(){
   console.log("nodejstws is running...");
});