const User = require('../models/User');
const jwt = require('jsonwebtoken');
let usersControllers = {};


usersControllers.signupUser = async (req, res) => {
    const { email, password } = req.body;
    const newUser = User({ email, password });
    await newUser.save();
    console.log('user saved', newUser, password, req.body);

    // manda el id
    // crear un token (payload, secret y opciones)
    const token = jwt.sign(
        { _id: newUser._id },
        'secretkey'
    );

    res.status(200).json({ token });
}

usersControllers.signinUser = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(401).send('The email does not exist');

    }

    if (user.password !== password) {
        return res.status(401).send('Wrong password');
    }

    const token = jwt.sign(
        { id_: user._id},
        'secretkey'
    )

    return res.status(200).json({ token });

}

module.exports = usersControllers;