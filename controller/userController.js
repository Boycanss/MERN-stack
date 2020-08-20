// Load User model
const User = require("../models/user");
const { secretOrKey } = require("../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
var passport = require('passport');
require('../config/passport')(passport);
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login")


class UserController {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    register(req, res) {
        //validating form
        const { errors, isValid } = validateRegisterInput(req.body);
        //cek valid atau tidak
        if (!isValid) {
            return res.status(400).json(errors);
        }
        User.findOne({ email: this.email })
            .then(user => {
                if (user) {
                    return res.status(400).json({ email: "Email sudah terdaftar" })
                } else {
                    const newUser = new User({
                        name: this.name,
                        email: this.email,
                        password: this.password
                    });

                    //Hash password sebelum dimasukkan ke db
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                throw err;
                            }
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    }

    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        //form Validasi
        const { errors, isValid } = validateLoginInput(req.body)

        //cek validasi
        if (!isValid) {
            return res.status(400).json(errors)
        }

        //find user by email
        User.findOne({ email })
            .then(user => {
                //cek jika user ada
                if (!user) {
                    return res.status(404).json({ emailnotfound: "Email tidak ditemukan" })
                }
                //cek password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            //jika user ada, maka membuat jwt payload
                            const payload = {
                                id: user.id,
                                name: user.name
                            };
                            //menandai token
                            jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 },//1 tahun dalam detik
                                (err, token) => {
                                    res.json({
                                        user: payload,
                                        success: true,
                                        token: "bearer " + token
                                    })
                                }
                            )
                        } else {
                            return res.status(400).json({ passwordincorrect: "Password salah" })
                        }
                    })
            })
    }
}

module.exports = UserController