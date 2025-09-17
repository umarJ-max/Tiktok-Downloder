const API_BASE = '/api/tik?url=';

export interface VideoData {
  success: boolean;
  links: string[];
  note: string;
  videoInfo: {
    title: string;
    videoUrl: string;
    coverImage: string;
    musicUrl: string;
  };
}

export async function fetchVideoData(url: string): Promise<VideoData> {
  try {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `${API_BASE}${encodedUrl}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API Error: ${response.status} - ${text.substring(0, 100)}`);
    }
    
    const text = await response.text();
    let data;
    
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
    }
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to process video');
    }
    
    if (!data.links || data.links.length === 0) {
      throw new Error('No download links available');
    }
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to process the TikTok video. Please check the URL and try again.');
  }
}
