const followModel = require("../models/follower.model");
const userModel = require("../models/user.model");

const followUserController = async (req, res) => {

  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername == followeeUsername) {
    return res.status(400).json({
      message: "You cannot Follow to yourself.",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to follow is not Exists",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following to ${followeeUsername}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are now following to ${followeeUsername}`,
    follow: followRecord,
  });
};

const unfollowController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are Not Following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have Unfollowed ${followeeUsername}`,
  });
};

module.exports = {
  followUserController,
  unfollowController,
};
