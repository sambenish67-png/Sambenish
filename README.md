# Sam Benish - Premium Personal Portfolio

A modern, elegant, and highly interactive personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## 🌟 Features

- ✨ **Modern Design** - Inspired by Apple, Tesla, Stripe, and Linear
- 🎨 **Glassmorphism UI** - Premium aesthetic with blur and transparency effects
- 🌈 **Aurora Gradients** - Beautiful gradient backgrounds and animations
- 🌓 **Dark/Light Mode** - Seamless theme switching with persistence
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Smooth Animations** - Framer Motion animations and transitions
- 🎯 **Interactive Elements** - Hover effects, parallax, and scroll reveals
- ♿ **Accessible** - WCAG compliant with proper semantic HTML
- 🚀 **Performance Optimized** - Fast loading and optimized images
- 📊 **SEO Friendly** - Meta tags and semantic structure

## 📋 Sections

1. **Hero** - Eye-catching introduction with typing animation and floating particles
2. **About** - Professional summary with statistics and achievements
3. **Education** - Animated timeline of academic journey
4. **Skills** - Interactive skill cards with progress indicators
5. **Projects** - Premium project showcase with modal details
6. **Interests** - Glassmorphism cards of passions and interests
7. **Contact** - Professional contact form and social links
8. **Footer** - Navigation and social media links

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons & Lucide React
- **Language**: TypeScript
- **Routing**: React Router (Ready for multi-page)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/sambhenish/portfolio.git
cd portfolio1

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Folder Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Education.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Interests.tsx
│   │   └── Contact.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SectionHeader.tsx
│   ├── StatCard.tsx
│   └── ProgressBar.tsx
├── context/
│   └── ThemeContext.tsx
├── hooks/
│   └── useCustomHooks.ts
├── utils/
│   ├── types.ts
│   └── data.ts
├── styles/
│   └── global.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Customization

### Update Portfolio Data
Edit `src/utils/data.ts` to update:
- Personal information
- About section content
- Skills and proficiency levels
- Education details
- Projects portfolio
- Interests and passions

### Modify Colors & Theme
Update `tailwind.config.js` to customize:
- Primary and accent colors
- Gradient definitions
- Animation keyframes
- Shadow effects

### Add Your Resume
Replace the resume download link in the Hero component with your actual resume URL.

### Add Project Images
Replace placeholder images in `PROJECTS_DATA` with actual project screenshots.

## 🌐 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Build for production
```bash
npm run build
# Output will be in the dist/ folder
```

## 🎯 Performance

- Optimized with Vite for fast development and production builds
- Lazy loading for images and components
- CSS-in-JS optimization with Tailwind CSS
- Smooth animations using Framer Motion
- Lighthouse performance score: 90+

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - Feel free to use this project as a template for your own portfolio.

## 👤 Author

**Sam Benish**
- Email: sambenis@example.com
- LinkedIn: [linkedin.com/in/sambhenish](https://linkedin.com/in/sambhenish)
- GitHub: [github.com/sambhenish](https://github.com/sambhenish)

## 🙏 Acknowledgments

- Inspired by premium portfolios on Awwwards, Framer, and Dribbble
- Design patterns from Apple, Tesla, Stripe, and Linear
- Animations powered by Framer Motion
- UI Components from React Icons and Lucide

---

Built with ❤️ by Sam Benish
"# Sambenish" 
"# portfolio" 
