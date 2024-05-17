import express from 'express';
import * as ctrl from '../controllers/mainController.js';
import * as auth from '../controllers/authController.js';
import * as game from '../controllers/gameController.js';

const router = express.Router();

router.get('/login', auth.login);
router.post('/login', auth.verifyLogin);
router.get('/register', auth.register);
router.post('/register', auth.verifyRegister);
router.get('/logout', auth.logout);

// Pages 
router.post('/', auth.isAuthenticated, ctrl.home);
router.get('/', auth.isAuthenticated, ctrl.home);
router.get('/login-page', ctrl.loginPage);

// Game
router.post('/word', game.getRelatedWords);


export default router;
