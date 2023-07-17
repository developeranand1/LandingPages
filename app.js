const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const morgan=require('morgan');
const bodyParser=require('body-parser');


const app=express();
app.use(cors());
app.options('*',cors);


app.use(morgan('tiny'));

const contacts=require('./router/contact');
const login=require('./router/login');
const sign=require('./router/sign');

require('dotenv/config');

const api=process.env.API_URL;

app.use(bodyParser.json());


app.use(`${api}/contact`,contacts);
app.use(`${api}/login`,login);
app.use(`${api}/sign`,sign);


mongoose.connect(process.env.CONNECTION,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'eshop-database'
})

.then(()=>{
    console.log("The database Connection is ready now ....");
})

.catch((err)=>{

    console.log(err);
})


app.listen(4000,() =>{
    console.log("The Sever is  running http://localhost:4000");
})

