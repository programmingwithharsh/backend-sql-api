const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser')
const app = express();
app.use(cors());
const queries = require("./queries");

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

http://localhost:4200/
app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('/users', queries.getUsers);
app.get('/users/:id', queries.getUserById);
app.delete('/users/:id', queries.deleteUserById);

app.post('/users', queries.addUser);
app.put('/users/:id', queries.updateUser);

app.listen(4200);