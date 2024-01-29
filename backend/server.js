// imports
const express = require("express");
const inputValidator = require("./validation/inputValidation");
const db = require("./database/db");
const JWT = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const { hasher } = require("./helper");
const { CONSTANTS } = require("./config/constants");
const cors = require("cors");

const JWTSecret = CONSTANTS.JWTSecret;

// setup server
const app = express();
const port = CONSTANTS.PORT;

// global middlewares
app.use(express.json());
app.use(cors());

// local middlewares

function validateRequest(req, res, next) {
    try {
        const authorization = req.headers?.authorization?.split(" ")[1];
        let x = JWT.verify(authorization, JWTSecret);
        res.locals.username = x.username;
        res.locals.uniqueID = x.uniqueID;
        next();
    } catch (e) {
        return res.status(403).json({message: "Invalid token", success:false});
    }
}

// routes
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('here')

    console.log('username', username, typeof(username))
    console.log('password', password, typeof(password))

    if (!inputValidator.USER.safeParse({ username, password }).success) {
        return res.status(403).json({message: "Invalid User Creds", success:false});
    }

    const hashedPassword = hasher(password);
    const uniqueID = username + "-" + nanoid(16);

    let user = await db.USER.findOne({
        username,
    });

    if (user) {
        return res.status(403).json({message: "User already exists!", success:false});
    }

    await db.USER.create({
        uniqueID,
        username,
        password: hashedPassword,
    });

    const token = JWT.sign({ username, uniqueID }, JWTSecret);
    return res.status(200).json({
        message: "User created",
        token: "Bearer " + token,
        success:true
    });
});

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!inputValidator.USER.safeParse({ username, password }).success) {
        return res.status(403).json({message: "Invalid User Creds", success:false});
    }

    const hashedPassword = hasher(password);

    let user = await db.USER.findOne({
        username,
        password: hashedPassword,
    });

    if (!user) {
        return res.status(404).json({message: "User not found", success:false});
    }

    const token = JWT.sign({ username, uniqueID: user["uniqueID"] }, JWTSecret);
    return res.status(200).json({
        message: "User Signed in",
        token: "Bearer " + token, success:true
    });
});

app.get("/todos", validateRequest, async (req, res) => {
    const todos = await db.USER.findOne(
        {
            username: res.locals.username,
            uniqueID: res.locals.uniqueID,
        },
        { todos: 1, _id: 0 }
    );
    res.status(200).json({ todos: todos.todos, success:true });
});

app.post("/todos", validateRequest, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const completed = false;
    const todoUniqueID = nanoid(16);

    if (
        !inputValidator.TODO.safeParse({ title, description, completed })
            .success
    ) {
        return res.status(403).json({message: "invalid todo input", success:false});
    }

    try {
        const todo = await db.USER.updateOne(
            {
                username: res.locals.username,
                uniqueID: res.locals.uniqueID,
            },
            {
                $push: {
                    todos: { _id: todoUniqueID, title, description, completed },
                },
            }
        );
        if (todo.matchedCount == 0) {
            return res.status(404).json({message: "User Not Found", success:false});
        } else {
            return res.status(200).json({message: "Todo Created", success:false});
        }
    } catch (error) {
        res.status(404).json({message: "Some error occured while creating TODO", success:false});
    }
});

app.put("/todos/:todoid", validateRequest, async (req, res) => {
    const completed = req.body.completed;
    const todoUniqueID = req.params.todoid;
    const username = res.locals.username;
    const uniqueID = res.locals.uniqueID;

    try {
        const updatedUser = await db.USER.findOneAndUpdate(
            {
                username: username,
                uniqueID: uniqueID,
                "todos._id": todoUniqueID,
            },
            {
                $set: {
                    "todos.$.completed": completed,
                },
            }
        );

        if (!updatedUser) {
            return res.status(404).json({message: "User or Todo Not Found", success:false});
        }

        res.status(200).json({message: "Todo Updated", success:false});
    } catch (e) {
        res.status(404).json({message: "Todo not Found", success:false});
    }
});

// start Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
