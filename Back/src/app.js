const express = require("express");
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  
app.use(express.static('public'));


const router = require("./routes");
app.use("/", router);


module.exports = app;
