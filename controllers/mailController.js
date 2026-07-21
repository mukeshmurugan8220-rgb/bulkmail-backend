require("dotenv").config({ override: true });
console.log("Using Gmail:", process.env.EMAIL);
console.log("Password Length:", process.env.PASSWORD.length);

const nodemailer = require("nodemailer");
const Mail = require("../models/Mail");

console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD:", process.env.PASSWORD ? "Loaded ✅" : "Not Loaded ❌");

const sendMail = async (req, res) => {
  try {
    const { emails, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: emails,
      subject,
      text: message,
    });

    const newMail = new Mail({
      subject,
      body: message,
      recipients: [emails],
      status: "Sent",
    });

    await newMail.save();

    res.status(200).json({
      success: true,
      message: "Mail Sent Successfully",
      id: info.messageId,
    });

  } catch (err) {
    console.log("MAIL ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = { sendMail };
console.log("Mail =", Mail);