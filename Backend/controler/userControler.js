 // in this file import userModal 
 // then  create addUser function and export it
 // in the function create new userModal and save it to the database
 
 const UserModal = require('../secma/userSema.js')

 // ----------- ADD USER -----------
exports.addUser = async(req , res) => {
    const user1 = req.body;
    console.log(user1)
    const newUser =new UserModal(user1);
    try{
        await newUser.save();
        console.log("user added to the database");
        // res.send(newUser);
        res.status(201).json(newUser)

    } catch (err){
        console.log(err.message);

    }
}
// module.exports = addUser;

// ----------- GET ALL USERS -----------
exports.getUsers = async(req , res) => {
    
    try{
        const users = await UserModal.find();
        console.log("all User Get" ,users)
        res.status(200).json(users)
        

    } catch (err){
        console.log("get requt field from mongodb",err.message);


    }
} 

// ----------- GET USER BY ID  or EDIT -----------
exports.getUserById = async(req , res) => {
    const eid = req.params.id;
    console.log(eid);
    try{
        const user = await UserModal.find({_id: eid});
        console.log("User get Data From Id")
        res.status(200).json(user)
        

    } catch (err){
        console.log("get requt field from mongodb",err.message);
}}

// ----------- SAVE USER -----------
exports.saveUser = async(req , res) => {
    const eid = req.params.id;
    const user = req.body;
    const editUser = new UserModal(user);
    console.log(user)
    try{
        const userE = await UserModal.updateOne({_id: eid},editUser);
        console.log("User update save")
        res.status(200).json(userE)
        

    } catch (err){
        console.log("get requt field from mongodb",err.message);
}
}


// ----------- DELETE USER -----------
exports.deleteUser = async(req , res) => {
    const eid = req.params.id;
    try{
        const user = await UserModal.deleteOne({_id: eid});
        console.log("User delete")
        res.status(200).json(user)
        

    } catch (err){
        console.log("get requt field from mongodb",err.message);
}
}