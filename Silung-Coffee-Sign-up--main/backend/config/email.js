let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (error) {
  console.log('Nodemailer not installed. Email functionality disabled.');
  nodemailer = null;
}

const createTransporter = () => {
  if (!nodemailer) {
    throw new Error('Nodemailer not available');
  }
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

const sendContactEmail = async (contactData) => {
  try {
    if (!nodemailer) {
      console.log('Email functionality disabled - nodemailer not available');
      return { success: true };
    }
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.EMAIL_USER || 'your-email@gmail.com',
      subject: `New Contact Form Submission - ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c1810; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #d4af37;">
              ${contactData.message}
            </p>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from the Silung Coffee website contact form.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

const sendOrderEmail = async (orderData) => {
  try {
    if (!nodemailer) {
      console.log('Email functionality disabled - nodemailer not available');
      return { success: true };
    }
    const transporter = createTransporter();
    
    const itemsHtml = orderData.items.map(item => 
      `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">₱${item.price}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">₱${item.price * item.quantity}</td>
      </tr>`
    ).join('');

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.EMAIL_USER || 'your-email@gmail.com',
      subject: `New Order #${orderData._id} - ${orderData.customerInfo.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c1810; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            New Order Received
          </h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c1810; margin-top: 0;">Order Details</h3>
            <p><strong>Order ID:</strong> ${orderData._id}</p>
            <p><strong>Order Type:</strong> ${orderData.orderType}</p>
            <p><strong>Status:</strong> ${orderData.status}</p>
            <p><strong>Total Amount:</strong> ₱${orderData.totalAmount}</p>
          </div>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c1810; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${orderData.customerInfo.name}</p>
            <p><strong>Email:</strong> ${orderData.customerInfo.email}</p>
            <p><strong>Phone:</strong> ${orderData.customerInfo.phone}</p>
          </div>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c1810; margin-top: 0;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #2c1810; color: white;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                  <th style="padding: 10px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            <div style="text-align: right; margin-top: 15px; font-size: 18px; font-weight: bold;">
              Total: ₱${orderData.totalAmount}
            </div>
          </div>

          ${orderData.notes ? `
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c1810; margin-top: 0;">Special Notes</h3>
            <p>${orderData.notes}</p>
          </div>
          ` : ''}

          <p style="color: #666; font-size: 12px;">
            This order was placed through the Silung Coffee website.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Order email sending error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactEmail,
  sendOrderEmail
};
