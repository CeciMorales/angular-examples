const { Router } = require('express');
const router = Router();

const tasksControllers = require('../controllers/tasks.controller');


router.get('/', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'task one',
            description: 'description task one'
        },
        {
            _id: 2,
            name: 'task two',
            description: 'description task two'
        },    
    ])    
})

router.get('/private-tasks', tasksControllers.verifyToken, (req, res) => {
    res.json([
        {
            _id: 3,
            name: 'task one private',
            description: 'description task one'
        },
        {
            _id: 4,
            name: 'task two private',
            description: 'description task two'
        },    
    ])
}) 

module.exports = router;


