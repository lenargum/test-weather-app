# Weather SPA

A modern, responsive weather application built with Vue 3 and TypeScript. Features real-time weather data, elegant animations, and a comprehensive design system.

## 🌟 Features

### Core Functionality
- **Real-time Weather Data**: Current weather, hourly forecasts, and 7-day outlook
- **Popular Cities**: Pre-configured list of major Russian cities
- **Dual View Modes**: Current weather dashboard and weekly forecast
- **Responsive Design**: Optimized for desktop and mobile devices

### User Experience
- **Smooth Animations**: Fade transitions for loading states and tab switching
- **Skeleton Loading**: Professional loading states with shimmer effects
- **Persistent State**: localStorage integration for selected city and active tab
- **Dynamic Page Title**: Browser tab shows current city and temperature
- **Accessibility**: Full keyboard navigation and ARIA attributes

### Technical Features
- **Vue 3 Composition API**: Modern reactive architecture
- **TypeScript**: Full type safety throughout the application
- **Custom Design System**: Consistent typography and spacing scales
- **Component Architecture**: Reusable UI components with props/emits pattern
- **Weather Icons**: SVG-based weather icon system
- **API Integration**: Open-Meteo weather and geocoding services

## 🛠 Tech Stack

- **Frontend**: Vue 3, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with custom properties (CSS variables)
- **APIs**: Open-Meteo Weather API, Open-Meteo Geocoding API
- **Fonts**: Geologica font family

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Select.vue          # Dropdown selector with keyboard navigation
│   │   ├── Tabs.vue            # Tab switcher component
│   │   ├── WeatherIcon.vue     # Dynamic weather icons
│   │   ├── SkeletonLoader.vue  # Loading state component
│   │   └── CitySelect.vue      # City selection component
│   ├── icons/
│   │   ├── IconChevron.vue     # Chevron icon for dropdowns
│   │   └── weather/            # Weather-specific SVG icons
│   │       ├── IconSunny.vue   # Clear weather icon
│   │       ├── IconCloudy.vue  # Cloudy weather icon
│   │       ├── IconRainy.vue   # Rainy weather icon
│   │       └── IconWindy.vue   # Windy weather icon
│   ├── CurrentWeather.vue      # Main weather display
│   ├── HourlyForecast.vue      # Hourly weather table
│   ├── WeeklyForecast.vue      # 7-day forecast
│   └── PopularCities.vue       # City grid component
├── composables/
│   └── useWeather.ts           # Weather data management
├── styles/
│   ├── fonts.css              # Font-face declarations
│   └── variables.css          # Design tokens
├── fonts/                     # Geologica font family files
│   └── *.ttf                  # Various weights and styles
├── utils/
│   └── weatherCodes.ts        # Weather code mappings
├── types.ts                   # TypeScript definitions
├── constants.ts               # Application constants
├── index.css                  # Global styles
├── main.ts                    # Application entry point
└── App.vue                    # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zvonok-weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

6. **Type checking**
   ```bash
   npm run typecheck
   ```

## 🚀 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment
1. **Enable GitHub Pages**: Go to repository Settings → Pages → Source: "GitHub Actions"
2. **Push to main branch**: The workflow automatically builds and deploys
3. **Access your site**: `https://USERNAME.github.io/zvonok-weather/`

### Manual Deployment Setup
1. **Replace USERNAME**: Update URLs in `index.html` and `sitemap.xml` with your GitHub username
2. **Install gh-pages** (optional for manual deployment):
   ```bash
   npm install --save-dev gh-pages
   ```
3. **Manual deploy**:
   ```bash
   npm run deploy
   ```

### Configuration Details
- **Base path**: Configured in `vite.config.ts` for GitHub Pages subdirectory
- **Workflow**: `.github/workflows/deploy.yml` handles CI/CD
- **Permissions**: Configured for GitHub Pages deployment
- **Compression**: Build includes gzip and brotli compressed assets

## 🎨 Design System

### Typography Scale
- **Base font size**: 18px
- **Scale**: h1 (72px) → h4 (36px) → p1 (24px) → p4 (14px)
- **Line height**: 120% design standard
- **Letter spacing**: -1% for improved readability

### Color System
- CSS custom properties for consistent theming
- Gradient backgrounds and borders
- Semantic color naming (primary, text, surface)

### Spacing System
- Consistent gap and padding scales
- Responsive page padding (40px → 24px → 16px)
- Grid-based layouts with flexible gaps

## 🔧 Architecture Details

### State Management
- **Reactive Data**: Vue 3 Composition API with `ref` and `computed`
- **Persistence**: localStorage integration for user preferences
- **Error Handling**: Comprehensive error states and messages

### API Integration
- **Weather Data**: Open-Meteo API for current and forecast data
- **Geocoding**: City name to coordinates conversion
- **Parallel Fetching**: Optimized API calls with Promise.all()

### Component Patterns
- **Props/Emits**: Type-safe component communication
- **v-model**: Two-way data binding for form components
- **Slot-based**: Flexible component composition
- **Transition**: Vue 3 transition system for animations

### Performance Optimizations
- **Skeleton Loading**: Prevents layout shifts
- **Efficient Re-renders**: Computed properties and watchers
- **Asset Optimization**: SVG icons and custom fonts
- **Responsive Images**: Proper sizing and loading

## 🌍 Supported Cities

The application includes weather data for major Russian cities:
- Москва (Moscow)
- Казань (Kazan)
- Новосибирск (Novosibirsk)
- Краснодар (Krasnodar)
- Красноярск (Krasnoyarsk)
- Уфа (Ufa)

## 📱 Browser Support

- Modern browsers with ES2020 support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design from 320px to 1440px+

## 🤝 Contributing

This is a test project for frontend developer applications. The codebase demonstrates:

- **Professional Code Quality**: TypeScript, proper architecture, error handling
- **Modern Vue 3 Patterns**: Composition API, reactive design, component composition
- **UX Excellence**: Animations, accessibility, responsive design
- **Production Ready**: Build optimization, performance considerations

## 📄 License

ISC License

---

Built with ❤️ using Vue 3, TypeScript, and modern web standards.