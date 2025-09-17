const API_BASE = 'https://batgpt.vercel.app/api/tik?url=';

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
    const data = await response.json();
    
    if (!response.ok || !data.success) {
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
