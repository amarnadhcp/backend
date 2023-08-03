import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      post: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};

export default sendEmail;
