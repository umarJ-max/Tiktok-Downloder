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

    // Resolve mobile short URLs to full TikTok URLs
    let finalUrl = url;
    if (url.includes('vt.tiktok.com') || url.includes('vm.tiktok.com')) {
      try {
        const redirectResponse = await fetch(url, { 
          method: 'HEAD',
          redirect: 'follow'
        });
        finalUrl = redirectResponse.url;
      } catch {
        // If redirect fails, try with original URL
        finalUrl = url;
      }
    }

    const encodedUrl = encodeURIComponent(finalUrl);
    const apiUrl = `https://batgpt.vercel.app/api/tik?url=${encodedUrl}`;
    
    const response = await fetch(apiUrl);
    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        success: false,
        message: 'Invalid response from TikTok service'
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.message || 'Failed to process video'
      });
    }

    res.json(data);
  } catch (error) {
    console.error('TikTok API proxy error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing video'
    });
  }
}