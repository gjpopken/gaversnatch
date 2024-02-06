-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "access_level" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "ai_adventures" (
  "id" SERIAL PRIMARY KEY,
  "adventure_text" VARCHAR(500) NOT NULL,
  "type" VARCHAR(10) NOT NULL,
  "story_id" INTEGER NOT NULL,
  "order" INTEGER NOT NULL,
  FOREIGN KEY ("story_id") REFERENCES "story"("id")
);

CREATE TABLE "story" (
  "id" SERIAL PRIMARY KEY,
  "story_name" VARCHAR(80) NOT NULL,
  "user_id" INTEGER NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

CREATE TABLE "items" (
  "id" SERIAL PRIMARY KEY,
  "item_name" VARCHAR(80) NOT NULL,
  "description" VARCHAR NOT NULL
);

CREATE TABLE "player_stats" (
  "id" SERIAL PRIMARY KEY,
  "story_id" INTEGER NOT NULL,
  "health" INTEGER NOT NULL DEFAULT 100,
  "attack" INTEGER NOT NULL DEFAULT 5,
  "defense" INTEGER NOT NULL DEFAULT 5,
  FOREIGN KEY ("story_id") REFERENCES "story"("id")
);

CREATE TABLE "baseMode_adventures" (
  "id" SERIAL PRIMARY KEY,
  "story_id" INTEGER NOT NULL,
  "history" JSON NOT NULL,
  FOREIGN KEY ("story_id") REFERENCES "story"("id")
);

CREATE TABLE "inventory" (
  "id" SERIAL PRIMARY KEY,
  "item_id" INTEGER NOT NULL,
  "story_id" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL,
  FOREIGN KEY ("item_id") REFERENCES "items"("id"),
  FOREIGN KEY ("story_id") REFERENCES "story"("id")
);


-- What I'm using in my database so far:
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "story" (
  "id" SERIAL PRIMARY KEY,
  "story_name" VARCHAR(80) NOT NULL,
  "user_id" INTEGER NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

CREATE TABLE "baseMode_adventures" (
  "id" SERIAL PRIMARY KEY,
  "story_id" INTEGER NOT NULL,
  "history" JSONB NOT NULL,
  FOREIGN KEY ("story_id") REFERENCES "story"("id")
);
DROP TABLE "baseMode_adventures";

CREATE TABLE "items" (
  "id" SERIAL PRIMARY KEY,
  "item_name" VARCHAR(80) NOT NULL,
  "description" VARCHAR NOT NULL
);

CREATE TABLE "inventory" (
  "id" SERIAL PRIMARY KEY,
  "item_id" INTEGER NOT NULL,
  "story_id" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL,
  FOREIGN KEY ("item_id") REFERENCES "items"("id"),
  FOREIGN KEY ("story_id") REFERENCES "story"("id")
);

INSERT INTO "story" ("story_name", "user_id")
VALUES
('Test Game', 1);

INSERT INTO "baseMode_adventures" ("story_id", "history")
VALUES (1, '{
        "adventure_text": [
            { "creator": "user", "content": "Move left" },
            { "creator": "comp", "content": "You''ve entered a room with tall windows. In the corner there is a Taffany lamp." }
        ],
        "current_room": ["1.1", "1.2"],
        "rooms_state": {
            "0.0": { "description": "This is red room.", "isOpen": 1, "items": [1, 5, 7] },
            "0.1": { "description": "This is green room.", "isOpen": 0 },
            "0.2": { "description": "This is blue room.", "isOpen": 1 }
        }
    }');

UPDATE "baseMode_adventures" SET "history" = '{
        "adventure_text": [
            { "creator": "user", "content": "Move left" },
            { "creator": "comp", "content": "You''ve entered a room with tall windows. In the corner there is a Taffany lamp." }
        ],
        "current_room": ["1.1", "1.2"],
        "rooms_state": {
            "0.0": { "description": "This is red room.", "isOpen": 1, "items": [1, 5, 7] },
            "0.1": { "description": "This is green room.", "isOpen": 0 },
            "0.2": { "description": "This is TEST room.", "isOpen": 1 }
        }
    }' 
WHERE "id" = 1;

DELETE FROM "baseMode_adventures";
