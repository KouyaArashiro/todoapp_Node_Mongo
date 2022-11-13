const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    //タスクの名前
    answer: {
        type: String,
        trim: true, //空白の削除
    },
    question: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    date: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model("Task", TaskSchema);