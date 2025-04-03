const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("ws");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const authMiddleware = require("./middleware/authMiddleware");




// Initialize Express App
const app = express();
const server = http.createServer(app);
const wss = new Server({ server }); // WebSocket Server

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cors({ origin: "*", credentials: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
      return res.sendStatus(200);
  }
  next();
});


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/tracking", trackingRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "pages", "index.html"));
  });
app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "pages", "login.html"));
  });
app.get("/signup.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "pages", "signup.html"));
  });
  app.get("/contact.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "pages", "contact.html"));
  });
  app.get("/dashboard.html", authMiddleware, (req, res) => {
    console.log("User Role:", req.user.role); // Debugging log
  
    // Allow only specific roles
    if (req.user.role === "hospital" || req.user.role === "collector" || req.user.role === "admin") {
      res.sendFile(path.join(__dirname, "../frontend/pages", "dashboard.html"));
    } else {
      return res.status(403).json({ message: "Access Denied" });
    }
  });

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
