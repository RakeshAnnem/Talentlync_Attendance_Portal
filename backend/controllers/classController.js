const db = require("../config/db");

const createClass = (req, res) => {
    try{
        const {ClassName, Timings, Description} = req.body;
        
        const query = `
        INSERT INTO classes 
        (ClassName, Timings, Description)
        VALUES(?,?,?)
        `;

        const values = [ClassName, Timings, Description];
        
        db.query(query, values, (err,result)=>{
            if(err){
                console.log("Class Insertion Error:", err);

                return res.status(500).json({
                    message : "Class cannot be inserted",
                    success : false,
                    error_message : err.message,
                });
            }

            return res.status(201).json({
                message:"Class inserted successfully into the database",
                success:true,
                result,
            });
        });
    }catch(error){
        res.status(500).json({
            message:"Unable to insert the class",
            success:false,
            error_message:error.message,
        })
    }
};


const getClasses = (req, res) => {
  try {
    const query = `SELECT * FROM classes`;

    db.query(query, (err, result) => {
      if (err) {
        console.log("Unable to fetch:", err);

        return res.status(500).json({
          message: "unable to get the classes",
          success: false,
        });
      }

      res.status(200).json({
        message: "All classes are displayed",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to display the classes",
      success: false,
      error_message: error.message,
    });
  }
};


const getClassById = (req, res) => {
  try {
    const { id } = req.params;

    const query = `SELECT * FROM classes WHERE id = ?`;

    db.query(query, [id], (err, result) => {
      if (err) {
        console.log("Unable to get:", err);

        return res.status(500).json({
          message: "Unable to fetch:",
          success: false,
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
            message: "Class not found",
            success: false,
        });
      }
      res.status(200).json({
        message: "Class Found",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "There is no class with that id",
      success: false,
    });
  }
};


const updateClass = (req, res) => {
  try {
    const { id } = req.params;

    const { ClassName, Timings, Description} = req.body;

    const query = `
    UPDATE classes SET
    ClassName = ?, Timings = ?, Description = ? WHERE id = ?
  `;

    const values = [ClassName, Timings, Description, id];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Class updation error:", err);

        return res.status(500).json({
          message: "Class cannot be updated",
          success: false,
          error_message: err.message,
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "Class not found",
            success: false,
        });
      }
      return res.status(200).json({
        message: "Class Update Successfully",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update the Class",
      success: false,
    });
  }
};


const deleteClass = (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM classes WHERE id = ?`;

    db.query(query, [id], (err, result) => {
      if (err) {
        console.log("Deletion Error:", err);

        return res.status(500).json({
          message: "failed to delete",
          success: false,
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "Class not found",
            success: false,
        });
      }
      res.status(200).json({
        message: "Successfully deleted the class",
        success: true,
        result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete the class",
      success: false,
      error_message: error.message,
    });
  }
};

module.exports = {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
};