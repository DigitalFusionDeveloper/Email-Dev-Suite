if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
module.exports = {
    development: {
        client: "pg",
        connection: "postgres://localhost/emaildevsuite"
    },

    production: {
        client: "pg",
        connection: process.env.DATABASE_URL + "?ssl=true"
    }
};
