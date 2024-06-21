# Overview

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)

## Tech Stack

- **Programming-language**: Nodejs
- **Package-manager**: npm
- **Database**: MongoDB
- **Lint**: Eslint
- **Formatter**: Prettier
- **Doc-api**: Swagger

## Installation

1. Clone the repository:

   ```sh
   https://github.com/danilkagugu/the-strategy-squad-backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables

Create a `.env` file in the root directory and add the variables described in .env.example

## Running the Application

1. Run the application:

   ```sh
   npm start
   or
   npm run dev (infinite running)
   ```

2. The application should now be running at `http://localhost:PORT`. (PORT is a variable added to .env file)

3. The swagger documentation should now be running at `http://localhost:PORT/api-docs` or `https://the-strategy-squad-backend.onrender.com/api-docs`
