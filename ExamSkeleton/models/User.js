const mongoose = require('mongoose');
const encryption = require('../utils/encryprtion');


const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String },
    lastName: { type: mongoose.Schema.Types.String },
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdministrator = async () => {
    try {
        let users = await User.find({})
        if(users.length > 0){
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'admin');

        return User.create({
            username: 'admin',
            hashedPass,
            firstName: 'Viktor',
            lastName: 'Dimitrov',
            salt,
            roles: ['Admin']
        });

    } catch (err) {
        console.log(err);
    }
}

module.exports = User;





