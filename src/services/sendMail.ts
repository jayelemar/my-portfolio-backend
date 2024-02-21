
import { Request } from 'express'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  }
})

const sendMail = async (contactData: any) => {
  try {
    const { name, email, message } = contactData;
    
    const mailOption = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: email,
      cc: process.env.NEXT_PUBLIC_EMAIL_CC,
      subject: "Email Confirmation from Jay Elemar Termulo's Portfolio",
      html: `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Auto-reply from Jay Termulo</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
          }
        
          h3 {
            color: #333;
          }
        
          p {
            color: #555;
          }
        
          .signature {
            font-weight: bold;
          }
        </style>
      </head>
        
      <body>
        <h3>Hello ${name},</h3>
        <br />
        <p>Thank you for contacting me. Your message has been received successfully.</p>
        <p>This is an automated reply with the details of your message:</p>
        <p>" ${message} "</p>
        <br />
        <br />
        <p>I will review your message and get back to you as soon as possible.</p>
        <br />
        <br />
        <p>Best Regards,</p>
        <p class="signature">Jay Termulo</p>
        <p>Your Frontend Developer</p>
      </body>
      </html>
      `
    }

    const sendResult = await transporter.sendMail(mailOption);
    console.log(sendResult);

  } catch (error) {
    console.error({ error });
    return;
  }
}

export default sendMail