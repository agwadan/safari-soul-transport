import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Header from "../components/layout/Header";
import TopBar from "../components/layout/TopBar";
import Footer from "../components/layout/Footer";
import ChatButton from "../components/contact/ChatButton";
import ContactForm from "../components/contact/ContactForm";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Us | SafariSoul",
  description: "Contact SafariSoul for airport transfer enquiries and help with an existing booking in Kenya and Uganda. Call, email, or chat with our team.",
};

export default function ContactPage() {
  return <>
    <TopBar /><Header />
    <main id="main-content">
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="pointer-events-none absolute -right-24 -top-48 h-96 w-96 rounded-full bg-[#e5a910]/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-margin">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#e5a910]">Contact SafariSoul</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">A little help.<br /><span className="text-[#e5a910]">A smoother journey.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-300 sm:text-lg">Planning your transfer or need help with a booking? Get in touch with our team in Kenya and Uganda.</p>
          <Link href="/#hero" className="mt-8 inline-flex items-center gap-3 border-b border-neutral-500 pb-2 text-sm font-semibold transition hover:border-[#e5a910] hover:text-[#e5a910]">Ready to travel? Book a transfer <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-margin">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <section aria-labelledby="reach-us">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#9a7000]">Let’s talk</p>
            <h2 id="reach-us" className="text-2xl font-bold tracking-tight sm:text-3xl">Here for your next step.</h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">For an upcoming pickup or a last-minute change, call the team directly. Have your booking reference or travel details ready.</p>
            <div className="mt-7 overflow-hidden rounded-xl border border-neutral-200 bg-white">
              {[{ country: "Kenya", phone: "+254792485814", label: "+254 792 485 814" }, { country: "Uganda", phone: "+256705530039", label: "+256 705 530 039" }].map(({ country, phone, label }) => <a key={country} href={`tel:${phone}`} className="flex items-center gap-4 border-b border-neutral-200 p-5 transition last:border-0 hover:bg-[#fdf6e2] focus-visible:outline-2 focus-visible:outline-[#b27c00]"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fdf6e2]"><Phone size={19} aria-hidden="true" /></span><span><span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">Call {country}</span><span className="mt-1 block text-lg font-semibold">{label}</span></span><ArrowRight className="ml-auto" size={18} aria-hidden="true" /></a>)}
            </div>
            <a href="mailto:info@safarisoul.africa" className="my-4 flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-[#b27c00]"><Mail className="shrink-0" size={22} aria-hidden="true" /><span><span className="block font-semibold">Email us</span><span className="mt-1 block break-all text-sm text-neutral-600">info@safarisoul.africa</span></span></a>
            <ChatButton />
            <div className="mt-8 border-t border-neutral-200 pt-6"><p className="flex items-center gap-2 text-sm font-semibold"><MapPin size={17} aria-hidden="true" />Serving Kenya &amp; Uganda</p><p className="mt-3 text-sm leading-6 text-neutral-600">Jomo Kenyatta International · Wilson Airport · Entebbe International</p></div>
          </section>
          <section aria-labelledby="send-message" className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
            <h2 id="send-message" className="text-2xl font-bold tracking-tight">Send us a message</h2>
            <p className="mb-7 mt-3 text-sm leading-6 text-neutral-600">For general questions and booking enquiries. If your pickup is imminent, please call us instead.</p>
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>;
}
