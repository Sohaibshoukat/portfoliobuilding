const connectToMongo = require("./DB");
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');


connectToMongo()

const port = 5000
const app = express()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./Routes/User'));
app.use('/api/cv', require('./Routes/CV'));
app.use('/api/web', require('./Routes/Web'));
app.use('/api/writter', require('./Routes/Writter'));


app.listen(port, () => {
  console.log(`Inote-book listening at http://localhost:${port}`)
})

