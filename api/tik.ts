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

    // For mobile URLs, use a different approach
    let finalUrl = url;
    if (url.includes('vt.tiktok.com') || url.includes('vm.tiktok.com')) {
      try {
        const redirectResponse = await fetch(url, { 
          redirect: 'follow',
          headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
          }
        });
        finalUrl = redirectResponse.url;
        console.log('Resolved URL:', finalUrl);
      } catch (error) {
        console.log('Redirect failed:', error);
        finalUrl = url;
      }
    }

    const encodedUrl = encodeURIComponent(finalUrl);
    const apiUrl = `https://batgpt.vercel.app/api/tik?url=${encodedUrl}`;
    console.log('API URL:', apiUrl);
    
    const response = await fetch(apiUrl);
    const text = await response.text();
    console.log('API Response:', text.substring(0, 200));
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.log('JSON Parse Error:', parseError);
      return res.status(500).json({
        success: false,
        message: `Parse error: ${text.substring(0, 100)}`
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