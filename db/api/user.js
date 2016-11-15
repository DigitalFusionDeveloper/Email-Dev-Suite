var knex = require("../knex");

module.exports = {
    findUser: function(username) {
        return knex("employee").where("username", username).first();
    }
};


// createUser: body => knex("users").insert(body, "id"),
// getUser: id => knex("users").where("id", id).first(),
// findUserById: id => knex("users").where("id", id).first()
