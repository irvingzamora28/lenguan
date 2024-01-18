# Lenguan - Language Learning Platform

## Introduction

Welcome to **Lenguan**, a unique and comprehensive online platform designed for efficient and enjoyable language learning. Our platform is suitable for learners of all ages, from students to seniors, and caters to various user groups including travelers, business professionals, and immigrants. Lenguan combines gamification, spaced repetition, and social learning features to make language acquisition both fun and effective.

## Features

### Current Features

-   **Language Lessons**: Comprehensive lessons across various languages.
-   **Practice Exercises**: Interactive exercises to enhance language skills.
-   **Language Game Challenges**: Fun and engaging games to practice languages.

### Upcoming Features

-   **Leaderboards**: Track your progress and compete with others.
-   **Speech Recognition Challenges**: Improve pronunciation and listening skills using advanced speech recognition technology.
-   **Friend Requests**: Connect with other learners, make friends and practice languages together.
-   **Multi-player Challenges**: Engage in fun, interactive multi-player games and challenges to enhance learning.

## Target Audience

-   Students
-   Travelers
-   Business Professionals
-   Immigrants
-   Bilingual Learners
-   Seniors

## Requirements

-   PHP 8.0 or higher
-   Composer
-   Git
-   MongoDB
-   Node.js (LTS version)
-   Yarn
-   Serve

## Installation

1. **Clone the Repository**

```
git clone git@github.com:irvingzamora28/lenguan.git
cd lenguan
```

2. **Configure Environment**
   Update the \`.env\` file with the following settings to configure database and mail client:

```
DB_CONNECTION=mongodb
DB_HOST=127.0.0.1
DB_PORT=27017
DB_DATABASE=lenguan
DB_USERNAME=
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
```

3. **Backend Setup**
   Run the following commands:

```
php artisan migrate --seed
php artisan key:generate
php artisan serve
```

4. **Frontend Setup**
   Change to the frontend directory:

```
cd frontend
```

Install yarn packages:

```
yarn install
```

Build and start the server:

```
yarn build
yarn start
```

## Usage

After installation, you can access the Lenguan platform by navigating to the URL provided by the \`yarn start\` command for frontend access, and the backend will be available as per the \`php artisan serve\` command output.

## Testing

### Setting Up the Testing Environment

To run tests in this Laravel project, you need to set up a separate testing environment. This is done by creating a `.env.testing` file with the necessary configurations specific to testing.

#### Creating the `.env.testing` File

1. **Duplicate your existing `.env` file**:

-   This will serve as a starting point for your testing environment.
-   Rename the duplicated file to `.env.testing`.

2. **Customize the `.env.testing` File**:

-   Modify the `.env.testing` file to meet the needs of your testing environment. This typically involves setting up a database that is separate from your main development or production database.
-   For MongoDB, your `.env.testing` file might look something like this:

```
APP_NAME=Lenguan
APP_ENV=testing
APP_DEBUG=true

DB_CONNECTION=mongodb
DB_HOST=127.0.0.1
DB_PORT=27017
DB_DATABASE=testing_lenguan
DB_USERNAME=
DB_PASSWORD=
```

-   Ensure that any other necessary environment variables are appropriately configured for the testing environment.

### Running Tests

Once your testing environment is set up, run the tests using the following command:

```sh
php artisan test --env=testing
```

This command directs Laravel to use the settings from the .env.testing file when running tests, ensuring that the testing environment is isolated from your development or production environments.

### Note:

Ensure that any sensitive or environment-specific settings in the .env.testing file are correctly configured to prevent unintended consequences.

Using a separate database for testing, such as **testing_lenguan** for MongoDB, ensures that your tests do not interfere with your production or development databases.
