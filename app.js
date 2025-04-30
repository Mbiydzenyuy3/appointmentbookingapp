// backend/app.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import setupSwagger from "./swaggerConfig.js";

import authRoutes from "./src/routes/auth.routes.js";
import providerRoutes from "./src/routes/provider.routes.js";
import slotRoutes from "./src/routes/slot.routes.js";
import appointmentRoutes from "./src/routes/appointment.routes.js";


const app = express();
const httpServer = createServer(app); // ✅ Define this first
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use((req, res, next) => {
  req.io = io;
  next();
});



app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes here
app.use("/api/auth", authRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Appointment Booking API is running 🚀");
});

setupSwagger(app);

export default { app, Server };
