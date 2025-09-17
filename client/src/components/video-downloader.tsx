import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fetchVideoData } from "@/lib/api";
import { isValidTikTokUrl } from "@/lib/validation";
import VideoPreview from "./video-preview";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

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

export default function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const mutation = useMutation<VideoData, Error, string>({
    mutationFn: fetchVideoData,
    onSuccess: (data) => {
      setVideoData(data);
      setError(null);
      setSuccess("Video processed successfully! Choose your download option below.");
    },
    onError: (error) => {
      setError(error.message || "Failed to process the TikTok video. Please check the URL and try again.");
      setSuccess(null);
      setVideoData(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    
    if (!trimmedUrl) {
      setError("Please enter a TikTok video URL");
      return;
    }

    if (!isValidTikTokUrl(trimmedUrl)) {
      setError("Please enter a valid TikTok video URL");
      return;
    }

    setError(null);
    setSuccess(null);
    mutation.mutate(trimmedUrl);
  };

  const handleDownload = (downloadUrl: string, label: string) => {
    window.open(downloadUrl, '_blank');
    setSuccess(`${label} started! Check your browser downloads.`);
  };

  const clearMessages = () => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 2000);
  };

  return (
    <>
      {/* URL Input Section */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Download TikTok Videos</h2>
          <p className="text-muted-foreground">Paste the TikTok video URL below to get started</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="gradient-border">
              <Input
                data-testid="input-video-url"
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error || success) clearMessages();
                }}
                placeholder="Paste TikTok video URL here..."
                className="w-full px-4 py-4 bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-lg border-0"
              />
            </div>
            <Button
              data-testid="button-download"
              type="submit"
              disabled={mutation.isPending}
              className="w-full download-btn text-primary-foreground px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Get Video"
              )}
            </Button>
          </div>
        </form>
        
        {/* Status Messages */}
        {error && (
          <Alert data-testid="alert-error" className="mt-4 error-message">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-400">
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert data-testid="alert-success" className="mt-4 success-message">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-400">
              {success}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Video Preview */}
      {videoData && (
        <VideoPreview 
          videoData={videoData} 
          onDownload={handleDownload}
        />
      )}
    </>
  );
}
