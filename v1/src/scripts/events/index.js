import eventEmitter from "./eventEmitter.js";
import { createTransport } from "nodemailer";

export default () => {
  eventEmitter.on("send_email", async (data) => {
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      ...data,
    });

    console.log("Message sent: %s", info.messageId);
  });
};
