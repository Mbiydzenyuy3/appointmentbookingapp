# 🗓️ Appointment Booking Backend API

A backend service to schedule and manage appointments with real-time updates and notifications for clients and service providers.

---

## 🧰 Tech Stack

- **Node.js**
- **Express**
- **PostgreSQL**
- **Joi** (Validation)
- **JWT Auth**
- **Socket.IO** (Real-time updates)
- **Swagger** (API Docs)
- **Jest** (Unit Testing)
- **ESM** Module Support

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- JWT protected routes

### 🧑‍⚕️ Service Provider Management
- Pre-seeded providers
- Provider-created time slots

### 📅 Appointment Booking
- Book, view, and cancel appointments
- Clients and providers have separate appointment views

### 🔔 Real-Time Notifications
- Notifications via WebSockets when booking/cancelling

### 📑 API Docs
- Swagger docs available at `/api-docs`

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/your-username/appointment-api.git
cd appointment-api
npm install
