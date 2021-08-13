const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/angular-auth', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db => console.log('db is connected'))
.catch(error => console.log(error));
