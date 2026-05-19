# Smart Leads Manager

A full-stack Lead Management System built using the MERN Stack with authentication, role-based access control, filtering, pagination, CSV export, dark mode, and responsive UI.

---

# 🚀 Features

## Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-Based Access Control (RBAC)

---

## Lead Management

* Create Leads
* View Leads
* Update Leads
* Delete Leads
* Delete Confirmation Modal

---

## Search & Filtering

* Search Leads
* Filter by Status
* Filter by Source
* Sort by Latest/Oldest
* Debounced Search Optimization

---

## Pagination

* Backend Pagination
* Frontend Pagination UI
* Previous/Next Navigation

---

## UI Features

* Responsive Dashboard
* Dark Mode
* Toast Notifications
* Loading Skeleton UI
* CSV Export

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Axios
* React Router DOM
* React Hot Toast
* React CSV

---

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcryptjs

---

# 📂 Project Structure

```bash
ServiceHive/
│
├── Backend/
│   ├── src/
│   ├── package.json
│
├── Frontend/
│   ├── src/
│   ├── package.json
│
├── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone <your-repository-url>
```

---

# Backend Setup

```bash
cd Backend
npm install
```

## Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

## Run Backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd Frontend
npm install
```

## Run Frontend

```bash
npm run dev
```

---

# 🌐 Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

# 📡 API Routes

## Auth Routes

| Method | Route                | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |

---

## Lead Routes

| Method | Route            | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/leads`     | Get All Leads |
| POST   | `/api/leads`     | Create Lead   |
| PUT    | `/api/leads/:id` | Update Lead   |
| DELETE | `/api/leads/:id` | Delete Lead   |

---

# 📸 Screenshots

## Dashboard

(Add Screenshot Here)

## Dark Mode

(Add Screenshot Here)

## Create Lead

(Add Screenshot Here)

---

# 🚀 Deployment

## Frontend

Deployed on Vercel

## Backend

Deployed on Render

---

# 🔮 Future Improvements

* Analytics Dashboard
* Charts & Reports
* Real-Time Notifications
* Kanban Lead Board
* Activity Logs

---

# 👨‍💻 Author

Aditya Shaw
