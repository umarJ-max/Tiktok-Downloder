import { Button } from "@/components/ui/button";
import { Play, Download, User } from "lucide-react";

interface VideoData {
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

interface VideoPreviewProps {
  videoData: VideoData;
  onDownload: (url: string, label: string) => void;
}

export default function VideoPreview({ videoData, onDownload }: VideoPreviewProps) {
  return (
    <div data-testid="video-preview" className="max-w-2xl mx-auto">
      <div className="video-card rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Video Thumbnail */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                data-testid="img-video-thumbnail"
                src={videoData.videoInfo.coverImage}
                alt="Video thumbnail"
                className="w-full md:w-32 h-40 md:h-40 object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/128x160/1a1a1a/ffffff?text=TikTok";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          {/* Video Info */}
          <div className="flex-1">
            <h3 data-testid="text-video-title" className="text-lg font-semibold mb-2 line-clamp-2">
              {videoData.videoInfo.title || "TikTok Video"}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>TikTok Video</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Ready to download</span>
              </div>
            </div>
            
            {/* Download Options */}
            <div className="space-y-3">
              <div data-testid="download-options" className="space-y-2">
                {videoData.links.map((link, index) => {
                  const label = index === 0 ? "Download HD (No Watermark)" : `Download Option ${index + 1}`;
                  const isPrimary = index === 0;
                  
                  return (
                    <Button
                      key={index}
                      data-testid={`button-download-option-${index}`}
                      onClick={() => onDownload(link, label)}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isPrimary 
                          ? 'download-btn text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground hover:bg-opacity-80'
                      }`}
                      variant={isPrimary ? "default" : "secondary"}
                    >
                      <Download className="w-4 h-4" />
                      <span>{label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
