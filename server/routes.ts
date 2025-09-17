import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // TikTok Video API proxy to avoid CORS issues
  app.get("/api/tik", async (req, res) => {
    try {
      const { url } = req.query;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "URL parameter is required" 
        });
      }

      // Validate TikTok URL format
      const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)\/.+/i;
      if (!tiktokRegex.test(url)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid TikTok URL format" 
        });
      }

      // Make request to external TikTok API
      const encodedUrl = encodeURIComponent(url);
      const apiUrl = `https://batgpt.vercel.app/api/tik?url=${encodedUrl}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          success: false, 
          message: data.message || "Failed to process video" 
        });
      }
      
      res.json(data);
    } catch (error) {
      console.error('TikTok API proxy error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error while processing video" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
