import User from '../models/User.js';
import passport from 'passport';

export const login = (req, res) => {
  res.render('login');
}

export const verifyLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false
});


export const register = (req, res) => {
  res.render('register');
}

export const verifyRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.send(error.message);
  }
};

export const logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    //redirect after logging out
    res.redirect('/');
  });
}                        

//checking user authentication
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

//testing 1 kaitlyn
