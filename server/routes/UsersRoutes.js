const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken')
const {Op} = require('sequelize');
const {Users} = require('../models');

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
        bcrypt.hash(password,10).then((hash) => {
            Users.create({
                username : username,
                password : hash
            })
            res.status(201).json({status: "success", message: `user ${username} was add successfuly`});
        })
    } catch (error) {
        res.status(404).json({status: "failed", message : error.message });
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
                id : user.userId,
                username : user.username
            },"secret word"); // later i'll choose another secret word
            res.json(accessToken);
        })
    }catch(error){
        res.status(404).json({status: "failed", message : error.message });
    }
   
})
module.exports= router;