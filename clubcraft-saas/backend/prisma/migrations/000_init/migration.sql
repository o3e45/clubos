CREATE TYPE "Role" AS ENUM ('Owner', 'Admin', 'Treasurer', 'Member', 'Viewer');

CREATE TABLE "Club" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Member" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "fullName" TEXT NOT NULL,
  "role" "Role" DEFAULT 'Viewer',
  "clubId" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_member_club FOREIGN KEY("clubId") REFERENCES "Club"("id") ON DELETE CASCADE
);

CREATE TABLE "Transaction" (
  "id" TEXT PRIMARY KEY,
  "clubId" TEXT NOT NULL,
  "amount" DECIMAL(18,2) NOT NULL,
  "type" TEXT NOT NULL,
  "occurredAt" TIMESTAMP NOT NULL,
  "metadata" JSONB,
  CONSTRAINT fk_transaction_club FOREIGN KEY("clubId") REFERENCES "Club"("id") ON DELETE CASCADE
);

CREATE TABLE "Property" (
  "id" TEXT PRIMARY KEY,
  "clubId" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "valuation" DECIMAL(18,2),
  "acquiredAt" TIMESTAMP,
  CONSTRAINT fk_property_club FOREIGN KEY("clubId") REFERENCES "Club"("id") ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_club_timestamp
BEFORE UPDATE ON "Club"
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
