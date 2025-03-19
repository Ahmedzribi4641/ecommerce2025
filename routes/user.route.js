const express = require('express');
const router = express.Router();
const User=require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer=require('nodemailer');


// var transporter =nodemailer.createTransport({
//     service:'gmail',
//     host:'smtp.gmail.com',
//     port:587,
//     secure:false,
//     auth:{
//     user:'zribi4641@gmail.com',
//     pass:'uucv riaf lohq vdzb'
//     },
//     })


var transporter =nodemailer.createTransport({
    service:'gmail',
    auth:{
    user:'zribi4641@gmail.com',
    pass:'uucv riaf lohq vdzb'
    },
    tls:{
    rejectUnauthorized:false
    }
    })

//Ajouter un utilisateur                   
router.post('/register',async(req,res)=>{
    try{
        let { email, password, firstname, lastname, avatar } = req.body
        const user = await User.findOne({ email })
        if (user) return res.status(404).send({ success: false, message: "User already exists" })

        const newUser = new User({ email, password, firstname, lastname, avatar })
        const createdUser = await newUser.save()



        // Envoyer l'e-mail de confirmation de l'inscription
        var mailOption ={
        from: '"verify your email " <zribi4641@gmail.com>', // verify your email   hiya heki eli bech todhhor 3al email ml bara fil boite ya3ni
        to: newUser.email,
        subject: 'vérification your email ',
        html:`<h2>${newUser.firstname}! thank you for registreting on our website</h2>
        <h4>please verify your email to procced.. </h4>
        <a
        href="http://${req.headers.host}/api/users/status/edit?email=${newUser.email}">click here</a>`
        }

        // el ba3then mn hna eli 9bal hekom tarki7 les parametre mte3 el ba3then
        transporter.sendMail(mailOption,function(error,info){
        if(error){
        console.log(error)
        }
        else{
        console.log('verification email sent to your gmail account ')
        }
        })




        return res.status(201).send({ success: true, message: "Account created successfully", user: createdUser })

    }catch(error){
        console.log(error)
        res.status(404).send({ success: false, message: err })
    }
})

// get sans les password
router.get('/', async (req, res, )=> {
    try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    
    });




    router.get('/status/edit/', async (req, res) => {
        try {
        let email = req.query.email
        let user = await User.findOne({email})
        user.isActive = !user.isActive          // ya3ni hiya pardefaut false w 7atina fiha taw el contraire mte3ha eli howa el true kona nejmo nektbo direct true wkhw
        user.save()
        res.status(200).send({ success: true, /*user*/ }) // na7itha heki el user bech ki nenzel 3al lien man7ebouch ydhaharhouli el user 
        } catch (err) {
        return res.status(404).send({ success: false, message: err })
        }
        })


       // ****************************************************** la methode login**********************************
        router.post('/login', async (req, res) => {
            try {
            let { email, password } = req.body
            
            if (!email || !password) {
            return res.status(404).send({ success: false, message: "Allfields are required" }) // hethi tejem tna7iha 5ater deja bech na3mlo el verification mte3 les champ vide fil front ya32ni mosta7il yeteb3ath vide
            }
            
            let user = await User.findOne({ email})
            
            if (!user) {
            
            return res.status(404).send({ success: false, message: "Accountdoesn't exists" })
            
            } else {
            
            let isCorrectPassword = await bcrypt.compare(password, user.password)
            if (isCorrectPassword) {
            
            delete user._doc.password
            if (!user.isActive) return res.status(200).send({ success:false, message: 'Your account is inactive, Please contact youradministrator' })
            
            const token = jwt.sign ({ iduser:user._id,name:user.firstname, role: user.role }, process.env.SECRET, {expiresIn: "1h", })
            
            return res.status(200).send({ success: true, user, token })
            
            } else {
            
            return res.status(404).send({ success: false, message:"Please verify your credentials" }) // ya3ni el passe word 8alet
            
            }
            
            }
            
            } catch (err) {
            return res.status(404).send({ success: false, message: err.message})
            }
            
            });

    // **************************************************************** methode delete *********************************************        
            router.delete('/:userid', async (req, res)=> {
            const id = req.params.userid;
            try {
            await User.findByIdAndDelete(id);
            res.status(200).json({ message: "user deleted successfully." });
            } catch (error) {
            res.status(404).json({ message: error.message });
            }
            });





            router.put('/:id', async (req, res)=> {
                try {
                const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
                );
                res.status(200).json(user);
                } catch (error) {
                res.status(404).json({ message: error.message });
                }
                });




module.exports = router;