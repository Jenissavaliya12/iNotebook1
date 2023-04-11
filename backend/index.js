const connectToMongo  = require('./db');
var cors = require('cors')
connectToMongo();
const express = require('express');


const app = express();
const port =  5000;

app.use(cors())
app.use(express.json());//for using req body
app.use('/api/auth' ,require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.get('/send', (req,res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})



