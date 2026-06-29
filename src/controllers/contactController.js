const asyncHandler = require('../utils/asyncHandler');
const sendEmail = require('../utils/sendEmail');

// @desc    Send contact form message
// @route   POST /api/contact
// @access  Public
exports.sendContactMessage = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields' });
  }

  try {
    // Send email to support
    await sendEmail({
      email: 'seharchattha226@gmail.com', // Change to your support email
      subject: `New Contact Form Submission from ${name}`,
      message: `
        You have received a new message from your website contact form:
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    // Send confirmation email to user
    await sendEmail({
      email,
      subject: 'Thank you for contacting FounderLink!',
      message: `
        Hi ${name},
        
        Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.
        
        Your message:
        ${message}
        
        Best regards,
        The FounderLink Team
      `,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message, please try again later' });
  }
});
