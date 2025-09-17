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

    // Resolve short URLs to get the actual TikTok URL
    let finalUrl = url;
    if (url.includes('vt.tiktok.com') || url.includes('vm.tiktok.com')) {
      const redirectResponse = await fetch(url, { redirect: 'follow' });
      finalUrl = redirectResponse.url;
    }

    const encodedUrl = encodeURIComponent(finalUrl);
    const apiUrl = `https://batgpt.vercel.app/api/tik?url=${encodedUrl}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: 'Failed to process video'
      });
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(500).json({
        success: false,
        message: 'Invalid response from TikTok service'
      });
    }

    try {
      const data = await response.json();
      res.json(data);
    } catch (parseError) {
      return res.status(500).json({
        success: false,
        message: 'Failed to parse response from TikTok service'
      });
    }
  } catch (error) {
    console.error('TikTok API proxy error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing video'
    });
  }
}