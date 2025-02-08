-- CreateTable
CREATE TABLE "User" (
    "badge_code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ActivityCategory" (
    "activity_name" TEXT NOT NULL PRIMARY KEY,
    "activity_category" TEXT NOT NULL,
    "scan_count" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UserActivity" (
    "user_badge_code" TEXT NOT NULL,
    "activity_name" TEXT NOT NULL,
    "scanned_at" DATETIME NOT NULL,

    PRIMARY KEY ("user_badge_code", "activity_name", "scanned_at"),
    CONSTRAINT "UserActivity_user_badge_code_fkey" FOREIGN KEY ("user_badge_code") REFERENCES "User" ("badge_code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserActivity_activity_name_fkey" FOREIGN KEY ("activity_name") REFERENCES "ActivityCategory" ("activity_name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
