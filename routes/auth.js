const express = require("express");
const authrouter = express.Router();
const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
} = require("../controllers/auth");
authrouter.get("/", getAllUsers);
authrouter.post("/", createUser);
authrouter.get("/:id", getSingleUser);
authrouter.patch("/:id", updateUser);
authrouter.delete("/:id", deleteUser);

module.exports = authrouter;