# Weather SPA

A modern, responsive weather application built with Vue 3 and TypeScript. Features real-time weather data, elegant animations, and a comprehensive design system.

## 🌟 Features

### Core Functionality

- **Real-time Weather Data**: Current weather, hourly forecasts, and 7-day outlook
- **Popular Cities**: Pre-configured list of major Russian cities
- **Dual View Modes**: Current weather dashboard and weekly forecast
- **Responsive Design**: Optimized for desktop and mobile devices

### User Experience

- **Smooth Animations**: Vue transitions with Tailwind CSS animations
- **Advanced Skeleton Loading**: Intelligent skeletons that inherit font styles and responsive sizing
- **Persistent State**: localStorage integration for selected city and active tab
- **Dynamic Page Title**: Browser tab shows current city and temperature
- **Enhanced Accessibility**: Full keyboard navigation, typeahead search, and ARIA attributes
- **Error Handling**: User-friendly error messages for network and API failures
- **Mobile-First Design**: Optimized layouts for all screen sizes (320px to 1440px+)

### Technical Features

- **Vue 3 Composition API**: Modern reactive architecture with full TypeScript support
- **Advanced Type System**: Inheritance-based type structure with BaseWeather and composed types
- **Tailwind CSS v4**: CSS-first configuration with @theme directive and custom design tokens
- **Optimized Font Loading**: Strategic font-weight selection (100-600) for performance
- **Component Architecture**: Reusable UI components with proper TypeScript interfaces
- **Smart Select Component**: Advanced dropdown with typeahead search and keyboard navigation
- **SVG Icon System**: Dynamic weather icons with responsive sizing
- **Centralized State**: Clean separation of concerns with composable patterns

## 🛠 Tech Stack

- **Frontend**: Vue 3, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with @theme configuration
- **APIs**: Open-Meteo Weather API, Open-Meteo Geocoding API
- **Fonts**: Geologica font family (optimized weights)
- **Linting**: ESLint with Prettier integration

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── UISelect.vue        # Advanced dropdown with typeahead and keyboard navigation
│   │   ├── UITabs.vue          # Tab switcher component  
│   │   ├── WeatherIcon.vue     # Dynamic SVG weather icons
│   │   └── SkeletonLoader.vue  # Intelligent loading state component
│   ├── icons/
│   │   ├── IconChevron.vue     # Chevron icon for dropdowns
│   │   └── weather/            # Weather-specific SVG icons
│   │       ├── IconSunny.vue   # Clear weather icon
│   │       ├── IconCloudy.vue  # Cloudy weather icon
│   │       ├── IconRainy.vue   # Rainy weather icon
│   │       └── IconWindy.vue   # Windy weather icon
│   ├── CurrentWeather.vue      # Main weather display with responsive design
│   ├── HourlyForecast.vue      # Mobile-optimized hourly weather table
│   ├── WeeklyForecast.vue      # Responsive 7-day forecast with grid/flex layouts
│   └── PopularCities.vue       # City grid with gradient cards
├── composables/
│   └── useWeather.ts           # Weather data management with error handling
├── styles/
│   ├── fonts.css              # Optimized Geologica font-face declarations
│   └── index.css              # Tailwind CSS v4 with @theme configuration
├── fonts/                     # Geologica font family files (weights 100-600)
│   └── *.ttf                  # Various weights and styles
├── utils/
│   └── weatherCodes.ts        # Weather code mappings and descriptions
├── types.ts                   # Inheritance-based TypeScript type definitions
├── constants.ts               # Application constants
├── main.ts                    # Application entry point
└── App.vue                    # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v24 or higher)
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

7. **Linting and Formatting**
   ```bash
   npm run lint          # ESLint check
   npm run lint:fix      # Auto-fix ESLint issues
   npm run format        # Format with Prettier
   ```

## 🚀 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment

1. **Enable GitHub Pages**: Go to repository Settings → Pages → Source: "GitHub Actions"
2. **Push to main branch**: The workflow automatically builds and deploys
3. **Access your site**: `https://USERNAME.github.io/zvonok-weather/`

### Configuration Details

- **Base path**: Configured in `vite.config.ts` for GitHub Pages subdirectory
- **Workflow**: `.github/workflows/deploy.yml` handles CI/CD
- **Permissions**: Configured for GitHub Pages deployment
- **Compression**: Build includes gzip and brotli compressed assets

## 🎨 Design System

### Tailwind CSS v4 Configuration

- **@theme Directive**: CSS-first configuration with design tokens
- **Custom Font Weights**: Optimized Geologica weights (100-600)
- **Responsive Design**: Mobile-first approach with xl breakpoint (1280px+)

### Typography Scale

- **Base font size**: 18px (1.125rem)
- **Scale ratio**: 1.125 for consistent progression
- **Font classes**: .font-display (100px), .h3 (64px), .p2_med (26px), .p4_med (18px)
- **Line height**: Tight to loose scale for different content types
- **Letter spacing**: Design-optimized spacing from tighter (-0.05em) to widest (0.1em)

### Color System

- **CSS Custom Properties**: Defined in @theme directive
- **Gradient System**: bg-gradient-surface with linear-gradient definitions
- **Semantic Colors**: Primary, text, surface, separator, error, warning, success
- **Alpha Variations**: Consistent opacity patterns across all colors

### Spacing & Layout

- **Responsive Grid**: Auto-fit columns with minimum widths (120px-140px)
- **Flexible Gaps**: 2-5 responsive gap system
- **Container Max-width**: 1440px with responsive padding
- **Z-index Scale**: Dropdown, modal, popover, tooltip, notification

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

- **Intelligent Skeleton Loading**: Font-inheriting skeletons that prevent layout shifts
- **Optimized Font Loading**: Reduced to essential weights (100-600) with font-display: swap
- **Efficient Re-renders**: Computed properties and watchers with proper reactivity
- **SVG Icon System**: Lightweight, scalable icons with responsive sizing
- **Tailwind CSS v4**: Modern CSS-first approach with better build optimization
- **TypeScript Inheritance**: BaseWeather type reduces duplication and improves type safety

## ⚙️ Development Tools & Configuration

### ESLint Configuration (Flat Config)

The project uses ESLint's modern **flat configuration** (`eslint.config.js`) with a sophisticated setup:

```javascript
// Multi-environment support with proper parser configurations
- JavaScript/TypeScript files: @typescript-eslint/parser
- Vue SFC files: vue-eslint-parser with TypeScript integration
- Comprehensive rule sets: @eslint/js, vue/flat/recommended

// Advanced Vue-specific rules
- Template formatting with responsive attribute handling
- Script/style block indentation with vueIndentScriptAndStyle
- Accessibility-focused HTML structure validation
- Component prop and emit pattern enforcement
```

**Key Features:**
- **Separated configurations** for different file types (.js/.ts vs .vue)
- **TypeScript integration** with strict type checking
- **Vue 3 Composition API** specific linting rules
- **Accessibility validation** with proper ARIA attribute checking
- **Performance-focused rules** preventing common Vue.js anti-patterns

### Prettier Integration

Professional code formatting with carefully tuned settings:

```javascript
{
  "printWidth": 120,              // Optimized for modern monitors
  "singleAttributePerLine": true,  // Clean Vue template formatting
  "vueIndentScriptAndStyle": true, // Proper SFC block indentation
  "htmlWhitespaceSensitivity": "ignore", // Consistent HTML formatting
  "trailingComma": "es5",         // Maximum compatibility
  "singleQuote": true             // Consistent quote style
}
```

### Tailwind CSS v4 + ESLint Integration

**Advanced @apply Usage:**
- Scoped style blocks with `@import 'tailwindcss/theme' reference`
- Proper separation of responsive utilities (template) vs base styles (CSS)
- Custom class definitions with Tailwind utility inheritance

### Development Workflow

- **Pre-commit Integration Ready**: Configurations support husky/lint-staged workflows
- **IDE Integration**: Optimized for VS Code with ESLint and Prettier extensions
- **TypeScript Strict Mode**: Full type safety with inheritance-based type system
- **Component-First**: Eslint rules enforce proper Vue 3 component patterns

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

This is a test project for **frontend developer** application. The codebase demonstrates enterprise-level development practices:

- **Enterprise Code Quality**: Advanced TypeScript with inheritance, sophisticated ESLint flat config, comprehensive error handling
- **Cutting-Edge Vue 3**: Composition API, reactive architecture, intelligent component composition with full type safety
- **Advanced UX Engineering**: Smart skeleton loading, typeahead search, keyboard navigation, accessibility-first design
- **Modern CSS Architecture**: Tailwind CSS v4 with @theme directive, mobile-first responsive design, advanced @apply usage  
- **Performance Engineering**: Font loading optimization, efficient re-renders, build optimization, asset management
- **Professional Development**: ESLint flat config, Prettier integration, TypeScript strict mode, pre-commit ready
- **Production Infrastructure**: GitHub Pages deployment, CI/CD workflows, comprehensive build optimization

---

Built with ❤️ using Vue 3, TypeScript, and modern web standards.
