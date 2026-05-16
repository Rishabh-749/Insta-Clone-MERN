const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  // const hash = crypto.createHash("sha256").update(password).digest("hex");
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    password: hash,
    email,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Created Successfully",
    user: {
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  }).select("+password");

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }
  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    return res.status(401).json({
      message: "Password Invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User LoggedIn Successfully.",
    user: {
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

const getMeController = async (req, res) => {
  const username = req.user.username;

  const user = await userModel.findOne({
    username,
  });

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

module.exports = {
  registerController,
  loginController,
  getMeController
};
