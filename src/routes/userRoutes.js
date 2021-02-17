const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

const User = require('../model/userModel')

router.post('/api/signUp',
    [
        body("name")
            .isString()
            .withMessage("Please provide a Name"),
        
        body("email")    
            .isString()
            .withMessage("Please provide a Valid Email !!"),

        body("password")
            .trim()
            .isLength({ min: 8, max: 16 })
            .withMessage("Please enter your Password !!")
    ],

    async (req, res) => {
        const errors = validationResult(req);

        try{
            if(!errors.isEmpty()){
                return res.sendStatus(400).send(errors.array());
            }

            const { name, email, password } = req.body;

            const userExists = await User.findOne({ email });    
            
            if(userExists){
                console.log('Email in Use !!')
                return res.sendStatus(400).send("Email Already in use !!");
            }
            
            const user = User.buildUser({ name, email, password });

            await user.save();

            const token = await generateJWTToken();

            console.log(user);
            res.sendStatus(201).send(user);
        }
        
        catch(error) {
            console.log(error);
        }
    }
) 

module.exports = router;