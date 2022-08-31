const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const uri =
  "mongodb+srv://root:root@cluster0.crkm4un.mongodb.net/Ecommerce?retryWrites=true&w=majority";
global.db = mongoose.createConnection(uri);

require("dotenv").config();
const cors = require("cors");

//
app.use(express.static(__dirname + "/uploads/"));
app.use(cookieParser());
app.use(
  cors({
    allowedHeaders: ["*"],
    exposedHeaders: ["*"],
    origin: "https://hackaton-final.netlify.app",
    headers: "*",
    preflightContinue: false,
    methods: "GET, POST, PUT, PATCH, POST, DELETE",
  })
);

app.use(bodyParser.json());

//--// User Routes \\--\\
const userRoutes = require("./Routes/userRoutes");
app.use("/user", userRoutes);

//--// Product Routes \\--\\
const productRoutes = require("./Routes/productRoutes");
app.use("/product", productRoutes);

//--// Cart Routes \\--\\
const cartRoutes = require("./Routes/cartRoutes");
app.use("/cart", cartRoutes);

//--// Review Routes \\--\\
const reviewRoutes = require("./Routes/reviewRoutes");
app.use("/review", reviewRoutes);

//--// Stripe Routes \\--\\
const stripeRoutes = require("./Routes/stripeRoutes");
app.use("/", stripeRoutes);

app.listen(port, () => console.log(`listening on ${port}`));
