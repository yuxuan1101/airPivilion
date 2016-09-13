/**
 * Created by yuxuan on 8/11/16.
 */
let env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

let specific = {
    development: {
        app: {
            port: 3000,
            excluded : "excluded_path"
        },
        database: "mongodb://localhost:27017/air-pivilion",
        token: "screcttokenairpivilion"
    },
    production: {
        app: {
            port: process.env.PORT || 3000,
            excluded : "excluded_path"
        },
        database: "mongodb://localhost:27017/air-pivilion",
        token: "screcttokenairpivilion"
    },
};

module.exports = specific[env];