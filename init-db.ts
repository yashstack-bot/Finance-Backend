import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Creating tables manually...");
  // This sends raw SQL to your SQLite file to create the User table
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "email" TEXT NOT NULL,
      "password" TEXT NOT NULL,
      "role" TEXT NOT NULL DEFAULT 'VIEWER',
      "isActive" BOOLEAN NOT NULL DEFAULT true
    );
  `);
  
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Record" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "amount" REAL NOT NULL,
      "type" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "description" TEXT,
      "userId" INTEGER NOT NULL,
      CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);
  console.log("✅ Tables created successfully in dev.db!");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());