var createError = require("http-errors");
var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*"); // 默认设置
	res.setHeader("Access-Control-Allow-Methods", "*"); // 默认设置
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	/**
	 * render 与 send 都可用于返回数据
	 * send 更多用于数据返回
	 * render 用于需要进行html渲染
	 */
	res.render("error");
});

module.exports = app;
