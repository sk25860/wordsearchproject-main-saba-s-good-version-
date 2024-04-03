import express from 'express';
import * as ctrl from '../controllers/mainController.js';
import * as auth from '../controllers/authController.js';
import * as game from '../controllers/gameController.js';

const router = express.Router();




//module.exports = router;

router.get('/login', auth.login);
router.post('/login', auth.verifyLogin);
router.get('/register', auth.register);
router.post('/register', auth.verifyRegister);
router.get('/logout', auth.logout);


//pages 
router.get('/', auth.isAuthenticated, ctrl.home);
router.get('/login-page', ctrl.loginPage);

//game
router.get('/:category', game.getWords);

            
export default router;

