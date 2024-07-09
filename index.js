if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express');
const app = express();
const passport = require("passport");
const initializePassport = require("./config/passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const connectToDB = require("./config/database");


const users = [];

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);


const PORT = 5000;

async function start() {
    await connectToDB(process.env.DATABASE_URL);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start();
