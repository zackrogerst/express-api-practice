const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

/////////////////////////////////////// middleware

app.use(morgan("dev")); // logging node package
app.use(express.json()); // middleware - for parsing application/json

app.use((req, res, next) => {
	console.log("hello from middleware");
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

/////////////////////////////////////// route handlers



/////////////////////////////////////// routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

/////////////////////////////////////// start server

const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
