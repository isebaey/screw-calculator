# Screw Game Calculator
A card game calculator built with Vue.js and Tailwind CSS, supporting dark mode, RTL language switching (Arabic/English), and game history saved in local storage. The app is designed to be responsive, mobile-friendly, and allows for scoring up to 8 players.

## Live Demo: https://isebaey.github.io/screw-calculator/

![photo-collage png](https://github.com/user-attachments/assets/65e06822-a9d2-460d-be88-0ce31dbed1c0)

## Features

- **Multi-language support**: Switch between Arabic and English at any time.
- **Dark mode**: Toggle between light and dark modes, with smooth transitions.
- **Player customization**: Set the number of players (4-8 players) and input player names.
- **Score tracking**: Easily enter and double the scores for each round.
- **Game history**: Save and view game history, including players' scores and the round number.
- **Game control**: Start a new game, submit a round, and end the game with clear UI actions.
- **Local storage**: Scores and game history are saved in local storage, allowing you to resume or review past games.
- **Responsive design**: Fully responsive layout, working across mobile and desktop devices.

## Tech Stack

- **Vue.js 3**
- **Tailwind CSS**
- **Heroicons**

## Setup and Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/screw-calculator.git
   cd screw-calculator

2. **Install dependencies**:
   ```bash
   npm install

3. **Run the development server**:
   ```bash
   npm run serve

5. Build for production:
   ```bash
   npm run build

## Customization

**Color Themes**:

The app supports both light and dark modes, with a smooth transition between the two. Colors and gradients can be customized in the tailwind.config.js file.

**Fonts**:

The app uses the Cairo font from Google Fonts, which can be changed in the style section.

**Language Support**:

The app currently supports English and Arabic. To add additional languages, update the locale files in the locales folder.




