import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

console.log('resend');
console.log(resend);
console.log(process.env.NEXT_PUBLIC_RESEND_API_KEY);


// List of your team member emails
const TEAM_EMAILS = [
  "stevenaraka@gmail.com",
  "agwa.dan@gmail.com",
  "safarisoul91@gmail.com",
  // Add as many team emails here as you need
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trip, counts, vehicle, name, phone, email, paymentMethod } = body;

    if (!email || !name || !vehicle) {
        console.log('missing required fields'); 
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log('sending confirmation email to the customer');
    // 1. Send confirmation email to the Customer
    const customerEmailPromise = resend.emails.send({
      from: "Safari Soul Dispatch <noreply@mafundi.co>", // Make sure this domain is verified in Resend
      to: [email],
      subject: `Booking Confirmed: ${vehicle.name} (${trip.pickup} to ${trip.destination})`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e2e6; border-radius: 12px;">
          <h2 style="color: #0a0a0a; border-bottom: 2px solid #e5a910; padding-bottom: 10px;">Safari Soul Booking Confirmation</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for booking with Safari Soul. Your executive transport request has been received and scheduled.</p>
          
          <div style="background: #f8f8fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; font-size: 16px; color: #0a0a0a;">Trip Summary</h3>
            <p><strong>Vehicle:</strong> ${vehicle.name} (${vehicle.model})</p>
            <p><strong>Pickup:</strong> ${trip.pickup}</p>
            <p><strong>Drop-off:</strong> ${trip.destination}</p>
            <p><strong>Date & Time:</strong> ${trip.date} at ${trip.time}</p>
            ${trip.flight ? `<p><strong>Flight Number:</strong> ${trip.flight}</p>` : ""}
            <p><strong>Passengers & Luggage:</strong> ${counts.passengers} Passengers, ${counts.suitcases} Suitcases</p>
            <p><strong>Payment Method:</strong> ${paymentMethod === 'cash' ? 'Cash to Driver' : paymentMethod}</p>
            <p><strong>Total Fare:</strong> KES ${vehicle.priceKes.toLocaleString()}</p>
          </div>

          <p>Your professional chauffeur will meet you at the scheduled pickup point. If you need to make changes, contact us via WhatsApp or phone at <strong>+254 792 485 814</strong>.</p>
          
          <p style="font-size: 12px; color: #77767b; margin-top: 30px; border-top: 1px solid #e2e2e6; pt-10px;">
            © 2026 Agara Ventures Limited. All rights reserved.
          </p>
        </div>
      `,
    });

    // 2. Send notification email to the Internal Team
    const teamEmailPromise = resend.emails.send({
      from: "Safari Soul System <noreply@mafundi.co>",
      to: TEAM_EMAILS,
      subject: `🚨 New Booking: ${name} - ${vehicle.name} (${trip.date})`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #0a0a0a; border-radius: 12px;">
          <h2 style="color: #ba1a1a; border-bottom: 2px solid #0a0a0a; padding-bottom: 10px;">New Booking Alert</h2>
          <p>A new reservation has just been booked through the website platform.</p>
          
          <div style="background: #f4f4f7; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; font-size: 16px; color: #0a0a0a;">Client Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone / WhatsApp:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Email:</strong> ${email}</p>
            
            <h3 style="margin-top: 16px; font-size: 16px; color: #0a0a0a;">Trip Logistics</h3>
            <p><strong>Vehicle:</strong> ${vehicle.name} (${vehicle.model})</p>
            <p><strong>Pickup:</strong> ${trip.pickup}</p>
            <p><strong>Drop-off:</strong> ${trip.destination}</p>
            <p><strong>Date & Time:</strong> ${trip.date} at ${trip.time}</p>
            ${trip.flight ? `<p><strong>Flight Number:</strong> ${trip.flight}</p>` : ""}
            <p><strong>Party:</strong> ${counts.passengers} Pax, ${counts.suitcases} Suitcases, ${counts.handbags} Cabin Bags</p>
            <p><strong>Payment Method:</strong> ${paymentMethod === 'cash' ? 'Cash to Driver' : paymentMethod}</p>
            <p><strong>Total Revenue:</strong> KES ${vehicle.priceKes.toLocaleString()}</p>
          </div>

          <p style="font-size: 12px; color: #77767b;">Please assign a chauffeur and confirm dispatch.</p>
        </div>
      `,
    });

    // Run both emails concurrently
    await Promise.all([customerEmailPromise, teamEmailPromise]);
    console.log('confirmation emails sent successfully ✅');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Resend error:", error);
    console.log('failed to send confirmation emails');
    return NextResponse.json({ error: "Failed to send confirmation emails" }, { status: 500 });
  }
}