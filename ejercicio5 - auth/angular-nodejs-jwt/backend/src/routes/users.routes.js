const { Router } = require('express');
const router = Router();

const usersController = require('../controllers/users.controller');

router.get('/', (req, res) => {
    return res.send('hello world');
})

router.post('/signup', usersController.signupUser);
router.post('/signin', usersController.signinUser);

module.exports = router;
