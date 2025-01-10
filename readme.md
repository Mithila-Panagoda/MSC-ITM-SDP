# ITM MSC SDP Assignment

This project is a web application for managing and tracking shipments. It includes a backend built with Django and a frontend built with React and Vite.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn
- PostgreSQL (or any other database supported by Django)

## Backend Setup

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>/backend
    ```

2. **Create and activate a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install the dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Set up the database:**

    Update the `DATABASES` setting in `project/settings.py` to configure your database.

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'your_db_name',
            'USER': 'your_db_user',
            'PASSWORD': 'your_db_password',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    ```

5. **Run migrations:**

    ```bash
    python manage.py migrate
    ```

6. **Create a superuser:**

    ```bash
    python manage.py createsuperuser
    ```

7. **Collect static files:**

    ```bash
    python manage.py collectstatic
    ```

8. **Configure the email service:**

    To send emails to recipients without printing them on the console (for development work), add the following to your `.env` file:

    ```env
    DJANGO_EMAIL_BACKEND="django.core.mail.backends.smtp.EmailBackend"
    ```

## Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
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

1. **Start the backend server:**

    There are two ways to run the backend server:

    - **Normal way:**

        ```bash
        cd <repository-directory>/backend
        source venv/bin/activate  # On Windows use `venv\Scripts\activate`
        python manage.py runserver
        ```

    - **With WebSocket support (for real-time shipment updates):**

        ```bash
        cd <repository-directory>/backend
        source venv/bin/activate  # On Windows use `venv\Scripts\activate`
        uvicorn project.asgi:application --host 127.0.0.1 --port 8000
        ```

2. **Start the frontend development server:**

    ```bash
    cd <repository-directory>/client
    npm run dev
    # or
    yarn dev
    ```

3. **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

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

## API Documentation

The API documentation is available at the following endpoints:

- **Swagger UI:** `http://localhost:8000/swagger/schema/`
- **Redoc:** `http://localhost:8000/redoc/`

These endpoints provide detailed information about the available API endpoints and their usage.

## License

This project is licensed under the MIT License.