require('./db')
const express = require('express');
const router = require('./routes/route');
const port = process.env.PORT ||  8000;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());    
app.use('/', router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})