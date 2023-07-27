const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const {Products} = require('../models');

//fetch all data
router.get("/", async (req,res) => {
    const listOfProducts = await Products.findAll();
    res.status(200).json(listOfProducts);
});

//search by name
router.get("/search/:name", async (req,res) => {
    const searchName = req.params.name;
    const listOfProducts = await Products.findAll({
        where:{name : {
            [Op.like]: `${searchName}%`
        }},
        limit:15,
        offset: 0
    });
    res.status(200).json(listOfProducts);
});
// fetch single element by id
router.get("/:id", async (req,res) => {
    const listOfProducts = await Products.findOne({where:{id : req.params.id}});
    res.status(200).json(listOfProducts);
});

// insert a new element into the table
router.post("/", async (req, res) =>{
    try {
        const product = req.body;
        // to modify later with the real userId when the user login
        if(!product.UserId) product.UserId = 1;
        await Products.create(product);
        res.status(201).json(product);
    } catch (error) {
        res.status(404).json({status: "failed", message : error.message });
    }
});

// delete element from the table
router.delete("/:id", async (req, res) =>{
    const productId = req.params.id;
    Products.destroy({
        where: {
          id: productId
        }
    }).then((data) => {
        if (data === 0) {
         res.status(404).json({status: "failed", recordDeleted: data});
        }
        else{
            res.status(200).json({status: "sucess", recordDeleted: data});
        }
    }).catch((error) => {
        console.error('Failed to delete record : ', error);
        res.status(400).json({status: "failed", message : error.message });

    });
});

// update an element by its id
router.put("/:id", async (req, res) =>{
    const productId = req.params.id;
    console.log(req.body);
   const { name, unite_price, quantity } = req.body;
    Products.update({name : name, unite_price : unite_price, quantity : quantity},{
            where: {
                id: productId
              }
        }).then(() => {
        console.log("Successfully deleted record.")
        res.json({status: "success", message : "Successfully deleted record." });
    }).catch((error) => {
        console.error('Failed to delete record : ', error);
        res.json({status: "success", message : error.message });

    });
});
module.exports= router;