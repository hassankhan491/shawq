const fs = require('fs');
const path = require('path');

// Exact path to your globals.css
const cssPath = path.join(__dirname, 'src', 'app', 'globals.css');

const correctCSS = `@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

@layer base {
  :root {
    --color-bg-primary: #0f0a08;
    --color-bg-secondary: #1a120b;
    --color-accent-gold: #c9a962;
    --color-accent-gold-light: #e0c78a;
    --color-text-primary: #f5f0eb;
    --color-text-secondary: #a89f95;
    --font-serif: 'Cormorant Garamond', serif;
    --font-sans: 'Montserrat', sans-serif;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: var(--font-sans);
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

@layer utilities {
  .font-serif {
    font-family: var(--font-serif);
  }
  
  .font-sans {
    font-family: var(--font-sans);
  }
}`;

try {
  // Force overwrite the file completely
  fs.writeFileSync(cssPath, correctCSS, 'utf8');
  console.log('✅ globals.css has been COMPLETELY REPLACED and fixed!');
  
  // Verify line count
  const lines = correctCSS.split('\n').length;
  console.log(`✅ New line count: ${lines} lines (purana 900+ khatam)`);
} catch (err) {
  console.error('❌ Error fixing globals.css:', err.message);
}