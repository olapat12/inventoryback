const express = require('express')
const router = express()
const Expenses = require('../model/expenses')
const crypto = require('crypto')

router.post("/add", async(req, res)=>{

    let dater;
    var id = crypto.randomBytes(3).toString('hex')
    if(req.body.datee.trim() === ""){
        dater = new Date();
    }
    else{
        dater = req.body.datee
    }

    const expenses = new Expenses({
        datee: dater,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        title: req.body.title,
        vendor: req.body.vendor,
        idd: id
    })

    try {

        const saveExpenses = expenses.save()
        res.status(200).send(saveExpenses)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/findone/:id", async(req, res)=>{

    try {

        const expenses = await Expenses.findOne({_id: req.params.id})
        if(!expenses) return res.status(400).send({"error": "not found"})

        res.status(200).send(expenses)
        
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

    const newExpenses = {
        datee: dater,
        category: req.body.category,
        description: req.body.description,
        amount: req.body.amount,
        title: req.body.title,
        vendor: req.body.vendor
    }

    try {
       const expenses = await Expenses.findOne({_id: req.params.id})
       if(!expenses) return res.status(400).send({"error": "not found"})
        
       const updated = await Expenses.findOneAndUpdate({_id: req.params.id},
        {$set: newExpenses})

       res.status(200).send("success")
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/getall', async(req, res)=>{

    try {
        const expenses = await Expenses.find();
        res.status(200).send(expenses)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/delete/:id", async(req, res)=>{

    try {
        const expenses = await Expenses.findOneAndDelete({_id: req.params.id})
        res.status(200).send({"message": "deleted"})
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;