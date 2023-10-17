const express = require('express');
const bodyParser = require("body-parser");
const { users } = require('./models');
const uuid = require('uuid');

const { createServer } = require('node:http');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);

const cors = require('cors');
const { Op, where } = require('sequelize');
const jwt = require('jsonwebtoken');
var corsOptions = {
    origin: 'http://localhost:5500',
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

const io = new Server(server, { cors: corsOptions });


// register.....
app.post('/register', async (req, res) => {
    const { userName, emailId, password } = req.body;

    const createUser = await users.create({
        userName: userName,
        password: password,
        emailId: emailId,
    });

    console.log(createUser);
    res.send('User registered successfully');
});



// login.....
app.post('/users/login', async (req, res) => {
    let username = req.body.userName;

    let userL = await users.findOne({
        where: {
            [Op.or]: {
                userName: username,
                emailId: username
            }
        }
    });

    const token = jwt.sign({ "uuid": userL.uuid }, "PARTH=KI=RANI=TULSI");
    
    return res.send({
        "X-Access-Token": token,
        "name": userL.userName,
    });
});


// socket.....
io.on('connection', (socket) => {
    socket.on('sub', (suid) => {
        console.log('user ' + suid + ' connect'); // chack console
        socket.on('message', (sender, message) => {
            io.emit(suid, sender, message);
        });
    });
    socket.on('disconnect', (suid) => {
        console.log('user has been disconnected');
    });
    console.log('socket conneted...'); // chack console
})

server.listen(8080, () => console.log('conneted...')); 
