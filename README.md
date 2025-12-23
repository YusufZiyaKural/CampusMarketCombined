# Campus Market – Setup Guide

This document is designed to guide you through the installation process **from scratch**, assuming no prior setup. Simply follow the steps in order.

---

## Project Repositories

- **Frontend (React):** [Campus Market Frontend](https://github.com/YusufZiyaKural/campusMarketFrontend)
- **Backend (Java / Spring Boot):** [Campus Market Backend](https://github.com/YusufZiyaKural/CampusMarketBackend)

---

## Prerequisites

* Java JDK (Preferably Java 17 or the version required by the project)
* PostgreSQL
* Node.js (with npm)
* Git

---

## 1. Java JDK Installation

If Java is not installed on your machine:

* Download and install the appropriate Java JDK version.
* After installation, verify it via the terminal using the following command:

```bash
java -version

```

---

## 2. PostgreSQL Installation

* Download and install PostgreSQL.
* During installation:
* **Username:** `postgres` (Recommended to keep as is)
* **Password:** Make sure to note down the password you set.



---

## 3. Cloning the Project

Clone the project to your local machine via GitHub:

```bash
git clone <repo_link>

```

---

## 4. Backend Configuration

Open the following file in the backend directory:

```
backend/src/main/resources/application.properties

```

Update the fields below with the credentials you defined during the PostgreSQL installation:

```properties
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

```

---

## 5. Creating the Database

1. Open **pgAdmin**.
2. Right-click on Databases → **Create → Database**.
3. **Strictly** name the database as follows:

```
campusmarket_db

```

> If prompted for a password, enter the one you set during the PostgreSQL installation.

---

## 6. Running the Backend

* Run the backend project via your IDE or terminal.
* If the application starts without errors, the backend is ready.

---

## 7. Frontend Setup and Running

Navigate to the frontend directory:

```bash
cd frontend

```

Install dependencies:

```bash
npm install

```

Start the project:

```bash
npm run dev

```

Open the address provided in the terminal in your browser.

---

##  Conclusion

If both the backend and frontend are running successfully, **Campus Market** is ready to use.

If you encounter any issues, don't forget to check the logs.

```
