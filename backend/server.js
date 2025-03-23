const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("ws");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
const trackingRoutes = require("./routes/trackingRoutes");

// Initialize Express App
const app = express();
const server = http.createServer(app);
const wss = new Server({ server }); // WebSocket Server

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/tracking", trackingRoutes);

// WebSocket Logic for Real-Time Truck Tracking
wss.on("connection", (ws) => {
    console.log("Client connected for tracking");

    ws.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.action === "track_truck") {
            let location = 0;
            const interval = setInterval(() => {
                location += 10;
                ws.send(JSON.stringify({ location: `Lat: 40.${location}, Lon: -73.${location}` }));
            }, 3000);

            ws.on("close", () => {
                clearInterval(interval);
                console.log("Client disconnected from tracking");
            });
        }
    });
});


// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server running on port ${PORT}`);
});
