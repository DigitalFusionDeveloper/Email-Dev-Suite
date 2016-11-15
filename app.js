var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var auth = require("./auth/auth");
var session = require("cookie-session");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

var index = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.get("/favicon.ico", function(req, res) {
    res.sendStatus(200);
});

// removing powered-by header making it harder for people to see what we're using
app.disable('X-Powered-By');

// setting the powered by header
app.use(function(req, res, next) {
    res.setHeader("X-Powered-By", "ExactTarget");
    next();
});

app.use(session({
    keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY1]
}));

app.use(auth.passport.initialize());

app.use(express.static(path.join(__dirname, "public")));

app.post("/login", function(req, res) {
    auth.passport.authenticate("local", (err, user) => {
        if (err) {
            res.render("login", {
                error: err
            });
        } else if (user) {
            req.session.employee = user.username;
            res.redirect("/");
        }
    })(req, res);
});

app.use(function(req, res, next) {
    if (req.session.employee) {
        next();
    } else {
        res.render("login");
    }
});

app.use("/", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
