const db = require("../config/db");

const createTrainee = (req, res) => {
  try {
    const { Username, Password, Email, Mobile, Skills } = req.body;

    const query = `
    INSERT INTO trainee
    (Username, Password, Email, Mobile, Skills)
    VALUES (?, ?, ?, ?, ?)
  `;

    const values = [Username, Password, Email, Mobile, Skills];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Trainee insertion error:", err);

        return res.status(500).json({
          message: "Trainee cannot be inserted into the DB",
          success: false,
          error_message: err.message,
        });
      }

      return res.status(201).json({
        message: "Trainee inserted into the DB",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "unable to insert the trainer",
      success: true,
      error_message: error.message,
    });
  }
};

const getTrainees = (req, res) => {
  try {
    const query = `SELECT * FROM trainee`;

    db.query(query, (err, result) => {
      if (err) {
        console.log("Unable to fetch:", err);

        return res.status(500).json({
          message: "unable to get the members",
          success: false,
        });
      }

      res.status(200).json({
        message: "All trainers are displayed",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to display the trainers",
      success: false,
      error_message: error.message,
    });
  }
};

const getTraineeById = (req, res) => {
  try {
    const { id } = req.params;

    const query = `SELECT * FROM trainee WHERE id = ?`;

    db.query(query, [id], (err, result) => {
      if (err) {
        console.log("Unable to get:", err);

        return res.status(500).json({
          message: "Unable to fetch:",
          success: false,
        });
      }

      res.status(200).json({
        message: "Trainer Found",
        success: false,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "There is no Trainer with that id",
      success: false,
    });
  }
};

const updateTrainee = (req, res) => {
  try {
    const { id } = req.params;

    const { Username, Password, Email, Mobile, Skills } = req.body;

    const query = `
    UPDATE trainee SET
    Username = ?, Password = ?, Email = ?, Mobile = ?, Skills = ? WHERE id = ?
  `;

    const values = [Username, Password, Email, Mobile, Skills, id];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Trainee updation error:", err);

        return res.status(500).json({
          message: "Trainee cannot be updated",
          success: false,
          error_message: err.message,
        });
      }

      return res.status(201).json({
        message: "Trainee Update Successfully",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update the Trainer",
      success: false,
    });
  }
};

const deleteTrainee = (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM trainee WHERE id = ?`;

    db.query(query, [id], (err, result) => {
      if (err) {
        console.log("Deletion Error:", err);

        return res.status(500).json({
          message: "failed to delete",
          success: false,
        });
      }

      res.status(200).json({
        message: "Successfully deleted the trainer",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete the trainer",
      success: false,
      error_message: error.message,
    });
  }
};

module.exports = {
  createTrainee,
  getTrainees,
  getTraineeById,
  updateTrainee,
  deleteTrainee,
};
