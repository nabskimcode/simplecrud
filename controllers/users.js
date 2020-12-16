const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Joi = require("joi");

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(user);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    role: Joi.string(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    res
      .status(400)
      .json({ status: "failed", details: validation.error.details });
  } else {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
