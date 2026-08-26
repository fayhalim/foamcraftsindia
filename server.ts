import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/order', async (req, res) => {
    const { orderDetails } = req.body;
    
    try {
      // 1. Send Email
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const emailContent = `
          New Order Received!
          Order ID: ${orderDetails.orderId}
          Customer: ${orderDetails.customerName}
          Phone: ${orderDetails.phone}
          Total: ₹${orderDetails.total}
        `;

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: 'foamcraftsindia01@gmail.com, fayhalim2007@gmail.com, ' + orderDetails.email,
          subject: `Order Confirmation - ${orderDetails.orderId}`,
          text: emailContent,
        });
      } else {
        console.warn("SMTP credentials missing. Email not sent.");
      }

      // 2. Send SMS
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        const smsContent = `New Order: ${orderDetails.orderId}\nCustomer: ${orderDetails.customerName}\nTotal: ₹${orderDetails.total}`;
        
        await client.messages.create({
          body: smsContent,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: '+917518233001'
        });
        await client.messages.create({
          body: smsContent,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: '+919517030587'
        });
      } else {
        console.warn("Twilio credentials missing. SMS not sent.");
      }

      res.json({ success: true, message: 'Order processed successfully.' });
    } catch (error) {
      console.error('Error processing order notifications:', error);
      res.status(500).json({ success: false, error: 'Failed to process notifications' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use((req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
