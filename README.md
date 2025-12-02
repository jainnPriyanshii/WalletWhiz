⭐ WalletWhiz – Personal Finance Tracker App

A smart and minimal expense manager built with React Native & Firebase.

📱 Overview

WalletWhiz is a full-featured personal finance tracker that allows users to manage multiple wallets, track income & expenses, visualize financial insights, and analyze spending patterns through dynamic statistics.

This app focuses on clean UI, real-time updates, Firebase backend, and a smooth user experience powered by React Native.

🚀 Features
🔐 Authentication

Firebase Email/Password authentication

Secure user sessions

Auto-login handling

👛 Wallet Management

Create multiple wallets

Set initial balance

View wallet list

Real-time calculation of current balance, total income, and total expense

Switch between wallets with smooth navigation

💸 Add Transactions

Add Income or Expense

Category selection

Description & date

Balance auto-updates

Validation to prevent negative balance

Historical transaction list

📊 Statistics Dashboard

A dedicated stats screen showing:

Weekly, Monthly, Yearly filtering:

Smart date filtering

Real-time breakdown

Income vs Expense Bar Chart:

Built with react-native-gifted-charts

Dynamic values based on selected period

Summary Cards:

Total Income

Total Expense

Current Savings

Transaction History:

Sorted view of filtered transactions

Clean UI cards

🧠 Architecture Decisions
1. Context API for Global Wallet

Used to store currently selected wallet across screens:

Avoids heavy prop drilling

Cleaner navigation flow

Makes HomeScreen, StatsScreen, and NewTransaction responsive to the selected wallet

2. Firebase Firestore as Backend

Collections structure:

users → uid → wallets → walletId → transactions


This ensures:

Clean organization

Wallet-wise transaction mapping

Scalable and secure database

3. React Navigation Structure
Auth Stack
Home Tabs
  → Home Stack
  → Stats Screen
  → Wallet Stack
  → Profile Stack


Smooth transitions without performance issues.

4. Stats Engine (Core Logic)

The app includes a custom statistics calculation system:

Converts Firestore timestamps → JS Dates

Groups transactions by:

Weekly range (Mon–Sun)

Monthly (current month)

Yearly

Calculates:

Total Income

Total Expense

Savings

This engine powers the real-time chart updates.

🛠 Tech Stack
Frontend

React Native (Expo)

Context API

React Navigation

React Native Gifted Charts

Backend

Firebase Authentication

Firebase Firestore

Firebase Storage (optional)

📂 Folder Structure
WalletWhiz/
 ├── Components/
 │    ├── Screens/
 │    ├── SubScreens/
 ├── Context/
 │    ├── SelectedWalletContext.js
 ├── BottomTabs/
 ├── utils/
 ├── firebaseConfig.js
 ├── App.js

🔧 Installation & Setup
git clone <repo-url>
cd WalletWhiz
npm install
npx expo start


Add your Firebase config inside firebaseConfig.js.

🧑‍💻 Developer

Priyanshi Jain
Final-year B.Tech student | React Native & Full Stack Developer
Passionate about building clean UI and meaningful products.
