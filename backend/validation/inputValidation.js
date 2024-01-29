// imports
const zod = require("zod");

// define schemas
const USER = zod.object({
    username: zod.string().min(3),
    password: zod.string().min(8).max(24),
});

const TODO = zod.object({
    title: zod.string().min(2),
    description: zod.string().min(3),
    completed: zod.boolean(),
});

// exports

module.exports = {
    TODO,
    USER,
};
