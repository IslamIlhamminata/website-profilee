const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message:'Welcome to Trale (Travel and Learn)',
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, auhtData) => {
        if (err) {
        res.sendStatus(403); //forbidden
    } else {
        res.json({
            message: 'Posts created...',
            auhtData
        });
    }
  });
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'John',
        email: 'John@gmail.com',
    };

    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({
            token,
        });
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ') [1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403) //forbidden
    }
}

app.listen(3000, (req, res) => {
    console.log('server started on port 3000')
})