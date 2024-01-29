// imports
const mongoose = require("mongoose");
const { CONSTANTS } = require("../config/constants");

// connect to DB
mongoose.connect(CONSTANTS.mongoDBString + CONSTANTS.DBNAME);

// Define Schemas
const USER = mongoose.model("users", {
    uniqueID: String,
    username: String,
    password: String,
    todos: [
        {
            _id: String,
            title: String,
            description: String,
            completed: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

// export
module.exports = {
    USER,
};
