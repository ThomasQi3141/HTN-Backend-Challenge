import userService from "../services/userService.js";

// endpoint to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// endpoint to get user by badge code
export const getUserByBadge = async (req, res) => {
  try {
    const { code } = req.params;
    const user = await userService.getUserByBadge(code);

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// endpoint to update user (can provide any number of valid fields)
export const updateUser = async (req, res) => {
  try {
    const { code } = req.params;
    const user = await userService.updateUser(code, req.body);

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};
