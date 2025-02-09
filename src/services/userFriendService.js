import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Bonus: Add functionality to friend/unfriend two users + query friends of a user

// Assuming that a friendship is bidirectional!

// Endpoint to friend two users
const friendUser = async (myBadgeCode, friendBadgeCode) => {
  if (myBadgeCode === friendBadgeCode) {
    throw new Error("Cannot friend yourself.");
  }

  // try finding both users
  const myUser = await prisma.user.findUnique({
    where: { badge_code: myBadgeCode },
    include: {
      activities: {
        include: {
          activityCategory: true,
        },
      },
    },
  });

  if (!myUser) {
    throw new Error("User not found.");
  }

  const friendUser = await prisma.user.findUnique({
    where: { badge_code: friendBadgeCode },
    include: {
      activities: {
        include: {
          activityCategory: true,
        },
      },
    },
  });

  if (!friendUser) {
    throw new Error("Friend user not found.");
  }

  // check if friendship already exists (both ways)
  const existingFriendship = await prisma.userFriends.findFirst({
    where: {
      OR: [
        {
          user_badge_code: myBadgeCode,
          friend_badge_code: friendBadgeCode,
        },
        {
          user_badge_code: friendBadgeCode,
          friend_badge_code: myBadgeCode,
        },
      ],
    },
  });

  if (existingFriendship) {
    throw new Error("Friendship already exists.");
  }

  // add relation to the two users if not already friended
  try {
    await prisma.userFriends.create({
      data: {
        user_badge_code: myBadgeCode,
        friend_badge_code: friendBadgeCode,
        created_at: new Date(),
      },
    });
  } catch (error) {
    throw new Error("Error creating friendship.");
  }

  return true;
};

// Endpoint to unfriend two users
const unfriendUser = async (myBadgeCode, friendBadgeCode) => {
  // avoid unfriending yourself
  if (myBadgeCode === friendBadgeCode) {
    throw new Error("Cannot unfriend yourself.");
  }

  // try finding both users
  const myUser = await prisma.user.findUnique({
    where: { badge_code: myBadgeCode },
  });

  if (!myUser) {
    throw new Error("User not found.");
  }

  const otherUser = await prisma.user.findUnique({
    where: { badge_code: friendBadgeCode },
  });

  if (!otherUser) {
    throw new Error("Friend user not found.");
  }

  // check if friendship already exists (both ways)
  const existingFriendship = await prisma.userFriends.findFirst({
    where: {
      OR: [
        {
          user_badge_code: myBadgeCode,
          friend_badge_code: friendBadgeCode,
        },
        {
          user_badge_code: friendBadgeCode,
          friend_badge_code: myBadgeCode,
        },
      ],
    },
  });

  if (!existingFriendship) {
    throw new Error("Friendship does not exist.");
  }

  // remove the friendship records
  try {
    await prisma.userFriends.deleteMany({
      where: {
        OR: [
          {
            user_badge_code: myBadgeCode,
            friend_badge_code: friendBadgeCode,
          },
          {
            user_badge_code: friendBadgeCode,
            friend_badge_code: myBadgeCode,
          },
        ],
      },
    });
  } catch (error) {
    throw new Error("Error removing friendship.");
  }

  return true;
};

// Endpoint to get all friends of a user
const getAllFriends = async (badgeCode) => {
  // ensure user exists
  const user = await prisma.user.findUnique({
    where: { badge_code: badgeCode },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // find all friendship records
  const userFriendships = await prisma.userFriends.findMany({
    where: {
      OR: [{ user_badge_code: badgeCode }, { friend_badge_code: badgeCode }],
    },
  });

  // make them into the correct format
  const friendsList = userFriendships.map((friendship) => {
    const { user_badge_code, friend_badge_code, created_at } = friendship;

    // make sure that the badge code is the one of the friend
    const friendBadge =
      badgeCode === user_badge_code ? friend_badge_code : user_badge_code;

    return {
      friend: friendBadge,
      friends_since: created_at,
    };
  });

  return friendsList;
};

export default { friendUser, unfriendUser, getAllFriends };
