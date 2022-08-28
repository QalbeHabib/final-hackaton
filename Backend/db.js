const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://root:root@cluster0.kixs5sl.mongodb.net/userData?retryWrites=true&w=majority").then(()=>{
    console.log("connectrd to the database");
}).catch(err =>{
    console.log('err', err)
})



