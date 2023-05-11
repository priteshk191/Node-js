const express = require("express");
const connectDB = require("./db");
const cors = require('cors');
const contactRoutes = require("./routes/contacts");

// Create the express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/contacts", contactRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
