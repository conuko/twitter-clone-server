import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

// < ======================= IMPORTED FUNCTIONS START ======================= >
import register from './controllers/register.js';
import signin from './controllers/signin.js';

// < ======================= IMPORTED FUNCTIONS END ======================= >

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      ssl: true,
    }
});

// < ======================= ROUTES START ======================= >
app.get('/', (req, res) => { res.send(db.users) });
// /SIGN IN --> check if the user typed in on the frontend Signin.js is already in the database
app.get('/', (req, res) => { res.send(db.tweets) });



app.patch('/add-like', (req, res) => addLike(req, res, db));
app.patch('/remove-like', (req, res) => removeLike(req, res, db));

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
// /REGISTER --> create a new user based on the information typed in on the frontend Register.js
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.post('/add-post', (req, res) => addPost.handleAddPost(req, red, db));

app.listen(process.env.PORT || 3001 , () => {
	console.log(`app is  running on port ${process.env.PORT}`);
})
// < ======================= ROUTES END ======================= >