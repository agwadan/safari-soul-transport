import type { Metadata } from "next";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
export const metadata: Metadata = {
  title: "Privacy Policy | SafariSoul",
  description:
    "Learn how SafariSoul collects, uses, stores, and protects personal information when you use our airport transfer and chauffeur services.",
};

type PolicySection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
  closing?: string;
  contact?: boolean;
  subsections?: {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
};

const sections: PolicySection[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      'Agara Ventures Ltd ("SafariSoul", "we", "us", or "our") respects your privacy and is committed to protecting the personal information you share with us.',
      "This Privacy Policy explains how we collect, use, store, disclose, and protect personal information when you visit airport.safarisoul.africa, request a quotation, make a booking, or use our airport transfer and chauffeur services.",
      "By using our website or services, you acknowledge that you have read this policy. Where consent is required by applicable law, we will request it separately.",
    ],
  },
  {
    title: "2. Information We Collect",
    subsections: [
      {
        title: "2.1 Booking information",
        bullets: [
          "Pickup and drop-off locations.",
          "Pickup dates and times, including return-trip details where applicable.",
          "Flight numbers and related travel information.",
          "Passenger numbers and luggage requirements.",
          "Vehicle preferences and requested services.",
        ],
      },
      {
        title: "2.2 Contact information",
        paragraphs: [
          "When you submit a booking request or communicate with our team, we may collect your name, telephone number, email address, and other contact details you provide.",
        ],
      },
      {
        title: "2.3 Payment information",
        paragraphs: [
          "Where payments are offered through our website or booking process, we may receive transaction references, payment status, and other information necessary to reconcile your booking.",
          "Payment card or mobile money details may be processed by the relevant payment provider. We will describe the applicable arrangements when payment facilities are introduced or used. We do not claim that payment details are never stored unless our actual payment arrangements support that statement.",
        ],
      },
      {
        title: "2.4 Technical information",
        paragraphs: [
          "When you visit our website, we or our service providers may collect technical information such as your IP address, browser type, device information, pages visited, and basic usage information.",
          "Cookies and similar technologies may be used where implemented to support website functionality, security, preferences, and analytics.",
        ],
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    intro: "We may use your information to:",
    bullets: [
      "Process booking requests and prepare transfer quotations.",
      "Arrange pickups, drop-offs, chauffeurs, and vehicles.",
      "Coordinate airport arrivals and departures.",
      "Monitor flight information where flight-tracking services are used.",
      "Communicate booking confirmations, updates, delays, and changes.",
      "Calculate applicable fares and manage payments or refunds.",
      "Respond to enquiries, complaints, and support requests.",
      "Maintain website security and improve our services.",
      "Comply with applicable legal, regulatory, tax, and accounting requirements.",
      "Prevent fraud, misuse, and unauthorised bookings.",
    ],
    closing:
      "We will not use your personal information for unrelated purposes where doing so would be inconsistent with this policy or applicable law.",
  },
  {
    title: "4. Legal Basis for Processing",
    intro:
      "Where applicable data protection law requires a legal basis for processing, we may rely on:",
    bullets: [
      "Contractual necessity: to process and fulfil your booking.",
      "Legal obligations: to comply with applicable laws and lawful requests.",
      "Legitimate interests: to secure our website, administer our services, prevent fraud, and improve operations, where these interests do not override your rights.",
      "Consent: where you have consented to a particular use, such as optional marketing communications or non-essential cookies where consent is required.",
    ],
    closing:
      "Where processing is based on consent, you may withdraw that consent, subject to applicable law.",
  },
  {
    title: "5. Sharing Your Information",
    intro:
      "We may share relevant information with trusted third parties where necessary to provide our services, including:",
    bullets: [
      "Chauffeurs and transport partners: to arrange and complete your journey.",
      "Flight-information providers: to monitor relevant flight details and coordinate airport pickups.",
      "Technology and hosting providers: to operate, secure, and maintain our website and booking systems.",
      "Mapping and location providers: where location-search or mapping services are used.",
      "Payment providers: where applicable, to process transactions and refunds.",
      "Professional advisers and public authorities: where necessary for legal compliance, dispute resolution, or the establishment or defence of legal claims.",
    ],
    closing:
      "We aim to share only information reasonably necessary for the relevant purpose. We do not sell your personal information to third parties. Some service providers may process information outside Kenya or Uganda. Where this occurs, we will take the safeguards required by applicable data protection law.",
  },
  {
    title: "6. Data Retention",
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary for the purposes described in this policy, including fulfilling bookings, handling disputes, maintaining appropriate business records, and meeting legal obligations.",
      "Retention periods depend on the type of information, the nature of the service, and applicable legal requirements. When information is no longer required, we will securely delete it or anonymise it where appropriate.",
    ],
  },
  {
    title: "7. Data Security",
    paragraphs: [
      "We use reasonable technical and organisational measures intended to protect personal information against unauthorised access, loss, alteration, disclosure, or misuse.",
      "However, no website, electronic transmission, or storage system can be guaranteed to be completely secure. We will handle security incidents in accordance with applicable legal requirements.",
    ],
  },
  {
    title: "8. Cookies and Website Technologies",
    paragraphs: [
      "Our website may use essential technologies to operate correctly and, where implemented, optional analytics or other cookies.",
      "You can manage cookies through the controls provided on our website, where available, or through your browser settings. Disabling certain technologies may affect some website functionality.",
      "Where applicable law requires consent before optional cookies or similar technologies are used, we will seek that consent.",
    ],
  },
  {
    title: "9. Your Privacy Rights",
    intro: "Subject to applicable law, you may have the right to:",
    bullets: [
      "Request access to personal information we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of personal information where legally permitted.",
      "Object to certain processing or request restrictions.",
      "Withdraw consent where processing relies on consent.",
      "Request a copy of certain information in a portable format.",
      "Lodge a complaint with the relevant data protection authority.",
    ],
    closing:
      "To exercise these rights, contact us using the details in Section 12. We may need to verify your identity before responding.",
  },
  {
    title: "10. Children's Information",
    paragraphs: [
      "Our website and booking services are intended for people arranging transport services, rather than for children to use independently.",
      "If a booking includes children, the person making the booking should provide only the information reasonably necessary to arrange the journey and should be authorised to provide it.",
      "Where applicable law requires parental or guardian consent for the processing of a child's personal information, we will comply with those requirements.",
    ],
  },
  {
    title: "11. Third-Party Websites and Services",
    paragraphs: [
      "Our website may link to external websites or rely on third-party services. Those services may operate under their own privacy policies and terms.",
      "We encourage you to review their policies before providing information directly to them. This policy does not govern third-party websites or services independently operated by other organisations.",
    ],
  },
  {
    title: "12. Contact Us",
    paragraphs: [
      "For privacy questions, requests concerning your personal information, or complaints about how your information is handled, contact:",
    ],
    contact: true,
  },
  {
    title: "13. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy to reflect changes in our services, technology, or legal obligations. The revised version will be published on our website with an updated revision date.",
      "Where required by law, we will provide notice or seek consent before implementing material changes.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
    <TopBar />
    <Header />  
    <main className="min-h-screen bg-background text-[#0a0a0a]">
      <header className="border-b border-border-hairline bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
         
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            Last updated: 27 October 2026
          </p>
          <p className="mt-6 max-w-2xl leading-7 text-neutral-600">
            Learn how SafariSoul collects, uses, and protects information when
            you arrange airport transfers and chauffeur services with us.
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
              {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="mt-6">
                  <h3 className="text-lg font-semibold">{subsection.title}</h3>
                  {subsection.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-3 leading-7 text-neutral-700">
                      {paragraph}
                    </p>
                  ))}
                  {subsection.bullets && (
                    <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-neutral-700 marker:text-[#b27c00]">
                      {subsection.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {section.contact && (
                <address className="mt-4 not-italic leading-7 text-neutral-700">
                  <strong>Agara Ventures Ltd — SafariSoul</strong>
                  <br />
                  Website: <a className="underline underline-offset-4 hover:text-[#9a6f05]" href="https://airport.safarisoul.africa">airport.safarisoul.africa</a>
                  <br />
                  Kenya: <a href="tel:+254792485814" className="underline underline-offset-4 hover:text-[#9a6f05]">+254 (0) 792 485 814</a>
                  <br />
                  Uganda: <a href="tel:+256705530039" className="underline underline-offset-4 hover:text-[#9a6f05]">+256 (0) 705 530 039</a>
                  <p className="mt-3">Please include sufficient information for us to understand and respond to your request. Do not include passwords, full payment card details, or other unnecessary sensitive information.</p>
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
