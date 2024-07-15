-- DropIndex
DROP INDEX "contacts_first_name_key";

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "addressId" TEXT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT,
    "city" TEXT NOT NULL,
    "province" TEXT,
    "country" TEXT,
    "postal_code" TEXT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
