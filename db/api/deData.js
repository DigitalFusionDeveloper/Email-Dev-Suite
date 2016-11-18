var knex = require("../knex");

module.exports = {
    setDEData: function(data) {
        return knex("de_data")
            .where("id", 1)
            .update({
                number: data.id,
                text: data.text,
                parent: data.parent,
                data: data.data
            });
    },
    getDEData: function() {
        return knex("de_data").where("id", 1).first();
    }
};
