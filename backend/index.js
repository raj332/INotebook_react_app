const connectToMongo =require('./db');
connectToMongo();
const express = require('express')
const app = express()
const cors = require('cors');

const port = 5000
app.use(cors())
app.use(express.json())     //to use req.body
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})