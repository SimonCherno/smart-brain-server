const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const express = require ('express');
const bcrypt = require ('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1Murziksql',
      database : 'smart-brain'
    }
});
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {res.send('home')})
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.post('/sign-in', (req, res) => signIn.handleSignIn(req, res, db, bcrypt));
app.get('/:id', (req, res) => profile.handleProfileGet(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageUrl', (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('running on port:',process.env.PORT);
});


