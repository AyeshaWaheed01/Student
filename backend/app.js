const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors'); // Add this line
const bodyParser = require('body-parser');



app = express();
app.use(cors({
    origin : "*",
    credentials: true,
    allowedHeaders: ['content-type']
}));

app.use(bodyParser.json());

const connection = () => {
    const uri = 'mongodb+srv://fa20bse008:fa20bse008@cluster0.1sfpbsf.mongodb.net/student?retryWrites=true&w=majority';
    mongoose.connect(uri);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', () => {
        console.log('Connected to the database');
    });
}



app.listen(3000,()=>{
    
    console.log("Server Running at Port 3000");
    connection();
})