# Project Overview

## Tech Stack

This project is an Electron application utilizing a modern web technology stack for the renderer process.

**Core Technologies:**
*   **Framework/Runtime:** Electron (indicated by `electron` dependency and `electron-forge` scripts).
*   **Frontend/Renderer:** React and TypeScript (`react`, `react-dom`, `.tsx`/`.ts` files in `src/`).
*   **Build Tooling:** Webpack for bundling, configured via `webpack.main.config.ts` and `webpack.renderer.config.ts`.
*   **Styling:** CSS, PostCSS, and Tailwind CSS (indicated by `postcss.config.js`, `tailwindcss`, `css-loader`, `style-loader`).
*   **Language:** TypeScript (`tsconfig.json` present).
*   **Preload Scripting:** Separate preload script (`src/preload.ts`) suggests standard Electron IPC communication setup.