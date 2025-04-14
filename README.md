# Cosmic Social Media App - README

## 📌 Overview
Cosmic is a modern social media application inspired by platforms like TikTok, built with React Native, Expo, and Apollo GraphQL. The app features a vertical video feed, user authentication, post interactions (likes, comments), and theme customization.

## 🚀 Key Features
- **Authentication**: Sign up, login, and logout functionality
- **Video Feed**: TikTok-style vertical scrolling feed with auto-play
- **Post Interactions**: Like, comment, and bookmark posts
- **Dark/Light Mode**: Theme customization with system preference detection
- **Responsive UI**: Optimized for mobile devices with smooth animations
- **GraphQL API**: Apollo Client integration for data management

## 🛠️ Technologies Used
- **Frontend**: React Native, Expo, NativeWind (Tailwind for React Native)
- **State Management**: Apollo Client, React Context
- **Navigation**: Expo Router
- **Styling**: Tailwind CSS with custom theming
- **Testing**: Jest (basic setup)
- **Build Tools**: Babel, Metro, TypeScript

## 📂 Project Structure
```
cosmic-social-media-app/
├── __tests__/            # Test files
├── apollo/               # GraphQL queries and mutations
│   ├── mutations/
│   ├── queries/
│   └── client.ts         # Apollo Client configuration
├── app/                  # Main app screens and layout
│   ├── (auth)/           # Authentication screens
│   ├── (tabs)/           # Main app tabs
│   ├── _layout.tsx       # Root layout
│   └── +not-found.tsx    # 404 screen
├── components/           # Reusable UI components
│   ├── custom/           # Custom complex components
│   └── ui/               # Basic UI primitives
├── constants/            # App constants
├── hooks/                # Custom hooks
│   ├── graphql/          # GraphQL-related hooks
│   └── post.tsx          # Post-related hooks
├── lib/                  # Utility functions
├── providers/            # Context providers
├── types/                # Type definitions
└── config/               # Configuration files
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- Bun package manager
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cosmic-social-media-app.git
   cd cosmic-social-media-app
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   bun start
   ```

5. Run on your preferred platform:
   ```bash
   bun android
   bun ios
   bun web 
   ```

## 🧪 Testing
Run tests with:
```bash
bun test
```

## 🔄 Code Generation
Generate GraphQL types and hooks:
```bash
bun generate
```

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.
