const express = require("express");
const router = express.Router();

const fs = require("fs");
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

/////////////////////////////////////// functions

const getAllTours = (req, res) => {
	res.status(200).json({
		status: "success",
		requestedAt: req.requestTime,
		results: tours.length,
		data: {
			tours
		}
	});
};

const getTour = (req, res) => {
	const id = +req.params.id;

	const tour = tours.find(el => el.id === id);

	if (!tour) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID"
		});
	} else {
		res.status(200).json({
			status: "success",
			data: {
				tour
			}
		});
	}
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
	if (+req.params.id > tours.length) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID"
		});
	} else {
		res.status(200).json({
			status: "success",
			data: {
				tour: "updated tour here"
			}
		});
	}
};

const deleteTour = (req, res) => {
	if (+req.params.id > tours.length) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID"
		});
	} else {
		res.status(204).json({
			status: "success",
			data: null
		});
	}
};

/////////////////////////////////////// routes

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

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;