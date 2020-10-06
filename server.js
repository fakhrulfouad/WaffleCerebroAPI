const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'muhammadfakhrulghazibinmohdfouad',
      password : '',
      database : 'wafflecerebro'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [{
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id: '124',
        name: 'alya',
        email: 'alya@gmail.com',
        password: 'bananas',
        entries: 0,
        joined: new Date ()
    }
]
}

app.get('/',(req,res)=> {
    res.send(database.users);
})

app.post('/signin',(req,res)=> {signin.handleSignin(req,res,db,bcrypt)
})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res)=> {profile.handleProfile(req,res,db)})

app.put('/image', (req,res)=> {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res)=> {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is runnning on port ${process.env.PORT}`);
})

