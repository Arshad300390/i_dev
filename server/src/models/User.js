const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
 name: String,
 phoneNumber: String,
 profileImage: {
    type: String,
    default: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.1092583097.1727856068&semt=ais_hybrid&w=740'
 },
 about: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
