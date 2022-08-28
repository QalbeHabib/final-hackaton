// In this code imort mongoose and the create userScema function from  db.js then make modle of the userSchema and export it.
const mongoose = require('mongoose');

const userScema = new mongoose.Schema({
    
    houseName: String,
    location: String,
    rooms: String,
    detail: String,
    squirFeet: String,
    price: String,
    
   
   
})

const user = mongoose.model('Users', userScema);

module.exports = user;

