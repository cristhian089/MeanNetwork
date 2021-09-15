const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const Post = require("./routes/post");
const User = require("./routes/user");
const Role = require("./routes/role");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/post",Post);
app.use("/api/user",User);
app.use("/api/role", Role);
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT,()=>console.log("Backend server running on port: ", process.env.PORT));

dbConnection();