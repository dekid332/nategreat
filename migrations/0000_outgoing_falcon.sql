CREATE TABLE "leaderboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_name" text NOT NULL,
	"score" integer NOT NULL,
	"wallet" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
