const User = require("../../../model/User");
const encrypt = require('../../../utils/encrypto/bcrypt');
const createError = require('http-errors');

module.exports = {
    register: (req, res) => {
        try {

            const body = req.body;
            console.log(body)

            User.create(body).then(data => {
                let resonseData = data;
                res.status(200).json({ sucess: true, data: resonseData })
            }).catch((err) => {
                res.send(err)
            })

        } catch (error) {
            res.send(error)
        }
    },
    login: async (req, res) => {
        try {
            let userData = await User.findOne({
                where: {

                    $and: [
                        {
                            email: req.body.email
                        }, { is_deleted: 0 }
                    ]
                }
            });

            if (userData) {
                userData.password = "";
                res.status(200).send(userData)
            }

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
    createHash: (req, res) => {
        let { password } = req.body;
        res.send(encrypt.createCryptoEncrypt(password));
    },
    compareHash: (req, res) => {
        let { password, encrpyhash } = req.body;
        let response = encrypt.comparePasswordCrypto(password, encrpyhash)

        if (response == 1) {
            res.status(200).json({
                success: true,
            });
        }
        else {
            res.send(String(response));
        }
    }
}