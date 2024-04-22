import User from '../Models/User.js';

export const home = async (req, res) => {
  res.render('index', { isAuthenticated: req.isAuthenticated(), relatedWords: {} });
};

export const loginPage = async (req, res) => {
   res.render('login');
};

export const logout = (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Error during logout');
    }
    res.redirect('/');
  });
};
