const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const PORT = 3000;
const customers = [
    {
        "Name" : "Aditya",
        "industry" : "it"
    },{
        "Name" : "John",
        "industry" : "music"
    },{
        "Name" : "Sameer",
        "industry" : "Fax",
    }
]


app.get('/',(req,res)=>{
    res.send("Welcome");
});
app.get('/api/customers',(req,res)=>{
    res.send({"customers" : customers});
});

app.post('/',(req,res)=>{
    res.send("This is a post request!");
});

app.post('/api/customers',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
});

app.listen(PORT,()=>{
    console.log("App listening to port " + PORT);
})