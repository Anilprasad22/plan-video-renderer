# Video Streamer

Welcome to the **Video Streamer**, a place where we bring magic to videos with the power of Laravel, React, and cutting-edge technologies. This README will guide you through the setup, installation, and development process for the platform.

---

## Prerequisites

To run this application, you'll need the following software installed:

- **PHP 8.3** or higher
- **Node.js 20.19.0** or higher
- **MySQL** (preferred) or any other database you wish to use

---

## Setting Up the Application

Follow the instructions below to set up the application locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repository/video-magic-platform.git
   cd video-magic-platform

2. **Install Composer Dependencies (For Laravel):**

Make sure you have PHP and Composer installed. Run the following command to install all PHP dependencies:

    ```bash
    composer install

3. **Install Node.js Dependencies (For React):**

Make sure you have Node.js installed. Run the following command to install all Node.js dependencies:
    ```bash
    npm install

4. **Set Up Environment Variables:**

Copy .env.example to .env:
    ```bash
    cp .env.example .env

Update your .env file with the correct database and other environment configurations. Ensure the following settings:
    ```bash
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password


5. **Generate the Application Key:**

This will set up the encryption key for your application:
    ```bash
    php artisan key:generate

## Development Setup

1. Run Laravel Config Cache and Clear Cache:

Clear any existing configuration and cache:
    ```bash
    php artisan config:cache
    php artisan cache:clear

2. Run Migrations:

Ensure your database is up-to-date by running migrations:
    ```bash
    php artisan migrate

3. Run Seeders (Optional, to Seed Dummy Data):

If you want to populate your database with some dummy data, run:
    ```bash
    php artisan db:seed

## Start the application

1. Run the composer command below to start the frontend and backend in dev mode
    ```bash
    composer run dev

2. To run the application in prod mode for 

Frontend run the below
    ```bash
    npm run prod

Backend needs to be setup with the apache server or by running
    ```bash
    php artisan serve


## Running Tests

1. Run the tests to ensure everything is working properly:
    ```bash
    php artisan test

This will run PHPUnit tests for the Laravel backend.


Logic Behind the Application

1. Laravel Backend Logic:
The VideoController contains methods to list all videos and search for videos by title or description.

search(Request $request):

Takes a query parameter from the request.

Searches the database for videos where the title or description contains the query string.

list():

Returns all the videos available in the database.

2. React Frontend:
The frontend uses React with TypeScript along with Tailwind css for building interactive and user-friendly components.

Default Login authentication and Registrations are used from the Laravel. Once the user registers first time and logins they'll land onto the videos page

Components like VideoPreview display video details (title, thumbnail, author, etc.).

The React app communicates with the backend using Axios to fetch video data and display it on the frontend.

The user can search for videos using a search bar, and the results are displayed dynamically based on the search query.

A button is added at the top which helps us to toggle between the static and interactive modes.

Additional interactive features like hover-to-play video previews and audio controls are included.

3. Database and Seeders:
The Video model interacts with the videos table in the database.

Seeders are used to populate the database with sample videos and test data.

Migrations are set up to create the necessary database tables and relationships.

Conclusion
This README should help you set up the project on your local machine and get started with the development process.The application is built with a single Laravel project, where both the backend (API) and the frontend (React) live together in the same folder structure. It features video management, search, and playback functionalities, allowing users to interact with the platform seamlessly.

If you encounter any issues, feel free to refer to the documentation or reach out for support.

Happy coding! ✨

Some sample screenshots
Registration page
![image](https://github.com/user-attachments/assets/e4e7cd40-c736-4d2f-a066-3796299c19e9)

Login Page
![image](https://github.com/user-attachments/assets/d45ceb08-1fe3-49df-8683-95a579ab6141)

Dashboard
![image](https://github.com/user-attachments/assets/f5a91788-4c54-47f4-ae3c-d5200589d9b8)

Dashboard with search triggered
![image](https://github.com/user-attachments/assets/ce027375-f5a1-4d76-852c-b7964e361e7a)


