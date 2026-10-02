const express = require("express");

const {
    createClass,
    getClasses,
    getClassById,
    updateClass,
    deleteClass,
} = require("../controllers/classController");

const router = express.Router();

router.post("/", createClass);
router.get("/", getClasses);
router.get("/:id", getClassById);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

module.exports = router;