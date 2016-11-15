var knex = require("../knex");

module.exports = {
    getClients: function() {
        return knex.select("client_name").from("client");
    },
    getClient: function(name) {
        return knex("client").where("client_name", name).first();
    }
};
