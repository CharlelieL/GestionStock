GestionStock - Simple Stock Management SaaS Web App

GestionStock is a straightforward and easy-to-use SaaS web application designed to help you manage your stocks efficiently. Whether you are keeping track of chairs, tools, or any other inventory items, GestionStock has got you covered. The application is built using Node.js and MySQL, with Sequelize as the ORM for seamless database interaction.
Table of Contents

    Getting Started
        Prerequisites
        Installation
    Usage
        Running the Application
        Testing
    Contributing
    License

Getting Started
Prerequisites

To run this project, ensure you have the following installed on your machine:

    Node.js (version 14 or higher)
    MySQL database

Installation

    Clone the GitHub repository:

    bash

git clone https://github.com/your-username/gestionstock.git
cd gestionstock

Install the dependencies using npm:

bash

npm install

Set up the database:

    Create a new MySQL database for the application.
    Update the database configuration in config/config.json with your MySQL credentials.

json

// config/config.json
{
  "development": {
    "username": "your-mysql-username",
    "password": "your-mysql-password",
    "database": "your-database-name",
    "host": "localhost",
    "dialect": "mysql"
  },
  // Add other environments if necessary
}

Run the database migrations to set up the tables:

bash

    npx sequelize-cli db:migrate

Usage
Running the Application

To start the GestionStock application, run the following command:

bash

npm start

The application will be accessible at http://localhost:3000/.
Testing

To run the test suite, use the following command:

bash

npm test

Contributing

We welcome contributions from the community! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. For major changes, please open an issue first to discuss the changes.

Before contributing, please review the Contributing Guidelines for more information.
License

This project is licensed under the MIT License. Feel free to use and modify the code as per the terms of the license.
