import userFriendService from "../services/userFriendService.js";

export const friendUser = async (req, res) => {
  try {
    const { myBadgeCode, friendBadgeCode } = req.params;
    await userFriendService.friendUser(myBadgeCode, friendBadgeCode);

    res.status(200).json({ message: "Friendship created successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error friending user", error: error.message });
  }
};

export const unfriendUser = async (req, res) => {
  try {
    const { myBadgeCode, friendBadgeCode } = req.params;
    await userFriendService.unfriendUser(myBadgeCode, friendBadgeCode);

    res.status(200).json({ message: "Friendship removed successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error unfriending user", error: error.message });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const { badgeCode } = req.params;
    const friendsList = await userFriendService.getAllFriends(badgeCode);

    if (friendsList.length === 0) {
      return res.status(404).json({ message: "No friends found" });
    }

    return res.status(200).json(friendsList);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching friends", error: error.message });
  }
};
