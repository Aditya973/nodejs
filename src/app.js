const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const Customer = require('./models/customer'); // '.' means to from 'this directory(src)' to models/customer

mongoose.set('strictQuery',false);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}
const CONNECTION = process.env.CONNECTION;
const PORT = process.env.PORT || 3000;
const customers = [
    {
        "Name" : "Aditya",
        "industry" : "it"
    },
    {
        "Name" : "John",
        "industry" : "music"
    },
    {
        "Name" : "Sameer",
        "industry" : "Fax",
    }
];

const customer = new Customer({
    name : "surya",
    industry : "finance"
});

// customer.save();   /*save() save the collection in mongodb

app.get('/',(req,res)=>{
    res.send('Welcome!');
});
app.get('/api/customers',async (req,res)=>{
    // console.log(await mongoose.connection.db.listCollections().toArray()); /*output the metadata of database in console
    try{
        const result = await Customer.find(); // find() grab everthing from Customer Schema
        res.send({"customers" : result}); //res.json({"customers" : result});
    }
    catch(e){
        res.status(500).json({error:e.message});
    }
});

app.get('/api/customers/:id/test',async(req,res)=>{
    res.json({reqParams : req.params,
    reqQuery : req.query});
});

app.get('/api/customers/:id',async(req,res)=>{
    console.log({
        reqParams:req.params,
        reqQuery:req.query
    });
    try{
        const customerId = req.params.id;
        // const {id:customerId} = req.params;
        console.log(customerId);
        const customer = await Customer.findById(customerId);
        console.log(customer);
        if(!customer){
            res.status(404).json({error:"User Not Found"});
        }
        else{
            res.json({customer});
        }
    }
    catch(e){
        res.status(500).json({error:'something went wrong'});
    }
});

app.post('/',(req,res)=>{
    res.send("This is a post request!");
});

app.post('/api/customers',async(req,res)=>{
    console.log(req.body);
    // const customer = new Customer(req.body); // short hand for one give below but property that is not in schema while not be stored
    const customer = new Customer({
        name : req.body.name,
        industry : req.body.industry
    });
    try{
        await customer.save();
        res.status(201).json({customer});
    }
    catch(e){
        res.status(200).json({error:e.message});
    }
    // res.send(req.body);
});


const start = async() =>{
    try{
        await mongoose.connect(CONNECTION);
        app.listen(PORT,()=>{
            console.log("App listening to port " + PORT);
        });
    }
    catch(e){
        console.log(e.message);
    }
};
start();