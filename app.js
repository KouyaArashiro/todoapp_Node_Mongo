const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
const PORT = 5001;

//ルーティング設計 
app.use("/api/v1/tasks", taskRoutes);

//DBと接続
const start = async () => {
    try {
        await connectDB(
            "mongodb+srv://kouya:test@cluster0.8zylzhp.mongodb.net/?retryWrites=true&w=majority"
            );
            app.listen(PORT, console.log("server started"));
    } catch (err){
        console.log(err);
    }
}

start();