var knex = require("../knex");

module.exports = {
    getClients: function() {
        return knex("client").orderBy("client_name", "ASC");
    },
    getClient: function(name) {
        return knex("client").where("client_name", name).first();
    }
};
