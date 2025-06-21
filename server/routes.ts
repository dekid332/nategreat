import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { leaderboard, insertLeaderboardSchema, type InsertLeaderboardEntry } from "../shared/schema";
import { desc, sql } from "drizzle-orm";

const client = neon(process.env.DATABASE_URL!);
const db = drizzle(client);

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get leaderboard scores
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const scores = await db
        .select()
        .from(leaderboard)
        .orderBy(desc(leaderboard.score))
        .limit(100);
      
      res.json(scores);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Submit new score
  app.post("/api/leaderboard", async (req, res) => {
    try {
      const data = insertLeaderboardSchema.parse(req.body);
      
      const [newEntry] = await db
        .insert(leaderboard)
        .values(data)
        .returning();
      
      res.json(newEntry);
    } catch (error) {
      console.error("Error submitting score:", error);
      res.status(500).json({ error: "Failed to submit score" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
