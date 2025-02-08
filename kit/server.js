const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-admin-sdk.json"); // Download this from Firebase Console
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Get all fishing logs
app.get("/logs", async (req, res) => {
  try {
    const logsRef = db.collection("fishingLogs");
    const snapshot = await logsRef.get();
    const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new fishing log
app.post("/logs", async (req, res) => {
  try {
    const { userId, species, size, weight, location } = req.body;
    const logRef = await db.collection("fishingLogs").add({
      userId,
      species,
      size,
      weight,
      location,
      timestamp: new Date(),
    });
    res.json({ message: "Fishing log added!", id: logRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
