const express = require('express')
const router = express()
const Income = require('../model/income')
const crypto = require('crypto')

router.post("/add", async (req, res)=>{

    let dater;
    var id = crypto.randomBytes(3).toString('hex')

    if(req.body.datee.trim() === ""){
        dater = new Date();
    }
    else{
        dater = req.body.datee
    }

    const income = new Income({
        datee: dater,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        title: req.body.title,
        paidby: req.body.paidby,
        clientname: req.body.clientname,
        idd: id
    })

    try {

        const saveIncome = income.save()
        res.status(200).send(saveIncome)
        
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

// router.g("/search")

router.get("/findone/:id", async(req, res)=>{

    try {

        const income = await Income.findOne({_id: req.params.id})
        if(!income) return res.status(400).send({"error": "not found"})

        res.status(200).send(income)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put("/update/:id", async (req, res)=>{

    let dater;

    if(req.body.datee.trim() === ""){
        dater = new Date();
    }
    else{
        dater = req.body.datee
    }

    const income = {
        datee: dater,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        title: req.body.title,
        paidby: req.body.paidby,
        client: req.body.client
    }

    try {
      const oldIncome = await Income.findOne({_id: req.params.id})
      if(!oldIncome) return res.status(400).send({"error": "not found"})
        
      const updated = await Expenses.findOneAndUpdate({_id: req.params.id},
        {$set: income})

        res.status(200).send(updated)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/getall', async(req, res)=>{

    try {
        const income = await Income.find();
        res.status(200).send(income)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/delete/:id", async(req, res)=>{

    try {
        const income = await Income.findOneAndDelete({_id: req.params.id})
        res.status(200).send({"message": "deleted"})
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;




