# 🏠 Property Management Dashboard

A full-stack admin dashboard for real estate operations — built to practice end-to-end MERN development, from authentication flows to CRUD-connected data views.

> **Portfolio note:** This project was built to develop full-stack fundamentals with a focus on understanding how product features translate into technical architecture — not just UI implementation.

---

## 🎯 Problem This Solves

Property management teams often lack a centralised view of their portfolio performance. This dashboard consolidates key business metrics — sales listings, rental inventory, city-level distribution, customer volume, revenue tracking, and referral sources — into a single operational interface.

While the current implementation uses hardcoded data for the overview statistics, the **Property module is fully connected to a live database** with real Create, Read, Update, and Delete operations via a RESTful API.

---

## 🎬 DEMO

[Demo](https://github.com/user-attachments/assets/119a8004-3852-4bc8-8a64-22e0554b1f88)

[Demo](https://github.com/user-attachments/assets/01dbd4b9-2e0b-4ed5-a689-7633b588904d)

[Demo](https://github.com/user-attachments/assets/0b3debe9-0968-4a74-828b-adc9b78ead23)

A modern **Full-stack Dashboard Application** built with the **MERN stack**, focusing on clean UI, authentication, and scalable system design.  
This project is developed as a portfolio project to demonstrate real-world full-stack development skills.

---

## 🧩 Tech Badges

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui)
![ApexCharts](https://img.shields.io/badge/ApexCharts-5A5A5A?style=flat-square)
![Google Auth](https://img.shields.io/badge/Google%20Auth-OAuth2-4285F4?style=flat-square&logo=google)

---

## ✨ Features

### 🔐 Authentication
- Google Authentication (OAuth 2.0)
- Protected routes for authenticated users

### 📊 Dashboard
- Overview statistic cards
- Monthly revenue chart
- Donut & bar chart visualizations
- Referral source summary

### 🧱 System Design
- RESTful API concept
- Modular and scalable structure
- Frontend & backend separation

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, TypeScript, Refine Framework |
| UI Components | Material UI (MUI) |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| Authentication | Google OAuth 2.0 |
| API Pattern | RESTful API |

---

## 🏗 System Architecture

```
Client (React + Refine)
        │
        ▼
RESTful API (Node.js / Express)
        │
        ▼
MongoDB (Mongoose ODM)
```

The frontend and backend are fully separated — the React app communicates exclusively through API calls, with no direct database access from the client.

---

## 💡 Key Technical Lessons

These are the real engineering decisions and debugging moments from building this project — included because understanding *why* things break is more valuable than following tutorials that work first try.

**Refine Framework routing**
Refine's navigation hooks must be used instead of React Router's `useNavigate` directly — mixing them breaks the resource lifecycle. Learned this the hard way when edit forms stopped redirecting correctly after save.

**Resource naming is case-sensitive**
A mismatch between the resource name in `<Refine>` config and the API endpoint caused silent failures with no useful error messages. Now I always define a single source of truth for resource names and import it everywhere.

**Edit vs Create forms need separate logic**
Sharing form logic between Create and Edit without checking for `id` caused the Edit form to occasionally behave like a Create — submitting POST instead of PUT. Separating the logic by checking `useForm`'s `id` resolved it.

**API contract definition matters early**
Defining the expected request/response shape before writing the handler saved significant rework. When I skipped this on the first endpoint, I spent more time fixing mismatched field names than writing actual logic.

**Test features in isolation before combining**
Combining authentication + CRUD + routing all at once made debugging nearly impossible. Building and testing each layer independently — auth first, then API, then frontend — made integration much smoother.

---

## 📁 Project Structure

```
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── interfaces/      # TypeScript type definitions
│   │   └── utils/           # Helper functions
├── server/                  # Node.js backend
│   ├── controllers/         # Route handler logic
│   ├── models/              # Mongoose schema definitions
│   ├── routes/              # Express route definitions
│   └── index.js             # Server entry point
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/DustFlame0011/Dashboard-MERN.git

# Install dependencies — backend
cd server
npm install

# Install dependencies — frontend
cd ../client
npm install

# Add environment variables
# server/.env → MONGODB_URL, CLOUDINARY keys
# client/.env → VITE_GOOGLE_CLIENT_ID

# Run both servers
# Terminal 1 (server):  npm start
# Terminal 2 (client):  npm run dev
```

---

## 📚 References

- [Refine Data Provider Documentation](https://refine.dev/core/docs/data/data-provider/)
- [MongoDB Mongoose Docs](https://mongoosejs.com/docs/)
- [Google OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)

---

## 🔗 About the Developer

Built by [Sukumal](https://www.linkedin.com/in/sukumal-p/) — combining 7+ years of experience in digital platform operations with full-stack development skills, working toward a **Technical Product Manager** role in fintech and digital platforms.

→ [GitHub Profile](https://github.com/DustFlame0011) · [LinkedIn](https://www.linkedin.com/in/sukumal-p/) · [Behance](https://www.behance.net/sukumalp)
