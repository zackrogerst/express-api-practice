const fs = require("fs");
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

///////////////////////////////////////

module.exports = {
	getAllTours: (req, res) => {
		res.status(200).json({
			status: "success",
			requestedAt: req.requestTime,
			results: tours.length,
			data: {
				tours
			}
		});
	},

	getTour: (req, res) => {
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
	},

	createTour: (req, res) => {
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
	},

	updateTour: (req, res) => {
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
	},

	deleteTour: (req, res) => {
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
	}
};
