const CONSTANTS = {
    DBNAME: "todos",
    JWTSecret: process.env.JWTSecret,
    mongoDBString: process.env.mongoDBString,
    PORT: 3000,
};

module.exports = {
    CONSTANTS,
};
