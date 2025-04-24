
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

/**
 * Utility functions for interacting with external webhooks
 */

// Common webhook URL for all webhook functions
const WEBHOOK_URL = 'https://hook.eu2.make.com/x3gt3n29eljc7eu4qgr3jdkv6xufmmd3';
const WEBHOOK_URL2 = 'https://hook.eu2.make.com/1ekzc9dufiv9woseuf2vjxh1m3f4qegp';

/**
 * Sends contact form data to a Make.com webhook
 *
 * @param contactData The contact form data to send
 * @returns A promise that resolves when the webhook request is complete
 */
export async function sendContactFormToWebhook(contactData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<Response | Error> {
  try {
    // Create the email subject and body
    const emailSubject = `Contact Form: ${contactData.subject}`;

    const emailBody = `📬 New Contact Form Submission!

👤 Name: ${contactData.name}
📧 Email: ${contactData.email}
📱 Phone: ${contactData.phone || 'Not provided'}
📋 Subject: ${contactData.subject}

💬 Message:
${contactData.message}`;

    // Create the webhook data object
    const webhookData = {
      subject: emailSubject,
      body: emailBody,
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      formSubject: contactData.subject,
      message: contactData.message,
      // Specify the recipient email address
      recipientEmail: 'shaun@siamoon.com',
      formType: 'contact'
    };

    // Log the data being sent to the webhook for debugging
    console.log('Sending contact form data to webhook:', JSON.stringify(webhookData, null, 2));

    // Send the POST request to the webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (!response.ok) {
      console.error('Webhook request failed:', response.status, response.statusText);
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('Error sending contact form to webhook:', error);
    return error instanceof Error ? error : new Error('Unknown error sending contact form to webhook');
  }
}

/**
 * Sends booking data to a Make.com webhook for admin notification
 *
 * @param booking The booking data to send
 * @returns A promise that resolves when the webhook request is complete
 */
export async function sendBookingToMakeWebhook(booking: {
  id: string;
  propertyId: string;
  propertyName: string;
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  totalPrice: number;
  customerEmail: string;
  customerPhone: string;
}): Promise<Response | Error> {
  try {
    // Format dates to be more readable
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
    const formattedCheckIn = checkInDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const formattedCheckOut = checkOutDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Create the email subject and body
    const emailSubject = `New Booking: ${booking.propertyName} for ${booking.customerName}`;

    const emailBody = `🎉 New Booking Confirmed!

🏠 Property: ${booking.propertyName}
🧑 Guest: ${booking.customerName}
📅 Check-in: ${formattedCheckIn}
📅 Check-out: ${formattedCheckOut}
👥 Guests: ${booking.guestCount}
💰 Total Price: $${booking.totalPrice}

📧 Email: ${booking.customerEmail}
📱 Phone: ${booking.customerPhone}
🆔 Booking ID: ${booking.id}`;

    // Create the webhook data object
    const webhookData = {
      subject: emailSubject,
      body: emailBody,
      bookingId: booking.id,
      propertyName: booking.propertyName,
      customerName: booking.customerName,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      guestCount: booking.guestCount,
      totalPrice: booking.totalPrice,
      email: booking.customerEmail,
      phone: booking.customerPhone,
      formType: 'booking',
      // Specify the recipient email address
      recipientEmail: 'shaun@siamoon.com'
    };

    // Log the data being sent to the webhook for debugging
    console.log('Sending admin notification to webhook:', JSON.stringify(webhookData, null, 2));

    // Send the POST request to the webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (!response.ok) {
      console.error('Admin webhook request failed:', response.status, response.statusText);
      throw new Error(`Admin webhook request failed: ${response.status} ${response.statusText}`);
    }

    // Also send a confirmation email to the customer
    await sendBookingConfirmationToCustomer(booking, formattedCheckIn, formattedCheckOut);

    return response;
  } catch (error) {
    console.error('Error sending booking to webhook:', error);
    return error instanceof Error ? error : new Error('Unknown error sending booking to webhook');
  }
}

/**
 * Sends booking confirmation email to the customer
 *
 * @param booking The booking data to send
 * @param formattedCheckIn Formatted check-in date
 * @param formattedCheckOut Formatted check-out date
 * @returns A promise that resolves when the webhook request is complete
 */
export async function sendBookingConfirmationToCustomer(
  booking: {
    id: string;
    propertyId: string;
    propertyName: string;
    customerName: string;
    checkInDate: string;
    checkOutDate: string;
    guestCount: number;
    totalPrice: number;
    customerEmail: string;
    customerPhone: string;
  },
  formattedCheckIn: string,
  formattedCheckOut: string
): Promise<Response | Error> {
  try {
    // Create the email subject and body for customer
    const emailSubject = `Your Booking Confirmation: ${booking.propertyName}`;

    const emailBody = `🎉 Thank you for your booking, ${booking.customerName}!

Your reservation at ${booking.propertyName} has been confirmed.

📋 Booking Details:

🏠 Property: ${booking.propertyName}
📅 Check-in: ${formattedCheckIn}
📅 Check-out: ${formattedCheckOut}
👥 Guests: ${booking.guestCount}
💰 Total Price: $${booking.totalPrice}
🆔 Booking ID: ${booking.id}

If you have any questions or need to make changes to your reservation, please contact us at shaun@siamoon.com or call us at +66 812345678.

We look forward to welcoming you!

Sia Moon Luxury Estates Team`;

    // Create the webhook data object for customer confirmation
    const webhookData = {
      subject: emailSubject,
      body: emailBody,
      bookingId: booking.id,
      propertyName: booking.propertyName,
      customerName: booking.customerName,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      guestCount: booking.guestCount,
      totalPrice: booking.totalPrice,
      email: booking.customerEmail,
      phone: booking.customerPhone,
      formType: 'booking',
      // Send to the customer's email
      recipientEmail: booking.customerEmail
    };

    // Log the data being sent to the webhook for debugging
    console.log('Sending customer confirmation to webhook:', JSON.stringify(webhookData, null, 2));

    // Send the POST request to the customer confirmation webhook
    const response = await fetch(WEBHOOK_URL2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (!response.ok) {
      console.error('Customer confirmation webhook request failed:', response.status, response.statusText);
      throw new Error(`Customer confirmation webhook request failed: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('Error sending customer confirmation:', error);
    return error instanceof Error ? error : new Error('Unknown error sending customer confirmation');
  }
}
