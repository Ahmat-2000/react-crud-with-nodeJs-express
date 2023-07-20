const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json()) // pour que express parse les données reçu avec post sur format json

app.use(cors());

// models of our tables
const db = require('./models');
// Routers
const productsRouter = require('./routes/ProductsRoutes')
app.use("/products", productsRouter); // pour utiliser nos routes

db.sequelize.sync().then(() => {
    app.listen(3003,() =>{
        console.log("server runing on port 3003...");
    });
});
