import express from 'express'
const router = express.Router()
import User from "../models/userModel.js";

router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const newUser = new User({username: username, name: name});

    newUser.save()
        .then(()=> res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;