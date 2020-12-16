const express = require("express");

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const { authorize } = require("../middleware/protect");

const router = express.Router({ mergeParams: true });

router.route("/").post(createUser);

router
  .route("/:id")
  .get(getUser)
  .put(authorize("user", "admin"), updateUser)
  .delete(deleteUser);

module.exports = router;
