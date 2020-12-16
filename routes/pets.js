const express = require("express");

const {
  getPet,
  createPet,
  updatePet,
  deletePet,
} = require("../controllers/pets");

const router = express.Router({ mergeParams: true });

router.post(createPet);

router.route("/:id").get(getPet).put(updatePet).delete(deletePet);

module.exports = router;
