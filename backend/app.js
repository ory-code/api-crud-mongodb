const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/users");
const path = require("path")
const mongoose = require("mongoose");


mongoose
    .connect(
        "mongodb+srv://userprojet6:saucepiquante@cluster0.wqhwa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log("Requête reçue !");
    next();
});

app.use("/api/sauces", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;