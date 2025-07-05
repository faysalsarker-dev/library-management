# 📚 BookPick – Minimal Library Management System (Frontend)

**Live Site:** [https://assignment-4-ecru-seven.vercel.app/](https://assignment-4-ecru-seven.vercel.app/)  
**Backend Repo:** [faysalsarker-dev/library-management-mongoose](https://github.com/faysalsarker-dev/library-management-mongoose)

---

## 🎯 Project Purpose

**BookPick** is a minimal and user-friendly library management system built with **React**, **TypeScript**, and **RTK Query**. It allows users to view, add, edit, delete, and borrow books—**without authentication** or payment logic. The focus is on mastering API integration, UI/UX design, and essential CRUD operations using Redux Toolkit Query.

---

## ⚙️ Tech Stack

- **React + TypeScript** – Component-based UI with type safety
- **Redux Toolkit Query (RTK Query)** – Efficient API data fetching and caching
- **Tailwind CSS** – Utility-first styling for responsive design
- **React Hook Form** – Type-safe and validated forms

---

## 🔌 API Integration with RTK Query

All data (books and borrows) is fetched, cached, updated, and invalidated using **RTK Query**—part of Redux Toolkit. It simplifies API logic, avoids manual loading/error states, and improves performance through caching and automatic refetching when needed.

---

## ✨ Features & Business Logic

### 📚 Book Management

- View all books in a table (Title, Author, Genre, ISBN, Copies, Availability)
- **Add Book** – Fill form (Title, Author, Genre, ISBN, Description, Copies)
- **Edit Book** – Updates existing data instantly in the UI
- **Delete Book** – Confirmation before deletion
- **Borrow Book** – Opens form to borrow selected book

> 💡 **Business Rule:** If `copies` become `0`, book is marked as **Unavailable**

---

### 📦 Borrow Functionality

- Borrow form takes `Quantity` and `Due Date`
- Cannot borrow more than available copies
- Book's available count updates instantly after borrow
- Redirects to Borrow Summary with toast notification

---

### 📊 Borrow Summary Page

- Shows total quantity borrowed for each book (via aggregation API)
- Columns: Book Title, ISBN, Quantity Borrowed

---

## 🗺️ Routes Overview

| Route              | Description                        |
|--------------------|------------------------------------|
| `/books`           | List all books                     |
| `/create-book`     | Add a new book                     |
| `/edit-book/:id`   | Edit book details                  |
| `/books/:id`       | View a book’s details              |
| `/borrow/:bookId`  | Borrow a selected book             |
| `/borrow-summary`  | View total borrowed books summary  |

---

## 🚀 Getting Started

### 🔁 Clone & Run Locally

```bash
# Clone the frontend repo
git clone https://github.com/faysalsarker-dev/library-management

# Go into the project folder
cd your-frontend-repo

# Install dependencies
npm install

# Start the dev server
npm run dev
