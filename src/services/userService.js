import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DTO as a function to transfer user data back in the intended format
// Converts dates back to ISO 8601 string form
const userDto = (user) => {
  if (!user) {
    return null;
  }

  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    badge_code: user.badge_code,
    updated_at: user.updated_at,
    scans: user.activities.map((activity) => ({
      activity_name: activity.activity_name,
      scanned_at: activity.scanned_at.toISOString(),
      // pull activity_category from the respective database
      activity_category: activity.activityCategory.activity_category,
    })),
  };
};

// get all users
const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      activities: {
        include: {
          activityCategory: true,
        },
      },
    },
  });

  return users.map((user) => userDto(user));
};

// get user via badge code
const getUserByBadge = async (badgeCode) => {
  const user = await prisma.user.findUnique({
    where: { badge_code: badgeCode },
    include: {
      activities: {
        include: {
          activityCategory: true,
        },
      },
    },
  });

  return userDto(user);
};

// update user via badge code
// NOTE: assuming that only name, phone, and email can be changed here
const updateUser = async (code, data) => {
  // check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: { badge_code: code },
  });

  // user doesn't exist, return null for controller to throw the 404 error
  if (!existingUser) {
    return null;
  }

  // check if fields are valid + make the new data to be updated
  const allowedFields = ["name", "email", "phone"];

  const updateData = {};
  for (const key in data) {
    if (allowedFields.includes(key)) {
      updateData[key] = data[key];
    } else {
      throw new Error(`Invalid update field: ${key} provided.`);
    }
  }

  // if no valid fields are provided, return an error
  if (Object.keys(updateData).length === 0) {
    throw new Error("No update data provided.");
  }

  /*
   * Since email, phone number, and badge code are unique,
   * no need to have additional checks for them,
   * let prisma handle it to avoid extra computation per query.
   *
   * Design Consideration: Could use manual checking for user-friendly errors.
   */

  // Code below does manual checking for email uniqueness:

  // if ("email" in updateData) {
  //   const emailExists = await prisma.user.findUnique({
  //     where: { email: updateData.email },
  //   });

  //   if (emailExists && emailExists.badge_code !== code) {
  //     throw new Error(
  //       `Email ${updateData.email} is already in use by another user.`
  //     );
  //   }
  // }

  // refresh updated_at to reflect the current time (UTC)
  updateData.updated_at = new Date();

  // update user and return formatted response
  const updatedUser = await prisma.user.update({
    where: { badge_code: code },
    data: updateData,
    include: {
      activities: {
        include: {
          activityCategory: true,
        },
      },
    },
  });

  return userDto(updatedUser);
};

export default { getAllUsers, getUserByBadge, updateUser };
