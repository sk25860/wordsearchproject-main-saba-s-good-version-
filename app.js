import express from 'express';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import bcrypt from 'bcrypt';
import session from 'express-session';
import configurePassport from './config/passport.js';
import User from './models/User.js';

import dotenv from 'dotenv'; 
dotenv.config({ path: 'process.env' });


const app = express();
import routes from './routes/routes.js';



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

//Setting Up Passport 
configurePassport(passport);

// Session setup
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));

app.use(passport.initialize());
app.use(passport.session());


//Express (EJS)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Routes
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








