# 🧼 Medical Waste Management Platform

🚀 **Live MVP:** [https://medical-waste-management.onrender.com](https://medical-waste-management.onrender.com)

A role-based fleet management web app for secure and compliant medical waste disposal...# 🧼 Medical Waste Management Platform

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT-based login with role-specific routing
- **Hosting**: Render

---

## 🧩 Features

### ✅ Authentication & Authorization
- Role-based login (`hospital` / `collector`)
- JWT tokens stored via `sessionStorage`

### 🏥 For Hospitals / Clinics
- Sign up and log in
- Submit medical waste (type, weight, urgency, etc.)
- View status of submitted requests
- Real-time tracking of waste pickup (coming soon)

### 🚛 For Waste Collectors
- Register with company name & license
- View unassigned waste requests
- Accept and mark pickup in progress
- Track pickup routes (coming soon)

### 📊 Admin View (Coming Soon)
- View analytics on waste type, volume, compliance
- Manage users and monitor flagged incidents

---

## 🚀 Future Enhancements

### 🔍 AI Integrations (Planned)
Using **Gemini API** and **Vertex AI**, we aim to introduce:

- **Smart Waste Classification** (Image + Text analysis)
- **Auto-suggest Safety Guidelines** for each waste type
- **Chat-based AI Assistant** for Hospitals & Collectors
- **Route Optimization** based on location & traffic
- **Non-compliance Detection** using pattern recognition