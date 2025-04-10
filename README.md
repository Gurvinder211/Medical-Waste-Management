# 🧼 Medical Waste Management Platform

🚀 **Live MVP:** [https://medical-waste-management.onrender.com](https://medical-waste-management.onrender.com)

A role-based fleet management web app for secure and compliant medical waste disposal...# 🧼 Medical Waste Management Platform

### ⚠️ Note on MVP Load Time

> ⏳ The **MVP may take 20–50 seconds to load** on first access because it's hosted on **Render's free tier**, which puts the server to sleep when inactive.

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

- 📈 **Monthly waste generation insights** for hospitals.
- ♻️ **Compliance trend analysis** for collectors.
- 🔍 Anomaly detection (e.g., sudden surge in waste types/volume).
- 📅 Personalized optimization suggestions.

These insights will help stakeholders improve sustainability and operational efficiency.