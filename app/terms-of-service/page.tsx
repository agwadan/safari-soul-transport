import type { Metadata } from "next";
import Footer from "../components/layout/Footer";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";

export const metadata: Metadata = {
  title: "Terms and Conditions | SafariSoul",
  description:
    "Read the terms governing SafariSoul airport transfers, chauffeur services, bookings, pricing, and cancellations.",
};

type TermsSection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
  closing?: string;
  contact?: boolean;
  privacyLink?: boolean;
};

const sections: TermsSection[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      'These Terms and Conditions govern your use of the SafariSoul airport transfer website at airport.safarisoul.africa and the transport services arranged through it.',
      'The website identifies Agara Ventures Ltd ("SafariSoul", "we", "us", or "our") as its operator.',
      "By submitting a booking request or using our services, you agree to these Terms and Conditions. If you do not agree, please do not proceed with a booking.",
    ],
  },
  {
    title: "2. Our Services",
    intro: "SafariSoul provides executive airport transfers and chauffeur services, including:",
    bullets: [
      "Airport pickups and drop-offs.",
      "City transfers.",
    /*   "Hourly chauffeur services.", */
      "Intercity and regional journeys.",
      "Corporate transport arrangements.",
    ],
    closing:
      "Our website currently presents services serving Jomo Kenyatta International Airport and Wilson Airport in Nairobi, Kenya, and Entebbe International Airport in Uganda. The availability of a particular route, vehicle, chauffeur, or service depends on the journey requested and confirmation by SafariSoul.",
  },
  {
    title: "3. Booking Requests and Confirmation",
    paragraphs: [
      "Submitting a booking request through the website does not, by itself, guarantee that a vehicle or chauffeur has been reserved.",
      "A booking becomes confirmed when SafariSoul communicates acceptance through an appropriate confirmation channel, such as a booking confirmation or written communication.",
      "You are responsible for providing accurate booking information, including pickup and destination addresses, travel date and pickup time, flight number where applicable, passenger and luggage counts, accurate contact details, and any relevant special requirements.",
      "Please review your booking confirmation and notify us promptly if any information is incorrect. We may contact you to clarify details, confirm availability, or discuss a suitable alternative where the requested service cannot be provided.",
    ],
  },
  {
    title: "4. Pricing and Fares",
    paragraphs: [
      "Our website displays indicative starting prices for selected vehicles and services. The final fare depends on the journey, selected vehicle, service type, and any applicable terms communicated during the booking process.",
      "Where a fixed fare is confirmed, it will cover the inclusions expressly stated in your quotation or booking confirmation.",
      "Our advertised airport transfer service includes applicable toll roads, congestion fees, airport parking, and up to 60 minutes of terminal waiting time, subject to the scope of the confirmed booking.",
      "Any additional charges must be communicated before they are incurred wherever reasonably practicable, except where applicable law provides otherwise.",
      "We advertise zero surge pricing for our airport transfer service. A change to a requested route, vehicle, service duration, or booking arrangement may nevertheless require a revised quotation, which will be communicated for agreement before proceeding.",
      "All prices and currency details displayed in your booking quotation or confirmation should be reviewed before the booking is accepted.",
    ],
  },
  {
    title: "5. Payment",
    paragraphs: [
      "Any deposit, payment deadline, accepted payment method, or balance due will be communicated during the booking process or in your quotation.",
      "Where payment is required to confirm a booking, the booking will be subject to the stated payment conditions. If payment is not received by an agreed deadline, we may contact you to resolve the issue or cancel an unconfirmed booking, subject to any applicable agreement and law.",
      "Refunds, where applicable, will be processed through the relevant payment method or another agreed method, subject to the applicable payment provider's procedures.",
    ],
  },
  {
    title: "6. Cancellations and Refunds",
    paragraphs: [
      "SafariSoul advertises free cancellation up to 24 hours before the scheduled pickup time.",
      "To qualify under this advertised policy, you must submit your cancellation at least 24 hours before the scheduled pickup time through the cancellation facility provided for your booking or by contacting our support team.",
      "Where a cancellation is received within this period, the booking is eligible for cancellation without a cancellation fee, subject to the terms of the confirmed booking and applicable law.",
      "The website does not currently specify a complete cancellation-fee schedule for cancellations made less than 24 hours before pickup. Any applicable charge must therefore be communicated and agreed as part of the booking terms.",
      "If SafariSoul must cancel a confirmed booking, we will notify you as soon as reasonably practicable and work with you to arrange an appropriate alternative or refund of amounts paid for the cancelled service, as applicable. Refund processing times may depend on the payment provider.",
    ],
  },
  {
    title: "7. Changes to Bookings",
    paragraphs: [
      "Please contact us as soon as possible if you need to change your pickup time, route, passenger count, luggage requirements, or selected vehicle. Changes are subject to availability and may affect the agreed fare.",
      "A change is not confirmed until SafariSoul communicates its acceptance. Please do not assume that a message requesting a change automatically changes your booking.",
      "If a flight is delayed or rescheduled, notify us where possible and provide updated flight details. Our flight-monitoring arrangements may help us adjust airport pickup coordination, but you should not rely on tracking alone as a substitute for communicating a material change.",
    ],
  },
  {
    title: "8. Airport Pickups and Waiting Time",
    paragraphs: [
      "Our airport transfer service advertises flight tracking and a 60-minute airport waiting period.",
      "Where applicable to the confirmed airport pickup, the included waiting period is intended to accommodate arrival and airport exit procedures. The precise start time and any arrangements outside the included period should be confirmed in your booking details.",
      "If you expect a significant delay, cannot locate your chauffeur, or need assistance at the terminal, contact our support team.",
      "Additional waiting time, missed pickups, or changes to pickup arrangements should be handled according to the conditions communicated for your booking. We will not impose an undisclosed additional charge.",
    ],
  },
  {
    title: "9. Passenger and Luggage Requirements",
    paragraphs: [
      "You must provide accurate passenger and luggage counts when booking so that an appropriate vehicle can be arranged.",
      "The vehicle selected must have sufficient capacity for the passengers and luggage included in the confirmed booking. Additional passengers or luggage may require a different vehicle and a revised quotation.",
      "Passengers must comply with applicable road safety requirements and the chauffeur's reasonable safety instructions.",
      "Please advise us in advance of any accessibility requirements, child-seat needs, or other special arrangements. We will confirm whether these can be accommodated.",
    ],
  },
  {
    title: "10. Passenger Conduct and Safety",
    paragraphs: [
      "Passengers are expected to behave respectfully towards chauffeurs and other road users and to avoid conduct that creates a safety risk.",
      "Smoking, unlawful activity, damage to vehicles, and conduct that prevents the chauffeur from performing the journey safely are not permitted.",
      "A chauffeur may refuse to continue a journey where continuing would create a serious safety risk or require unlawful conduct. Where reasonably possible, we will explain the circumstances and discuss appropriate next steps.",
    ],
  },
  {
    title: "11. Chauffeurs and Vehicles",
    paragraphs: [
      "SafariSoul advertises vetted, appropriately licensed chauffeurs and executive vehicles.",
      "We make reasonable efforts to provide the vehicle and service described in your booking confirmation. If the specified vehicle becomes unavailable, we may propose a comparable alternative and communicate any material difference before proceeding.",
      "Vehicle images, descriptions, and categories on the website are illustrative of the service offered. The exact vehicle supplied may vary where an alternative has been agreed.",
    ],
  },
  {
    title: "12. Delays and Circumstances Beyond Our Control",
    paragraphs: [
      "We make reasonable efforts to provide punctual and reliable transport. However, journeys may be affected by circumstances outside our reasonable control, including severe weather, road closures, traffic incidents, airport restrictions, security events, government actions, or other emergencies.",
      "Where a material disruption occurs, we will make reasonable efforts to communicate relevant information and assist with alternative arrangements where possible.",
      "Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law.",
    ],
  },
  {
    title: "13. Lost Property",
    paragraphs: [
      "Passengers are responsible for checking that they have collected their belongings at the end of a journey.",
      "If you leave an item in a vehicle, contact our support team promptly with a description of the item, journey date, and relevant booking details.",
      "We will make reasonable efforts to help locate and return recovered items. Return arrangements and any applicable delivery costs will be discussed with you.",
    ],
  },
  {
    title: "14. Website Use",
    intro: "You agree to use our website lawfully and not to:",
    bullets: [
      "Submit false or misleading booking information.",
      "Attempt to gain unauthorised access to our website or systems.",
      "Interfere with the website's operation or security.",
      "Use our booking facilities for fraudulent or unlawful purposes.",
      "Copy, exploit, or misuse website content in a way that infringes applicable rights.",
    ],
    closing:
      "We may temporarily restrict access to parts of the website for maintenance, security, or operational reasons.",
  },
  {
    title: "15. Privacy",
    paragraphs: [
      "We process personal information in connection with website use, booking requests, and transport services in accordance with our Privacy Policy.",
      "Please read our Privacy Policy to understand what information we collect, how we use it, and the circumstances in which it may be shared.",
    ],
    privacyLink: true,
  },
  {
    title: "16. Liability",
    paragraphs: [
      "We will exercise reasonable care in arranging and providing the services covered by a confirmed booking.",
      "To the extent permitted by applicable law, we are not responsible for losses caused by circumstances outside our reasonable control or by inaccurate information supplied by a customer.",
      "Nothing in these Terms excludes or restricts any consumer rights, statutory obligations, or liability that cannot lawfully be excluded or restricted, including any applicable liability for death or personal injury caused by negligence.",
      "Where an issue arises with a journey, please contact us promptly so that we can investigate and seek an appropriate resolution.",
    ],
  },
  {
    title: "17. Complaints and Disputes",
    paragraphs: [
      "If you have a concern about a booking or journey, contact our support team with your booking details and a description of the issue.",
      "We will review the matter and work with you towards a reasonable resolution.",
      "These Terms do not prevent you from exercising any rights or remedies available to you under applicable law.",
    ],
  },
  {
    title: "18. Applicable Law",
    paragraphs: [
      "These Terms are subject to the applicable laws and mandatory consumer protections relevant to the services provided in the countries in which we operate.",
      "The appropriate legal jurisdiction for a particular dispute will be determined in accordance with applicable law.",
    ],
  },
  {
    title: "19. Changes to These Terms",
    paragraphs: [
      "We may update these Terms to reflect changes to our services, business operations, or legal requirements.",
      "The latest version will be published on our website with an updated revision date. Changes will not override rights or obligations that cannot lawfully be changed retrospectively.",
    ],
  },
  {
    title: "20. Contact Information",
    paragraphs: [
      "For booking changes, cancellation requests, complaints, or questions about these Terms, please contact our support team.",
    ],
    contact: true,
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
    <TopBar />
    <Header />
    <main className="min-h-screen bg-background text-[#0a0a0a]">
      <header className="border-b border-border-hairline bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            Last updated: 27 October 2026
          </p>
          <p className="mt-6 max-w-2xl leading-7 text-neutral-600">
            Please read these terms before booking an airport transfer or
            chauffeur service with SafariSoul.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="scroll-mt-24">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {section.title}
              </h2>
              {section.intro && (
                <p className="mt-4 leading-7 text-neutral-700">
                  {section.intro}
                </p>
              )}
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-7 text-neutral-700">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-neutral-700 marker:text-[#b27c00]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.closing && (
                <p className="mt-4 leading-7 text-neutral-700">
                  {section.closing}
                </p>
              )}
              {section.privacyLink && (
                <p className="mt-3 leading-7">
                  <a
                    href="/privacy-policy"
                    className="font-semibold text-[#8a6200] underline underline-offset-4 hover:text-[#0a0a0a]"
                  >
                    Read our Privacy Policy
                  </a>
                </p>
              )}
              {section.contact && (
                <address className="mt-4 not-italic leading-7 text-neutral-700">
                  <strong>Agara Ventures Ltd — SafariSoul</strong>
                  <br />
                  Website: <a className="underline underline-offset-4 hover:text-[#9a6f05]" href="https://airport.safarisoul.africa">airport.safarisoul.africa</a>
                  <br />
                  Kenya: <a href="tel:+254792485814" className="underline underline-offset-4 hover:text-[#9a6f05]">+254 (0) 792 485 814</a>
                  <br />
                  Uganda: <a href="tel:+256705530039" className="underline underline-offset-4 hover:text-[#9a6f05]">+256 (0) 705 530 039</a>
                </address>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
    <Footer />
    </>
    );
}
