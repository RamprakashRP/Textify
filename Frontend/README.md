# Textify

AI-powered intelligent document Q&A agent. Upload PDFs, Word docs, and emails to get instant answers with citations and confidence scores.

## Technologies Used

- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn-ui
- **Routing:** React Router
- **State Management:** React Query

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later)
- npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/your_repository_name.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

### Running the Application

To run the app in the development mode, use:

```sh
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view it in the browser. The page will reload if you make edits.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in the development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the code using ESLint.
-   `npm run preview`: Serves the production build locally.

## Folder Structure

```
.
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   └── services/
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.ts
```

-   **`public/`**: Contains static assets like images and fonts.
-   **`src/`**: Contains the main source code of the application.
    -   **`components/`**: Contains reusable UI components.
        -   **`layout/`**: Components that define the structure of the pages.
        -   **`ui/`**: Generic UI components from shadcn-ui.
    -   **`hooks/`**: Custom React hooks.
    -   **`lib/`**: Utility functions.
    -   **`pages/`**: Components that represent the pages of the application.
    -   **`services/`**: Code for interacting with external APIs.