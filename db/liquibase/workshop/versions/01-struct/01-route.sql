CREATE TABLE IF NOT EXISTS route (
	id SERIAL PRIMARY KEY,
  pattern varchar(50) NOT NULL,
  name varchar(50) NULL,
  description varchar(100) NULL,
  protected BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  "archivedAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "creatorId" INT,
  "creatorName" TEXT,
  "updatedAt" TIMESTAMP NULL,
  "updaterId" INT,
  "updaterName" TEXT
);
