require("dotenv").config();

console.log("EMAIL =", process.env.EMAIL);
console.log("PASSWORD =", process.env.PASSWORD ? "Loaded ✅" : "Not Loaded ❌");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// Routes
app.use("/api", require("./routes/temp"));

app.get("/", (req, res) => {
  res.send("Bulk Mail API Running...");
});

const PORT = process.env.PORT || 5000;

// SMTP Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// SMTP Verify
transporter.verify((err, success) => {
  if (err) {
    console.log("❌ SMTP Verify Failed");
    console.log(err.message);
  } else {
    console.log("✅ SMTP Ready");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});