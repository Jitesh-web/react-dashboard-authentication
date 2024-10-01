const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Add your Gmail email
        pass: process.env.EMAIL_PASS, // Add your Gmail app password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
