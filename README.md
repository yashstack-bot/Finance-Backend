# 🚀 Finance Data Processing Backend

A professional-grade Node.js backend designed for financial record management, featuring secure data persistence and Role-Based Access Control (RBAC).

---

## 🎯 Project Objective
This system provides a secure API for managing personal or business finance. It ensures data integrity by allowing only authorized `ADMIN` users to create financial records, while providing a public analytics dashboard for financial health monitoring.

## 🛠 Tech Stack
* **Runtime:** Node.js (v24.0.2)
* **Framework:** Express.js
* **Database:** SQLite (Local file persistence)
* **Security:** `bcrypt` for password hashing & custom RBAC middleware.

---

## 📂 Project Structure
```text
finance_backend/
├── prisma/             # Database Layer
│   └── dev.db          # Persistent SQLite storage
├── src/                # Source Code
│   ├── controllers/    # Business Logic (Auth & Records)
│   ├── db.js           # SQLite Connection & Schema Initialization
│   └── server.js       # Main Application Entry Point
├── .env                # Environment Variables
├── README.md           # Documentation
└── package.json        # Dependencies & Scripts

---

## ⚙️ Setup & Installation

1.  **Extract** the project zip file.
2.  **Navigate** to the root folder in your terminal.
3.  **Install Dependencies:**
    ```powershell
    npm install
    ```
4.  **Start the Server:**
    ```powershell
    node src/server.js
    ```
    *The server will run at: `http://localhost:3000`*

---

## 📡 API Endpoints

### **User & Analytics (Public)**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | System Health Check |
| `POST` | `/register` | User Registration |
| `POST` | `/login` | User Authentication |
| `GET` | `/summary` | Financial Dashboard (Total Income/Expense/Balance) |

### **Financial Management (Protected)**
| Method | Endpoint | Description | Requirement |
| :--- | :--- | :--- | :--- |
| `POST` | `/records` | Create a new financial entry | `role: ADMIN` in Request Header |

---

## 🔐 Role-Based Access Control (RBAC)
I have implemented a custom middleware `checkAdmin` to protect sensitive write operations. 
**To verify the security logic:**
* Send a `POST` request to `/records`.
* **Success:** Add a Header `role: ADMIN`.
* **Failure:** Remove the header or change the value. The system will return a `403 Forbidden` response.

---

## 📝 Key Engineering Decisions
* **Persistence:** Switched from a volatile in-memory store to **SQLite** to ensure financial data is preserved across server restarts (Requirement #6).
* **Security:** Passwords are never stored in plain text; they are hashed using **Bcrypt** with a salt factor of 10.
* **Modularity:** Organized the project using a **Controller pattern**, separating the API routing from the database logic for better maintainability.

---

### **Submission Note for Zorvyn Team**
*The `node_modules` folder was excluded to maintain a clean submission. Please run `npm install` before testing.*