const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {sign} = require('jsonwebtoken')
const {Op} = require('sequelize');
const {Users} = require('../models');
const {validateToken} = require("../middlewares/AuthMiddleware");
// validate a token for authentification purpose
router.get("/token",validateToken,(req,res) => {
    res.json(req.user);
})
//fetch all data
router.get("/", async (req,res) => {
    const listOfUsers = await Users.findAll();
    res.status(200).json(listOfUsers);
});

// fetch single element by id
router.get("/:id", async (req,res) => {
    const listOfUsers = await Users.findOne({where:{userId : req.params.id}});
    res.status(200).json(listOfUsers);
});

// insert a new user into the Users table
router.post("/sinUp", async (req, res) =>{
    const {username, password} = req.body;
    try {
        const user = await Users.findOne({where: {username : username}});
        if(user) return res.json({status: "failed", error : "User already Exist"});
        const hash = await bcrypt.hash(password,10);
        const newUser = await Users.create({
            username : username,
            password : hash
        });
        const accessToken = sign({
            userId : newUser.id,
            username : newUser.username
        },"CrudSecretKeyForJsonWebToken"); // later i'll choose another secret word
        res.json({username : newUser.username, userId : newUser.id, token : accessToken});
    } catch (error) {
        res.json({status: "failed", message : error.message });
    }
});

// find a by its username for login purpose
router.post("/login",async (req,res) => {
    const {username, password} = req.body;
    try{
        const user = await Users.findOne({where: {username : username}});
        if(!user) return res.json({status: "failed", error : "User Doesn't Exist"});
        bcrypt.compare(password, user.password).then((match) =>{
            if(!match) return res.json({status: "Failed", error : "Wrong Username and Password combination"});
            const accessToken = sign({
                userId : user.id,
                username : user.username
            },"CrudSecretKeyForJsonWebToken"); // later i'll choose another secret word
            res.json({username : user.username, userId : user.id,token : accessToken});
        })
    }catch(error){
        res.json({status: "failed", message : error.message });
    }  
})


module.exports= router;