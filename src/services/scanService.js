import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DTO as a function to transfer activity data back in the intended format
const activityDTO = (activity) => {
  return {
    activity_name: activity.activity_name,
    scanned_at: activity.scanned_at,
    activity_category: activity.activityCategory.activity_category,
  };
};

// scan user for activity
const scanUser = async (badgeCode, activityData) => {
  // check if you can add to user
  const existingUser = await prisma.user.findUnique({
    where: { badge_code: badgeCode },
  });

  // user doesn't exist, return null for controller to throw the 404 error
  if (!existingUser) {
    return null;
  }

  // create a current date object (instead of using new Date(); twice) to ensure date consistency
  const currentDate = new Date();

  // update user's updated_at field to match the current date
  await prisma.user.update({
    where: { badge_code: badgeCode },
    data: { updated_at: currentDate },
  });

  // use upsert to increment / add the scan count
  await prisma.activityCategory.upsert({
    where: { activity_name: activityData.activity_name },
    update: {
      scan_count: { increment: 1 },
    },
    create: {
      activity_name: activityData.activity_name,
      activity_category: activityData.activity_category,
      scan_count: 1,
    },
  });

  // create activity scan & include activityCategory
  const newActivity = await prisma.userActivity.create({
    data: {
      user_badge_code: existingUser.badge_code,
      activity_name: activityData.activity_name,
      scanned_at: currentDate,
    },
    include: {
      activityCategory: true,
    },
  });

  return activityDTO(newActivity);
};

// aggregate data endpoint, fetch directly from activityCategory table
const scans = async ({ min_frequency, max_frequency, activity_category }) => {
  // construct a custom object called "where" based on params, use it to filter
  const where = {};

  if (min_frequency) {
    where.scan_count = {
      ...(where.scan_count || {}),
      gte: parseInt(min_frequency, 10),
    };
  }

  if (max_frequency) {
    where.scan_count = {
      ...(where.scan_count || {}),
      lte: parseInt(max_frequency, 10),
    };
  }

  if (activity_category) {
    where.activity_category = activity_category;
  }

  // display fetched data
  const results = await prisma.activityCategory.findMany({
    where,
    select: {
      activity_name: true,
      scan_count: true,
      // just to show the activity category if needed
      activity_category: true,
    },
  });

  return results;
};

export default { scanUser, scans };
