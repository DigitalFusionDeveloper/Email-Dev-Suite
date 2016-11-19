var knex = require("../knex");

module.exports = {
    insertMinutes: function(type, minutes) {
        return knex("statistics").insert({
            type: type,
            minutes: minutes
        });
    },
    getAllMinutes: function() {
        return knex("statistics").sum("minutes").first();
    }
};
