# Field Agent Management Application

## Overview

This project is a web-based application that manages a list of field agents. It allows users to **view**, **add**, **edit**, and **delete** agents through a user-friendly interface. The backend is powered by **Spring Framework** with **JDBC Template**, while the client side is built using **Node.js**. The project also includes a robust testing setup with **Spring’s mock server** to ensure the correct implementation of CRUD operations.

## Features

- **List of Agents**: View all agents on a webpage.
- **Add/Edit/Delete Agents**: Manage agents by performing CRUD operations directly through the UI.
- **Test Environment**: A separate database (`field-agent-schema-test`) is used for testing CRUD functionality via Spring mock tests and annotations.
- **Environment Variables for Database Configuration**: MySQL login credentials are stored securely using environment variables.

## Technologies Used

- **Java** (Spring Framework for backend)
- **JDBC Template** for database interactions
- **MySQL** for database management
  - `field-agent-schema-prod` (Production database)
  - `field-agent-schema-test` (Test database)
- **Spring Mock Server** for testing
- **Node.js** for client-side rendering
- **Spring REST Controller** for handling HTTP requests
