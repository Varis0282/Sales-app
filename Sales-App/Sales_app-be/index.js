const express = require('express');
const mongoose = require('mongoose');
const app = express();
const {MONGODB_URL} = require('./config');
const cors = require('cors');
const port = 4000;
mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error',(err)=>{
    console.log(err)
})

require('./Model/User-Model');
require('./Model/Sale-Model');

app.use(express.json());
app.use(cors());

app.use(require('./Routes/User-routes'));
app.use(require('./Routes/Sale-routes'));

app.listen(port,()=>{
    console.log(`Server Started on ${port} !`);
})
