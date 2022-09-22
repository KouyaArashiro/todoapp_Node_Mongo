const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    //タスクの名前
    name: {
        type: String,
        required: [true, "タスク名を入力して下さい"],
        trim: true, //空白の削除
        maxlength: [20, "タスク名は20文字以内で入力して下さい"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Task", TaskSchema);