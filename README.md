# AIIntern - AI-Powered Internship Platform


## 🚀 Overview

AIIntern is a cutting-edge internship platform that leverages artificial intelligence to connect students with the perfect internship opportunities. Our platform uses advanced matching algorithms to ensure students find internships that align with their skills, aspirations, and career goals.



## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern JavaScript library for building user interfaces
- **React Router DOM 7.9.1** - Client-side routing and navigation
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.23.16** - Animation and gesture library
- **PostCSS** - CSS post-processor for enhanced styling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aiintern.git
   cd aiintern
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.jsx        # Landing page hero section
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── Login.jsx       # Login form component
│   ├── Signup.jsx      # Registration form component
│   ├── ScrollingText.jsx # Animated news banner
│   └── ...
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── LoginPage.jsx   # Login page wrapper
│   ├── SignupPage.jsx  # Signup page wrapper
│   └── ...
├── layouts/            # Layout components
│   └── MainLayout.jsx  # Main application layout
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

### Tailwind CSS
The project uses Tailwind CSS with custom configuration:
- Custom color palette
- Extended animations
- Glass morphism utilities
- Responsive breakpoints



## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload the build folder to Netlify
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


For support, email support@aiintern.com or join our Discord community.

## 🔮 Roadmap

- [ ] Backend API integration
- [ ] User dashboard functionality
- [ ] Advanced AI matching algorithms
- [ ] Company portal
- [ ] Mobile app development
- [ ] Multi-language support

---

