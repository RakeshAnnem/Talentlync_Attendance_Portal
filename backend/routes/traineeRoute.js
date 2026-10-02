const express = require("express");

const {
  createTrainee,
  getTrainees,
  getTraineeById,
  updateTrainee,
  deleteTrainee,
} = require("../controllers/traineeController");

const router = express.Router();

router.post("/", createTrainee);
router.get("/", getTrainees);
router.get("/:id", getTraineeById);
router.put("/:id", updateTrainee);
router.delete("/:id", deleteTrainee);

module.exports = router;
