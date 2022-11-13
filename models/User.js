const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ユーザーモデル
const UsersSchema = new Schema({
email: {
    type: String,
    index: true
},
password: String
});

module.exports = {
Users: mongoose.model('Users', UsersSchema),
};