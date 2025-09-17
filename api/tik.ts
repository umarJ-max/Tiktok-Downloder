import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { url } = req.query;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'URL parameter is required'
      });
    }

    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com|m\.tiktok\.com)\/.+/i;
    if (!tiktokRegex.test(url)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid TikTok URL format'
      });
    }

    const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const data = await response.json();

    if (data.code !== 0) {
      return res.status(400).json({
        success: false,
        message: data.msg || 'Failed to process video'
      });
    }

    res.json({
      success: true,
      data: {
        title: data.data.title,
        author: data.data.author.nickname,
        video: data.data.play,
        thumbnail: data.data.cover,
        duration: data.data.duration
      }
    });
  } catch (error) {
    console.error('TikTok API error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing video'
    });
  }
}