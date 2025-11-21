# Setup Guide - Student Portal

## Prerequisites

You need to install Node.js to run the full-stack version of this application.

### Installing Node.js on Windows

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Install Node.js:**
   - Run the downloaded installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" option
   - Restart your computer after installation

3. **Verify Installation:**
   Open Command Prompt or PowerShell and run:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers for both commands.

## Running the Application

### Option 1: Full Backend Version (Recommended)

After installing Node.js:

1. Open Command Prompt or PowerShell in the project directory

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

5. Login with demo credentials:
   - Student ID: `SST-261-155/2023`
   - Password: `password123`

### Option 2: Demo Version (No Backend Required)

If you want to see the UI without installing Node.js:

1. Open `public/demo.html` directly in your browser
2. This version has simulated data and chatbot responses
3. No authentication required

## Features Available

### With Backend (Option 1):
✅ Full authentication system
✅ Real database with persistent data
✅ Working API endpoints
✅ AI Chatbot with context awareness
✅ Data updates in real-time
✅ Secure password handling

### Demo Version (Option 2):
✅ Full UI/UX experience
✅ Simulated chatbot responses
✅ Static demo data
❌ No data persistence
❌ No authentication
❌ No API integration

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, edit `.env` file:
```
PORT=3001
```

### Database Issues
Delete `database/student_portal.db` and restart the server to recreate the database.

### Module Not Found
Run `npm install` again to ensure all dependencies are installed.

## Next Steps

1. Install Node.js from https://nodejs.org/
2. Run `npm install` in the project directory
3. Run `npm start` to start the server
4. Access the application at http://localhost:3000

For any issues, check the README.md file or the error messages in the console.
