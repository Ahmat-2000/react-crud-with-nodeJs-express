const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json()) // pour que express parse les données reçu avec post sur format json

app.use(cors());

// models of our tables
const db = require('./models');
// Routers
const productsRouter = require('./routes/ProductsRoutes');
const usersRouter = require('./routes/UsersRoutes');
app.use("/products", productsRouter); // pour utiliser nos routes
app.use("/users", usersRouter); // pour utiliser nos routes

// Before running the server, sequelize make some checks to update the database
db.sequelize.sync().then(() => {
    app.listen(3003,() =>{
        console.log("server runing on port 3003...");
    });
});
