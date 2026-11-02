This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Live chat (tawk.to)

The root layout mounts `app/components/TawkChat.tsx` once across all pages.
Next.js Script loads the widget after hydration and preserves it across client
navigation without inserting duplicate scripts.

Configure these public identifiers in `.env` locally and in your hosting
provider's environment settings before building/deploying:

```dotenv
NEXT_PUBLIC_TAWK_PROPERTY_ID=6ae74d1c052a1a3c2f63cd66
NEXT_PUBLIC_TAWK_WIDGET_ID=1k6boaef8
```

Restart development after changing these values. Rebuild/redeploy production.
Both values are public widget identifiers, not account credentials. Missing or
invalid values disable the widget.

Staff reply at https://dashboard.tawk.to/ or from the tawk.to mobile app.
Sign in to the same property, enable notifications, and set availability online.
Configure branding, the greeting, and offline messages in the tawk.to dashboard.

PostHog analytics remains enabled. `disable_conversations: true` in
`instrumentation-client.ts` disables its Support widget to avoid two chat buttons,
including when the PostHog dashboard's widget setting is enabled.

To verify: fully reload the site in a private window, confirm only the tawk.to
bubble appears, navigate between home and policy pages, then send a test message
and reply from the tawk.to dashboard or mobile app. Check that the reply appears
on the site and that mobile notifications arrive when the app is in the background.

Documentation: https://help.tawk.to/article/adding-a-widget-to-your-website

## Contact page

`/contact` includes regional phone links, info@safarisoul.africa, a tawk.to chat
launcher, and an enquiry form. Desktop/mobile navigation and the footer link to it.

`POST /api/contact` uses the existing RESEND_API_KEY and verified sender
info@safarisoul.africa. Enquiries go to the same two team inboxes as bookings,
with the customer's address as Reply-To. No customer confirmation email is sent.
The handler validates input, limits body size, rejects cross-origin browser
requests, and includes a honeypot. It reports provider errors rather than showing
a false success. Configure hosting-level rate limiting on this public endpoint
if spam becomes an issue; the honeypot is not a complete bot protection system.

Before launch, verify a real enquiry reaches the team and that Reply replies to
the customer. WhatsApp links and specific email/chat response hours are omitted
pending confirmation. The existing site-wide dispatch banner is reused.
