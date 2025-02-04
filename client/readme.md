# ITM MSC SDP Assignment - Frontend

This project is the frontend part of the web application for managing and tracking shipments. It is built with React and Vite.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js 14 or higher
- npm or yarn

## Setup

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>/client
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Create a `.env` file:**

    Create a `.env` file in the `client` directory and add the following environment variables:

    ```env
    VITE_API_BASE_URL=http://localhost:8000
    VITE_WEBSOCKET_BASE_URL=ws://localhost:8000
    VITE_WEBSOCKET_ENABLED=true
    ```

## Running the Application

1. **Start the frontend development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

The `.env` file should contain the following environment variables:

- `VITE_API_BASE_URL`: The base URL for the backend API.
- `VITE_WEBSOCKET_BASE_URL`: The base URL for the WebSocket server.
- `VITE_WEBSOCKET_ENABLED`: A boolean value to enable or disable WebSocket support.

Example `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WEBSOCKET_BASE_URL=ws://localhost:8000
VITE_WEBSOCKET_ENABLED=true
```

## Project Structure

The project structure is as follows:

```
client/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── services/           # API service functions
│   ├── store/              # Redux store and slices
│   ├── styles/             # Global styles
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── ...                 # Other files
├── .env                    # Environment variables
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev` or `yarn dev`: Starts the development server.
- `npm run build` or `yarn build`: Builds the app for production.
- `npm run preview` or `yarn preview`: Previews the production build locally.
- `npm run lint` or `yarn lint`: Lints the codebase using ESLint.

## Usage

### Login

- Use the login form to authenticate with your email and password.
- Upon successful login, you will be redirected to the home page.

### Tracking Shipments

- Use the tracking search form to enter a tracking ID and view shipment details.
- Real-time updates can be enabled or disabled using the toggle button on the shipment detail page.

### Managing Notifications

- Update notification preferences for email, SMS, and push notifications on the shipment detail page.
- Save changes to update your preferences.

### Rescheduling Shipments

- If a shipment delivery is missed, use the reschedule form to provide new delivery details and submit the request.

## License

This project is licensed under the MIT License.
