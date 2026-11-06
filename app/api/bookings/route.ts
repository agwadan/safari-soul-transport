import { NextResponse } from "next/server";
import { Resend } from "resend";
import { fleet } from "../../components/data/fleet";
import { QuoteError, verifyQuote } from "../../lib/quote-server";
import { formatDistance, formatDuration } from "../../lib/pricing";
import { getResendFrom, getStaffEmails } from "../../lib/resend";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const quote = verifyQuote(body?.quoteToken);
    const catalogVehicle = fleet.find((entry) => entry.id === body.vehicleId);
    const fare = quote.fares.find(
      (entry) => entry.vehicleId === body.vehicleId,
    );
    const counts = body.counts;
    if (
      !catalogVehicle ||
      !fare ||
      !counts ||
      !Number.isInteger(counts.passengers) ||
      counts.passengers < 1 ||
      counts.passengers > catalogVehicle.maxPassengers ||
      !Number.isInteger(counts.suitcases) ||
      counts.suitcases < 0 ||
      counts.suitcases > catalogVehicle.maxSuitcases ||
      !Number.isInteger(counts.handbags) ||
      counts.handbags < 0 ||
      counts.handbags > 20 ||
      typeof body.name !== "string" ||
      !body.name.trim() ||
      body.name.length > 100 ||
      typeof body.email !== "string" ||
      body.email.length > 254 ||
      !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(body.email) ||
      typeof body.phone !== "string" ||
      !/^\+?[\d\s()-]{9,30}$/.test(body.phone) ||
      body.paymentMethod !== "cash"
    ) {
      return NextResponse.json(
        {
          error:
            "Please check the vehicle, passenger counts and contact details.",
        },
        { status: 400 },
      );
    }
    const customerFrom = getResendFrom("Safari Soul Dispatch");
    const teamFrom = getResendFrom("Safari Soul System");
    const staffEmails = getStaffEmails();
    if (!process.env.RESEND_API_KEY || !customerFrom || !teamFrom || staffEmails.length === 0)
      return NextResponse.json(
        {
          error: "Booking notifications are unavailable. Please call dispatch.",
        },
        { status: 503 },
      );
    const resend = new Resend(process.env.RESEND_API_KEY);
    const vehicle = { ...catalogVehicle, priceKes: fare.totalKes };
    // Only server-signed addresses, dates and prices are used in the emails.
    const trip = {
      ...quote.trip,
      pickup: escapeHtml(quote.trip.pickup),
      destination: escapeHtml(quote.trip.destination),
      flight: escapeHtml(quote.trip.flight),
    };
    const name = escapeHtml(body.name.trim());
    const phone = body.phone.trim();
    const email = body.email.trim();
    const paymentMethod = body.paymentMethod;
    const routeSummary =
      quote.legs
        .map(
          (leg, index) =>
            "<p><strong>" +
            (index === 0 ? "Outbound" : "Return") +
            ":</strong> " +
            formatDistance(leg.distanceMeters) +
            " · approx. " +
            formatDuration(leg.durationSeconds) +
            "<br/>KES " +
            fare.baseKes.toLocaleString() +
            " base + " +
            fare.extraBlocks[index] +
            " extra 5 km blocks × KES " +
            fare.extraBlockKes.toLocaleString() +
            " = KES " +
            fare.legTotalsKes[index].toLocaleString() +
            "</p>",
        )
        .join("") +
      (trip.tripType === "return"
        ? "<p><strong>Return pickup:</strong> " +
          trip.returnDate +
          " at " +
          trip.returnTime +
          " (EAT)</p>"
        : "");

    console.log("sending confirmation email to the customer");
    // 1. Send confirmation email to the Customer
    const customerEmailPromise = resend.emails.send({
      from: customerFrom,
      to: [email],
      subject: `Booking Confirmed: ${vehicle.name} (${trip.pickup} to ${trip.destination})`,
      html: `
          <div style="margin:0;padding:32px 12px;background-color:#f4f4f6;font-family:Arial,Helvetica,sans-serif;color:#0a0a0a;">
            <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e9;border-radius:14px;overflow:hidden;">
      
              <!-- Header -->
              <div style="background:#0a0a0a;padding:28px 32px;text-align:center;">
                <p style="margin:0;color:#e5a910;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">
                  SAFARI SOUL
                </p>
                <h1 style="margin:10px 0 0;color:#ffffff;font-size:25px;font-weight:600;letter-spacing:-0.5px;">
                  Your journey awaits.
                </h1>
                <p style="margin:10px 0 0;color:#c7c7ce;font-size:13px;line-height:1.6;">
                  Executive transport, thoughtfully arranged.
                </p>
              </div>
      
              <!-- Confirmation -->
              <div style="padding:30px 32px 20px;">
                <div style="display:inline-block;padding:7px 12px;background:#fff8e5;border:1px solid #f3dfaa;border-radius:20px;">
                  <span style="color:#9a7000;font-size:11px;font-weight:bold;letter-spacing:0.7px;">
                    &#10003; &nbsp; BOOKING CONFIRMED
                  </span>
                </div>
      
                <h2 style="margin:20px 0 10px;font-size:22px;line-height:1.4;font-weight:600;">
                  Hello ${name},
                </h2>
                <p style="margin:0;color:#62626b;font-size:14px;line-height:1.8;">
                  Thank you for choosing Safari Soul. Your transport booking details are below. We're looking forward to making your journey comfortable and seamless.
                </p>
              </div>
      
              <!-- Trip Summary -->
              <div style="padding:0 32px 24px;">
                <div style="border:1px solid #e5e5e9;border-radius:10px;overflow:hidden;">
      
                  <div style="padding:17px 20px;background:#f8f8fa;border-bottom:1px solid #e5e5e9;">
                    <p style="margin:0 0 5px;color:#77767b;font-size:10px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">
                      YOUR TRIP
                    </p>
                    <h3 style="margin:0;font-size:17px;font-weight:600;">
                      ${vehicle.name}
                    </h3>
                   
                  </div>
      
                  <div style="padding:20px;">
                    <!-- Route -->
                    <table role="presentation" style="width:100%;border-collapse:collapse;">
                      <tr>
                        <td style="width:24px;vertical-align:top;padding:3px 0 18px;">
                          <div style="width:10px;height:10px;border:2px solid #e5a910;border-radius:50%;margin-top:3px;"></div>
                        </td>
                        <td style="vertical-align:top;padding:0 0 18px;">
                          <p style="margin:0 0 5px;color:#77767b;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">PICKUP</p>
                          <p style="margin:0;font-size:14px;font-weight:600;line-height:1.6;">${trip.pickup}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:24px;vertical-align:top;padding:3px 0 0;">
                          <div style="width:10px;height:10px;background:#0a0a0a;border-radius:2px;margin-top:3px;"></div>
                        </td>
                        <td style="vertical-align:top;padding:0;">
                          <p style="margin:0 0 5px;color:#77767b;font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">DROP-OFF</p>
                          <p style="margin:0;font-size:14px;font-weight:600;line-height:1.6;">${trip.destination}</p>
                        </td>
                      </tr>
                    </table>
      
                    <div style="height:1px;background:#e9e9ed;margin:22px 0;"></div>
      
                    <!-- Booking Details -->
                    <table role="presentation" style="width:100%;border-collapse:collapse;">
                      <tr>
                        <td style="padding:0 10px 18px 0;width:50%;vertical-align:top;">
                          <p style="margin:0 0 6px;color:#77767b;font-size:11px;">DATE</p>
                          <p style="margin:0;font-size:13px;font-weight:600;line-height:1.6;">${trip.date}</p>
                        </td>
                        <td style="padding:0 0 18px 10px;width:50%;vertical-align:top;">
                          <p style="margin:0 0 6px;color:#77767b;font-size:11px;">PICKUP TIME</p>
                          <p style="margin:0;font-size:13px;font-weight:600;line-height:1.6;">${trip.time}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 10px 18px 0;vertical-align:top;">
                          <p style="margin:0 0 6px;color:#77767b;font-size:11px;">PASSENGERS</p>
                          <p style="margin:0;font-size:13px;font-weight:600;">${counts.passengers}</p>
                        </td>
                        <td style="padding:0 0 18px 10px;vertical-align:top;">
                          <p style="margin:0 0 6px;color:#77767b;font-size:11px;">SUITCASES</p>
                          <p style="margin:0;font-size:13px;font-weight:600;">${counts.suitcases}</p>
                        </td>
                      </tr>
                      ${
                        trip.flight
                          ? `
                            <tr>
                              <td colspan="2" style="padding:0 0 18px;">
                                <p style="margin:0 0 6px;color:#77767b;font-size:11px;">FLIGHT NUMBER</p>
                                <p style="margin:0;font-size:13px;font-weight:600;">${trip.flight}</p>
                              </td>
                            </tr>
                          `
                          : ""
                      }
                      <tr>
                        <td colspan="2" style="padding-top:15px;border-top:1px solid #e9e9ed;">
                          <p style="margin:0 0 6px;color:#77767b;font-size:11px;">PAYMENT METHOD</p>
                          <p style="margin:0;font-size:13px;font-weight:600;">
                            ${paymentMethod === "cash" ? "Cash to Driver" : paymentMethod}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
      
              <div style="padding:0 32px 24px;font-size:13px;line-height:1.7;">${routeSummary}<p>Each leg includes 40 km. Additional distance is charged per started 5 km.</p></div>
              <!-- Fare -->
              <div style="padding:0 32px 28px;">
                <div style="background:#0a0a0a;border-radius:10px;padding:22px 24px;">
                  <p style="margin:0 0 8px;color:#c7c7ce;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">
                    TOTAL FARE
                  </p>
                  <p style="margin:0;color:#ffffff;font-size:30px;font-weight:600;letter-spacing:-0.5px;">
                    <span style="color:#e5a910;font-size:16px;">KES</span>
                    ${vehicle.priceKes.toLocaleString("en-KE")}
                  </p>
                  <p style="margin:8px 0 0;color:#c7c7ce;font-size:12px;line-height:1.6;">
                    ${paymentMethod === "cash" ? "Payment is due to your driver." : "As per your selected payment method."}
                  </p>
                </div>
              </div>
      
              <!-- Support -->
              <div style="padding:0 32px 30px;">
                <h3 style="margin:0 0 9px;font-size:16px;font-weight:600;">
                  We're here to help.
                </h3>
                <p style="margin:0 0 18px;color:#62626b;font-size:13px;line-height:1.8;">
                  Your chauffeur will meet you at the scheduled pickup point. Need to make a change or have a question? Get in touch with our team.
                </p>
                <a href="https://wa.me/254792485814"
                   style="display:inline-block;padding:12px 20px;background:#e5a910;color:#0a0a0a;text-decoration:none;font-size:13px;font-weight:bold;border-radius:6px;">
                  Contact us on WhatsApp
                </a>
                <p style="margin:14px 0 0;color:#62626b;font-size:12px;">
                  Or call us: <a href="tel:+254792485814" style="color:#0a0a0a;text-decoration:none;font-weight:bold;">+254 792 485 814</a>
                </p>
              </div>
      
              <!-- Footer -->
              <div style="padding:22px 32px;background:#f8f8fa;border-top:1px solid #e5e5e9;text-align:center;">
                <p style="margin:0 0 8px;color:#0a0a0a;font-size:12px;font-weight:bold;letter-spacing:2px;">
                  SAFARI SOUL
                </p>
                <p style="margin:0 0 10px;color:#77767b;font-size:11px;line-height:1.7;">
                  Thank you for travelling with us.<br/>
                  © 2026 Agara Ventures Limited. All rights reserved.
                </p>
              </div>
      
            </div>
          </div>
        `,
    });

    // 2. Send notification email to the Internal Team
    const teamEmailPromise = resend.emails.send({
      from: teamFrom,
      to: staffEmails,
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
            <p><strong>Payment Method:</strong> ${paymentMethod === "cash" ? "Cash to Driver" : paymentMethod}</p>
            ${routeSummary}
            <p><strong>Total Revenue:</strong> KES ${vehicle.priceKes.toLocaleString()}</p>
          </div>

          <p style="font-size: 12px; color: #77767b;">Please assign a chauffeur and confirm dispatch.</p>
        </div>
      `,
    });

    // Run both emails concurrently
    const [customerResult, teamResult] = await Promise.all([
      customerEmailPromise,
      teamEmailPromise,
    ]);
    // Resend resolves with { data, error } on provider failures; it does not
    // necessarily throw. Check each result before confirming success.
    if (customerResult.error || teamResult.error) {
      for (const [recipient, result] of [
        ["customer", customerResult],
        ["team", teamResult],
      ] as const) {
        if (result.error) {
          console.error(`[bookings] Resend rejected ${recipient} email`, {
            name: result.error.name,
            statusCode: result.error.statusCode,
            message: result.error.message,
          });
        }
      }
      return NextResponse.json(
        {
          error:
            "We couldn’t send all booking notifications. Please contact our team to confirm your booking.",
        },
        { status: 502 },
      );
    }
    console.log("confirmation emails sent successfully ✅");

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof QuoteError)
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status },
      );
    if (error instanceof SyntaxError)
      return NextResponse.json(
        { error: "Invalid booking details." },
        { status: 400 },
      );
    console.log("Resend error:", error);
    console.log("failed to send confirmation emails");
    return NextResponse.json(
      { error: "Failed to send confirmation emails" },
      { status: 500 },
    );
  }
}
