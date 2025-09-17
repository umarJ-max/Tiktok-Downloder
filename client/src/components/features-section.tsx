import { Shield, Zap, Gift } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "No Watermark",
      description: "Download TikTok videos without any watermarks for clean, professional content."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Our optimized servers ensure quick processing and downloads every time."
    },
    {
      icon: Gift,
      title: "100% Free",
      description: "No hidden fees, no registration required. Download as many videos as you want."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Why Choose Our TikTok Downloader?</h2>
        <p className="text-muted-foreground">Fast, reliable, and completely free</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="text-center p-6" data-testid={`feature-${index}`}>
              <div className="w-16 h-16 tiktok-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
