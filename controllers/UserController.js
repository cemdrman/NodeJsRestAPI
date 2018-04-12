const express = require("express");
const router = express.Router();
const User = require("../models/User");

const  users = [
    {name : "cem",email:"cemdrman@gmail.com",password:"123456"},
    {name : "emir",email:"emir@gmail.com",password:"147"},
    {name : "nehir",email:"nehir@gmail.com",password:"2018"},
];

router.post("/save", (req,res) =>{
    
    const user = new User({
        name:     req.body.name,
        email:    req.body.email,
        password: req.body.password
    });
    users.push(user);
    console.log("User saved: " + user);
    res.json(user);

});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id,  (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

router.get(["","/list"], (req, res) => {
    res.json(users);
    console.log(users);
    /*User.find(function (err, user) {
        if (err) return console.error(err);
        console.log(user);
      });*/
});


// DELETES A USER FROM THE DATABASE
router.delete('/:id',  (req, res) => {
    User.findByIdAndRemove(req.params.id,  (err, user) =>  {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id',  (req, res) => {
    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

module.exports = router;