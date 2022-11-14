const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));
const PORT = 5001;

const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const { Strategy } = require('passport-local'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');

// const server = express();

// server.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index.html/'));
// });

// server.listen(PORT);

//ルーティング設計 
app.use("/api/v1/tasks", taskRoutes);
//DBと接続
const start = async () => {
    try {
        await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
            app.listen(process.env.PORT || PORT, console.log("server started"));
    } catch (err){
        console.log(err);
    }
}

start();