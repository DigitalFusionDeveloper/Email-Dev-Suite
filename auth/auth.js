var user = require("../db/api/user");
var bcrypt = require("bcrypt");
var passport = require("passport");
var LocalStrategy = require("passport-local");


passport.use(new LocalStrategy((username, password, done) => {
    user.findUser(username).then((employee, err) => {
        if (!employee) {
            done("Error: User does not exist");
        } else if (employee && bcrypt.compareSync(password, employee.password)) {
            done(null, employee);
        } else {
            done("Error: Password is incorrect");
        }
    });
}));

module.exports = {
    passport: passport
};
