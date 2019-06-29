const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            const candidate = bcrypt.compareSync(req.body.password, user.password);
            if (candidate) {
                const token = jwt.sign({userId: user._id, email: user.email}, config.jwtKey, {expiresIn: '1h'});
                res.status(200).json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(404).json({
                    message: "Password mismatch"
                })
            }
        } else {
            res.status(404).json({
                message: "Entered email not found"
            })
        }


    } catch (e) {
        errorHandler(e, res);
    }
};

module.exports.register = async (req, res) => {
    try {
        const userCandidate = await User.findOne({email: req.body.email});
        if (!userCandidate) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const user = await new User({
                email: req.body.email,
                password: hashedPassword
            }).save();

            if (user) {
                res.status(200).json(user);
            }

        } else {
            res.status(404).json({
                message: "This email already registered"
            })
        }

    } catch (e) {
        errorHandler(e, res);
    }
};
