# 🎵 TikTok Video Downloader

A modern, responsive web application for downloading TikTok videos without watermarks. Built with React, TypeScript, and Express.js.

![TikTok Downloader](https://img.shields.io/badge/TikTok-Downloader-FF0050?style=for-the-badge&logo=tiktok&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4-000000?style=for-the-badge&logo=express&logoColor=white)

## ✨ Features

- 🎯 **Direct Downloads** - Get videos without watermarks instantly
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- 🎨 **Modern UI** - TikTok-inspired design with beautiful gradients
- ⚡ **Fast Processing** - Quick video analysis and download preparation
- 🔒 **No CORS Issues** - Server-side API proxy for reliable requests
- 🎵 **Audio Downloads** - Optional audio-only downloads
- 💯 **Free to Use** - No registration or payment required

## 🚀 Demo

Simply paste any TikTok video URL and click "Get Video" to start downloading!

**Supported URL formats:**
- `https://tiktok.com/@username/video/1234567890`
- `https://vm.tiktok.com/ZSHn28CFT/`
- `https://www.tiktok.com/@username/video/1234567890`

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful and accessible UI components
- **TanStack Query** - Data fetching and caching
- **Wouter** - Lightweight client-side routing

### Backend
- **Express.js** - Fast, unopinionated web framework
- **Node.js** - JavaScript runtime
- **CORS Proxy** - Handles external API requests

### Development
- **Vite** - Lightning-fast build tool
- **ESLint & Prettier** - Code formatting and linting
- **Hot Module Replacement** - Instant development feedback

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/umarJ-max/Tiktok-Downloder.git
   cd Tiktok-Downloder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 🎯 Usage

1. **Enter TikTok URL**: Paste any TikTok video URL in the input field
2. **Click "Get Video"**: The app will process the video and show a preview
3. **Download**: Choose between video download or audio-only download
4. **Enjoy**: Your download will start automatically!

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done!)
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect and deploy

3. **Environment Setup**:
   ```bash
   # No environment variables needed!
   ```

### Deploy to Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repo to Netlify

### Deploy to Railway/Render

1. **Connect your repository**
2. **Set build command**: `npm run build`
3. **Set start command**: `npm start`

## 🔧 Configuration

### API Endpoints

The application uses a server-side proxy to handle TikTok API requests:

- `GET /api/tik?url={encoded_tiktok_url}` - Process TikTok video

### Environment Variables

No environment variables required! The app works out of the box.

## 📱 Screenshots

### Desktop View
- Clean, modern interface with TikTok-inspired design
- Responsive layout that works on all screen sizes

### Mobile View  
- Mobile-first design optimized for touch devices
- Easy-to-use interface on phones and tablets

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **TikTok API Provider** - Thanks to the external API service
- **Shadcn/UI** - For the beautiful component library
- **Tailwind CSS** - For the utility-first CSS framework

## ⚠️ Disclaimer

This tool is for educational and personal use only. Please respect TikTok's terms of service and content creators' rights. Do not use this tool to download copyrighted content without permission.

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/umarJ-max/Tiktok-Downloder/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide as much detail as possible about your issue

---

**Developed with ❤️ by [Umar J](https://github.com/umarJ-max)**

⭐ **Star this repository if you found it helpful!**