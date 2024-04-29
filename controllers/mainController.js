import User from '../Models/User.js';
import * as game from '../controllers/gameController.js';

export const home = async (req, res) => {
   grid = game.createGrid(15, 15);
  res.render('index', { isAuthenticated: req.isAuthenticated(), words: {}, grid });

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
