const express = require("express");
const { checkId, checkBody, getAllTours, createTour, getTour, updateTour, deleteTour } = require("../controllers/tourController");
const router = express.Router();

///////////////////////////////////////

router.param("id", checkId);

///////////////////////////////////////

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

router.route("/").get(getAllTours).post(checkBody, createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
