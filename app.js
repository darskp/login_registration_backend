const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
mongoose.set('strictQuery', false);
const User = require('./models/users');

//middlewares
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));
// cors ///between two origin - to share resources
app.use(cors()); //cors origin resource sharing

app.post('/signup', async (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, userdata) => {
        if (userdata) {
            res.send({
                message: 'Seems like you already have an account with this email id'
            })
        } else {
            const data = new User({
                name: req.body.name,
                phonenumber: req.body.phonenumber,
                email: req.body.email,
                password: req.body.password,
            })
            // try {
            //     data.save()
            //     res.send({
            //         message: "User registered successfully"
            //     })
            // } catch (err) {
            //     res.send(err)
            // }

            data.save(() => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({message: "User registered successfully"})
                }
            })
        }
    })
})

const dburl = 'mongodb://localhost:27017/foodie'
mongoose.connect(dburl).then(() => {
    console.log('Connection established');
})

const port = 4000;
app.listen(port, 'localhost', () => {
    console.log(`http://localhost:${port}`);
})