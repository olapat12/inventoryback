const express = require('express')
const router = express();
const Admin = require('../model/admin')
const bcrypt = require('bcryptjs')

router.post("/save", async(req, res)=>{

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const adminn = await Admin.findOne({username: req.body.username})
        if(adminn) return res.status(400).send({"error": "username already exist"})

        const admin = new Admin({
            username: req.body.username,
            password: hashedPassword
        })

    try {

        const saveAdmin = admin.save()

        res.status(200).send(saveAdmin)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
})

router.get("/admin/:id", async (req, res)=>{

    try {

        const admin = await Admin.findOne({username: req.params.id})

        if(!admin) return res.status(400).send({"message": "user not found"})

        res.status(200).send(admin)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async(req, res)=>{

    try {

        const admin = await Admin.findOne({username: req.body.username})
        if(!admin) return res.status(400).send({"error": "incorrect username"})

        const validPass = await bcrypt.compare(req.body.password, admin.password)
        if(!validPass) return res.status(202).send('email and password do not match')

        res.status(200).send(admin)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;