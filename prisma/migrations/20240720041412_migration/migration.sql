-- DropIndex
DROP INDEX "contacts_phone_key";

-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE TEXT;
