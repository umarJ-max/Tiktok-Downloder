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

    const response = await fetch('https://www.tikwm.com/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(url)}&hd=1`
    });

    const data = await response.json();

    if (data.code !== 0) {
      return res.status(400).json({
        success: false,
        message: 'Failed to process video'
      });
    }

    res.json({
      success: true,
      links: [data.data.hdplay || data.data.play],
      note: 'Video downloaded successfully',
      videoInfo: {
        title: data.data.title,
        videoUrl: data.data.hdplay || data.data.play,
        coverImage: data.data.cover,
        musicUrl: data.data.music || ''
      }
    });
  } catch (error) {
    console.error('TikTok API error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process TikTok URL'
    });
  }
}