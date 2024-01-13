# Money Manager

Money Manager is a web application built on React and Firebase, following a Backend as a Service (BaaS) model. It is designed to easily manage financial records, providing users with a platform to track income and expenses. With its categorization feature, the application provides practical functionalities, detailed statistics, and analysis charts for financial management. 

Deployed on github page, view through: [MoneyManager](https://zoe-yuye.github.io/MoneyManager/)

## Features

### Add Records
- Users can add income and expense records, including descriptions, amounts, category and dates.
- Data is securely stored in Firebase Database.

### Manage Records
- Users can view all financial records.
- Options to view records from the past month, week, year, or a custom time period are provided.
- Users can delete, and modify records according to their needs.

### Statistics
- Detailed statistics for both income and expenses are available.
- Users can visualize their financial analysis.
  
### Manage Categories
- Users can easily label income and expenses with categories.
- Users can view, add, or edit categories in the categories page.
  
## Technology Stack

- **Programming Language:** JavaScript, CSS, HTML
- **Runtime Enviroment:** Node.js
- **Frontend Framework:** React, Bootstrap
- **Backend Service:** Firebase
- **Authentication:** Firebase Authentication
- **Database:** Firestore Database

## Usage Instructions

Money Manager runs in the Node.js environment, please ensure Node.js is installed before running the application.

1. **Clone or Download Repository:**
   ```bash
   git clone https://github.com/zoe-yuye/MoneyManager.git 
2. **Install Dependencies:**
   ```bash
   npm install
3. **Set up Firebase:**
   - Create a Firebase project 
   - Add a web application in the firebase project 
   - Replace the “firebaseConfig” to yours in src\firebase.js  
   - Enable email/password and GitHub as sign-in providers in Authentication  
   - Create a Firestore Database 
   - Add the following index to Firestore Database 
4. **Start Application:**
   ```bash
   npm start
   
 Visit http://localhost:3000 to access the application.
