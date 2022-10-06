const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));
const PORT = 5001;

//ルーティング設計 
app.use("/api/v1/tasks", taskRoutes);
//DBと接続
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
            app.listen(process.env.PORT || PORT, console.log("server started"));
    } catch (err){
        console.log(err);
    }
}

start();