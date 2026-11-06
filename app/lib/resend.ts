const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function parseEmailList(value: string | undefined) {
  return (value ?? "")
    .split(/[,;]/)
    .map((part) => part.trim())
    .filter((part) => EMAIL_PATTERN.test(part));
}

export function getResendFrom(displayName: string) {
  const raw = process.env.RESEND_FROM_EMAIL?.trim();
  if (!raw) return null;
  if (/<[^>]+>/.test(raw)) return raw;
  if (!EMAIL_PATTERN.test(raw)) return null;
  return `${displayName} <${raw}>`;
}

export function getStaffEmails() {
  return parseEmailList(process.env.RESEND_STAFF_EMAILS);
}
