import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const dataPath = path.join(__dirname, "example_data.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const users = JSON.parse(rawData);

  const activityData = {};

  for (const record of users) {
    const { badge_code, name, email, phone, scans } = record;

    // Upsert User
    const user = await prisma.user.upsert({
      where: { badge_code: badge_code },
      update: {
        name: name,
        email: email,
        phone: phone,
      },
      create: {
        badge_code: badge_code,
        name: name,
        email: email,
        phone: phone,
        created_at: new Date(),
        // assuming creation counts as updating
        updated_at: new Date(),
      },
    });

    console.log(`Upserted user: ${user.badge_code}`);

    // Create new Activity records for each scan
    for (const scan of scans) {
      const { activity_name, activity_category, scanned_at } = scan;

      await prisma.activityCategory.upsert({
        where: { activity_name },
        update: {
          scan_count: {
            increment: 1,
          },
        },
        create: {
          activity_name,
          activity_category,
          scan_count: 1,
        },
      });

      // Create activity record for the user
      const activity = await prisma.userActivity.create({
        data: {
          user_badge_code: user.badge_code,
          activity_name,
          scanned_at: new Date(scanned_at),
        },
      });

      console.log(
        `Created activity: ${activity.activity_id} for user: ${user.badge_code}`
      );
    }
  }

  console.log("Data ingestion completed!");
}

main()
  .catch((error) => {
    console.error("Error migrating data:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
