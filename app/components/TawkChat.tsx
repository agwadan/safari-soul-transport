import Script from "next/script";

export default function TawkChat() {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

  if (!propertyId || !widgetId) return null;

  // Restrict configuration to IDs before embedding it in inline JavaScript.
  if (!/^[a-zA-Z0-9]+$/.test(propertyId) || !/^[a-zA-Z0-9]+$/.test(widgetId)) {
    return null;
  }

  return (
    <Script id="tawk-live-chat" strategy="afterInteractive">
      {`
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        (function () {
          var script = document.createElement("script");
          script.async = true;
          script.src = "https://embed.tawk.to/${propertyId}/${widgetId}";
          script.charset = "UTF-8";
          script.setAttribute("crossorigin", "*");
          document.head.appendChild(script);
        })();
      `}
    </Script>
  );
}
