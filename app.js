const http = require('http');
const express = require('express');
const app = express();
const host = '0.0.0.0'
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// var birds = require('./routes/birds');

app.use('/', require('./routes'));

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })
http.createServer(app).listen(port, host, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
