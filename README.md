  

# GestionStock - Enhanced Stock Management SaaS Web App

GestionStock is a robust and intuitive SaaS web application crafted to streamline your stock management tasks. Tailored for diverse businesses, this platform ensures seamless tracking of any inventory items, be it chairs, tools, or other goods. Powered by Node.js and coupled with MySQL, GestionStock leverages Sequelize for efficient database operations.

## Table of Contents

- [Technologies and Libraries](#technologies-and-libraries)

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)

  - [Installation](#installation)

- [Usage](#usage)

  - [Running the Application](#running-the-application)

  - [Testing](#testing)

  - [Advanced Commands](#advanced-commands)
  

## Technologies and Libraries

- **Backend**: Node.js

- **Database**: MySQL with Sequelize ORM

- **Authentication**: Passport, bcrypt

- **Template Engine**: EJS

- **Server**: Express.js

- **Other Libraries**:

  - Connect-flash

  - Connect-redis

  - Express-rate-limit

  - Express-session

  - Helmet

  - Redis

  

## Getting Started

  

### Prerequisites

  

Ensure the following software is installed on your machine:

- Node.js (version 15.17 or higher)

- MySQL database

  

### Installation

  

1. Clone the GitHub repository:

```bash

git clone https://github.com/CharlelieL/GestionStock.git

cd GestionStock

```

  

2. Install the project dependencies:

```bash

npm install

```

  

3. Set up the database:

   - Create a new MySQL database for the application.

   - Update the database configuration in `configs/dbConfig.js` with your MySQL credentials.

  

4. Apply the database migrations to initialize the tables:

```bash

npx sequelize-cli db:migrate

```


## Usage  

### Running the Application

To fire up the GestionStock application, utilize the following command:

```bash

npm start

```

By default, the application will be accessible at [http://localhost:3000/](http://localhost:3000/).

### Testing

To activate the test suite, input the command below:

```bash

npm test

```

### Advanced Commands

If you're looking to manage your Node.js processes and keep them alive forever, you can use `pm2`:

```bash

pm2 start process.yml

```


RG State:   tfstate
Blob State: tfstate7miin