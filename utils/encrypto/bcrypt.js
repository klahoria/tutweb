const bcrypt = require('bcrypt');
const crypto = require('crypto');


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';



function encryptPassword(password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            return hash
        });
    });
}

exports.encryptPassword =  encryptPassword;

function comparePassword(password) {
    bcrypt.compare(password, hash, function (err, result) {
        // result == false
        return result
    });
}

exports.comparePassword =  comparePassword;


function createCryptoEncrypt(password) {
    return hashPassword(password)
}

exports.createCryptoEncrypt =  createCryptoEncrypt;

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    let passwordhash = hash.digest('hex');
    console.log(passwordhash);
    return passwordhash;
}

function comparePasswordCrypto(password, encryptPassword) {

    const hashedPasswordAttempt = hashPassword(password);
    if (encryptPassword === hashedPasswordAttempt) {
        console.log('Password is correct!');
        return 1;
    } else {
        console.log('Password is incorrect.');
        return -1;
    }

}

exports.comparePasswordCrypto =  comparePasswordCrypto