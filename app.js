const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require("cors")

const app = express();
const port = 4000;
app.use(cors())

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/formProject', { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);


app.post('/submitForm', async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        
        const newUser = new User({ firstName, lastName, email, password });

        
        await newUser.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
