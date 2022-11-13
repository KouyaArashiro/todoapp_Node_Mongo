const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: [true, "回答を入力して下さい"],
        trim: true, //空白の削除
        maxlength: [140, "回答は140文字以内で入力して下さい"],
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