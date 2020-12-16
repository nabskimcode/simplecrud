const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Pet = require("../models/Pets");
const Joi = require("joi");
const User = require("../models/User");

exports.getPet = asyncHandler(async (req, res, next) => {
  const pet = await Pet.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: pet,
  });
});

exports.createPet = asyncHandler(async (req, res, next) => {
  // add user to req.body
  req.body.user = req.user.id;

  const user = await User.findById(req.params.id);

  const pet = await Pet.create(req.body);

  res.status(201).json({
    success: true,
    data: pet,
  });
});

exports.updatePet = asyncHandler(async (req, res, next) => {
  const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: pet,
  });
});

exports.deletePet = asyncHandler(async (req, res, next) => {
  await pet.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
