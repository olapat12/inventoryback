const express = require('express');
const app = express();
const mongoose = require('mongoose')
// const dotenv = require('dotenv')
const cors = require('cors')
const adminRouter = require('./routes/admin')
const incomeRouter = require('./routes/income')
const expensesRouter = require('./routes/expenses')
const bodyParser = require("body-parser")    
 
const PORT = process.env.PORT

app.use(express.json());
app.use(cors())
// dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://127.0.0.1:27017/tech10";
// mongoose.connect(process.env.DB_CONNECT, 
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
    ()=> console.log('connected to db'));

    app.use("/admin", adminRouter);

    app.use("/income", incomeRouter);

    app.use("/expenses", expensesRouter);
    
    app.get("/", (req, res)=>{
        
        res.send("hello world");
    })


    app.listen(PORT, ()=> console.log('running'))