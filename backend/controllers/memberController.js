const db = require("../config/db");

const createMember = (req, res) => {
  try {
    const {
      username,
      Email,
      RollNumber,
      GitHub,
      LinkedinProfile,
      Batch,
      Mobile,
      Branch,
      JoinedDate,
      CreatedOn,
      updatedOn,
      skills,
      password,
    } = req.body;

    const dbquery = `
      INSERT INTO members (
        username,
        Email,
        RollNumber,
        GitHub,
        LinkedinProfile,
        Batch,
        Mobile,
        Branch,
        JoinedDate,
        CreatedOn,
        updatedOn,
        skills,
        password
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      username,
      Email,
      RollNumber,
      GitHub || null,
      LinkedinProfile || null,
      Batch || null,
      Mobile,
      Branch,
      JoinedDate || null,
      CreatedOn || null,
      updatedOn || null,
      skills || null,
      password,
    ];

    db.query(dbquery, values, (err, result) => {
      if (err) {
        console.error("Member insertion error:", err);

        return res.status(500).json({
          message: "Member is not inserted into the DB",
          success: false,
          error: err.message,
        });
      }

      return res.status(201).json({
        message: "Member inserted into the DB",
        success: true,
        memberId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Controller error:", error);

    res.status(500).json({
      message: "Member is not inserted into the DB",
      success: false,
      error: error.message,
    });
  }
};

const getMembers = (req, res) => {
  try {
    const query = `SELECT * FROM members`;

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "member not found",
          success: false,
        });
      }

      return res.status(200).json({
        message: "All memebers are displayed",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Members are empty in the db",
      success: false,
      error_message: error.message,
    });
  }
};

const getMemberById = (req, res) => {
  try {
    const { id } = req.params;

    const query = `SELECT * FROM members WHERE id = ?`;

    db.query(query, [id], (err, result) => {
      if (err) {
        console.log("unable to fetch:", err);

        return res.status(500).json({
          message: "Unable to fetch",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Memeber found with the id",
        success: true,
        result,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not find the member with the id",
      success: false,
      error_message: error.message,
    });
  }
};

const updateMember = (req, res) => {
  try {
    const { id } = req.params;

    const {
      username,
      Email,
      RollNumber,
      GitHub,
      LinkedinProfile,
      Batch,
      Mobile,
      Branch,
      JoinedDate,
      skills,
    } = req.body;

    const query = `
        UPDATE members
        SET
            username = ?,
            Email = ?,
            RollNumber = ?,
            GitHub = ?,
            LinkedinProfile = ?,
            Batch = ?,
            Mobile = ?,
            Branch = ?,
            JoinedDate = ?,
            skills = ?
        WHERE id = ?
    `;

    const values = [
      username,
      Email,
      RollNumber,
      GitHub || null,
      LinkedinProfile || null,
      Batch || null,
      Mobile,
      Branch,
      JoinedDate || null,
      skills || null,
      id,
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update member",
          success: false,
        });
      }

      res.status(200).json({
        message: "Member updated successfully",
        success: true,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "unable to update the member",
      success: false,
      error_message: error.message,
    });
  }
};

const deleteMember = (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM members WHERE id = ?`;

    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to delete the member",
          success: false,
        });
      }

      res.status(200).json({
        message: "member deleted successfully",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Not able to delete the member with that id",
      success: false,
      error_message: error.message,
    });
  }
};

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
