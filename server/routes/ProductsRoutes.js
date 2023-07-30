const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Products} = require('../models');
const {validateToken} = require("../middlewares/AuthMiddleware");
//fetch all data
router.get("/", validateToken, async (req,res) => {
    const listOfProducts = await Products.findAll({where : {userId : req.user.userId}});
    res.json(listOfProducts);
});

//search by name
router.get("/search/:name", validateToken,async (req,res) => {
    const searchName = req.params.name;
    const user = req.user.userId;
    const listOfProducts = await Products.findAll({
        where:{name : {
            [Op.like]: `${searchName}%`
        },UserId : user},
        // limit:15,
        offset: 0
    });
    res.json(listOfProducts);
});
// fetch single element by id
/* router.get("/:id", async (req,res) => {
    const listOfProducts = await Products.findOne({where:{id : req.params.id}});
    res.json(listOfProducts);
}); */

// insert a new element into the table
router.post("/", validateToken,async (req, res) =>{
    try {
        // the user id is provided by the requeste in req.user.userId
        const product = {...req.body, UserId : req.user.userId};
        await Products.create(product);
        res.json({status: "success", message : "THE PRODUCT WAS CREATED SUCCESSFULLY" });
    } catch (error) {
        res.json({status: "failed", message : error.message });
    }
});

// delete element from the table
router.delete("/:id", validateToken,async (req, res) =>{
    const productId = req.params.id;
    console.log(`id = ${productId}`)
    Products.destroy({
        where: {
          id: productId
        }
    }).then((data) => {
        if (data === 0) {
         res.json({status: "failed", message : "THE PRODUCT(S) WAS NOT DELETED" });
        }
        else{
            res.json({status: "sucess", message : "THE PRODUCT(S) WAS DELETED" });
        }
    }).catch((error) => {
        res.json({status: "failed", message : error.message });
    });
});

// update an element by its id
router.put("/:id",validateToken, async (req, res) =>{
    const productId = req.params.id;
    const { name, unite_price, quantity } = req.body;
    Products.update({name : name, unite_price : unite_price, quantity : quantity},{
        where: {
            id: productId
        }
    }).then(() => {
        res.json({status: "success", message : "THE PRODUCT WAS UPDATED SUCCESSFULLY" });
    }).catch((error) => {
        res.json({status: "failed", message : error.message });
    });
});
module.exports= router;