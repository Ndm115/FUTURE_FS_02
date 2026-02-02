# FUTURE_FS_02

Mini CRM to manage client leads with React, Node.js, Express, and MySQL.  

## Features

- Admin login with hashed passwords
- Dashboard showing all leads
- Update lead status: New → Contacted → Converted
- Add follow-up notes for each lead
- View lead details
- Fully functional backend APIs

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: JWT & bcrypt

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/Ndm115/FUTURE_FS_02.git
    cd FUTURE_FS_02
    ```

2. Install backend dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in backend:

    ```
    JWT_SECRET=your_secret_key
    PORT=5000
    ```

4. Set up MySQL database (`rootCRM`) and tables (`admins`, `leads`, `lead_notes`)  

5. Start backend server:

    ```bash
    npx nodemon server.js
    ```

6. Install frontend dependencies and start React:

    ```bash
    cd ../frontend
    npm install
    npm start
    ```

7. Open browser at `http://localhost:3000`
