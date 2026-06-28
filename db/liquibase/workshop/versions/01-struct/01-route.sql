CREATE TABLE IF NOT EXISTS route (
	id SERIAL PRIMARY KEY,
  "resourceId" INT NOT NULL,
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
  "updaterName" TEXT,
  CHECK ("resourceId">=0),
  CONSTRAINT fk_route_resource
		FOREIGN KEY ("resourceId") REFERENCES resource (id)
		ON DELETE CASCADE
    ON UPDATE CASCADE
);
