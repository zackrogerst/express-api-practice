const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json()); //middleware - for parsing application/json

// // the anon function in the route is called the route handler
// app.get("/", (req, res) => {
// 	res.status(200).json({
// 		message: "Hello from the server side!",
// 		app: "Natours"
// 	});
// }); // ".json" returns header content-type: application/json; charset=utf-8
// app.post("/", (req, res) => {
// 	res.send("Can Post Now");
// }); // ".send" returns header content-type: text/html; charset=utf-8

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get("/api/v1/tours", (req, res) => {
	res.status(200).json({
		status: "success",
		results: tours.length,
		data: {
			tours
		}
	});
});

app.post("/api/v1/tours", (req, res) => {
	// console.log(req.body);

	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);
	fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
		res.status(201).json({
			status: "success",
			data: {
				tour: newTour
			}
		});
	});
});

const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
