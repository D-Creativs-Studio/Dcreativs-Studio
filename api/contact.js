/**
 * Serverless Contact API Handler for D'Creativs Studio
 * Vercel Serverless Function & Vite dev middleware compatible (pure Node.js / zero backend hosting).
 *
 * Dispatches:
 * 1. Studio Notification -> dcreativs.studio@gmail.com (with reply-to set to client's email)
 * 2. Client Confirmation -> client's email (designed dark-mode editorial confirmation)
 *
 * Strict Project Rules:
 * - ZERO emojis
 * - NO generic pill badges with status dots
 */

// Simple in-memory IP rate limiter (resets on cold start)
const ipRateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const record = ipRateLimitMap.get(ip) || { count: 0, firstRequest: now };

  if (now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
    ipRateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  ipRateLimitMap.set(ip, record);
  return false;
}

// Basic HTML escaping to prevent injection in generated email templates
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Builds the designed confirmation email HTML for the client
 * Adheres strictly to: NO emojis, NO pill badges with status dots.
 */
function buildClientConfirmationHtml({ name, company, services, budget, timeline, message }) {
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company || 'Independent');
  const safeServices = escapeHtml(Array.isArray(services) ? services.join(', ') : services);
  const safeBudget = escapeHtml(budget);
  const safeTimeline = escapeHtml(timeline);
  const safeMessage = escapeHtml(message);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brief Transmitted - D'Creativs Studio</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000422; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000422; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #080C2C; border: 1px solid rgba(136, 95, 255, 0.25); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 4, 34, 0.9);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 36px 40px 24px 40px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: linear-gradient(180deg, rgba(65, 0, 245, 0.15) 0%, rgba(8, 12, 44, 0) 100%);">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 6px 0; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #885FFF; font-weight: 700; font-family: monospace;">
                      D'CREATIVS STUDIO
                    </p>
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1.2;">
                      Brief Transmitted
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 40px 28px 40px;">
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #CBD5E1;">
                Hello <strong style="color: #FFFFFF;">${safeName}</strong>,
              </p>
              <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.6; color: #94A3B8;">
                Thank you for reaching out to D'Creativs Studio. We have safely received your project inquiry. Our strategy and engineering team is reviewing your requirements and will reply within 24 hours.
              </p>

              <!-- Brief Snapshot Card -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 16px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #885FFF; font-weight: 700; font-family: monospace;">
                      Transmitted Scope
                    </p>

                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; border-bottom: 1px solid rgba(255, 255, 255, 0.06); width: 38%;">Client</td>
                        <td style="padding: 8px 0; font-size: 13px; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.06); text-align: right;">${safeName} ${company ? `(${safeCompany})` : ''}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">Disciplines</td>
                        <td style="padding: 8px 0; font-size: 13px; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.06); text-align: right;">${safeServices}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">Budget Range</td>
                        <td style="padding: 8px 0; font-size: 13px; color: #C4B5FD; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.06); text-align: right;">${safeBudget}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 13px; color: #94A3B8; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">Target Timeline</td>
                        <td style="padding: 8px 0; font-size: 13px; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid rgba(255, 255, 255, 0.06); text-align: right;">${safeTimeline}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 13px; color: #94A3B8;">Turnaround SLA</td>
                        <td style="padding: 8px 0; font-size: 13px; color: #34D399; font-weight: 600; text-align: right;">Guaranteed Reply &lt; 24 hrs</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Note -->
              <p style="margin: 0 0 24px 0; font-size: 13px; line-height: 1.6; color: #94A3B8;">
                If you have additional attachments, architecture diagrams, or NDA documents to share prior to our call, simply reply directly to this email.
              </p>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius: 9999px; background: linear-gradient(135deg, #4100F5 0%, #885FFF 100%);">
                    <a href="https://dcreativs.com" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 13px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 9999px; letter-spacing: 0.02em;">
                      Visit D'Creativs Studio
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #04071E; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748B;">
                D'Creativs Studio — Built to be noticed
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                Confidential project inquiry confirmation. dcreativs.studio@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Builds the notification email HTML for the D'Creativs internal team
 */
function buildStudioNotificationHtml({ name, company, email, phone, services, budget, timeline, message, ip }) {
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company || 'Not specified');
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || 'Not specified');
  const safeServices = escapeHtml(Array.isArray(services) ? services.join(', ') : services);
  const safeBudget = escapeHtml(budget);
  const safeTimeline = escapeHtml(timeline);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry - ${safeName}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #0b0e2b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF;">
  <div style="max-width: 650px; margin: 0 auto; background-color: #12173d; border: 1px solid rgba(136, 95, 255, 0.3); border-radius: 16px; padding: 32px;">
    
    <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #885FFF; font-family: monospace; font-weight: 700;">
        NEW INCOMING BRIEF
      </p>
      <h2 style="margin: 0; font-size: 24px; color: #FFFFFF;">${safeName} — ${safeCompany}</h2>
      <p style="margin: 6px 0 0 0; font-size: 14px; color: #94A3B8;">Budget: <strong style="color: #C4B5FD;">${safeBudget}</strong> | Timeline: <strong style="color: #FFFFFF;">${safeTimeline}</strong></p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #94A3B8; width: 30%;">Contact Email:</td>
        <td style="padding: 8px 0; color: #FFFFFF;"><a href="mailto:${safeEmail}" style="color: #C4B5FD; text-decoration: none;">${safeEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94A3B8;">Phone / WhatsApp:</td>
        <td style="padding: 8px 0; color: #FFFFFF;">${safePhone}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94A3B8;">Company:</td>
        <td style="padding: 8px 0; color: #FFFFFF;">${safeCompany}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94A3B8;">Disciplines:</td>
        <td style="padding: 8px 0; color: #FFFFFF;">${safeServices}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94A3B8;">Sender IP:</td>
        <td style="padding: 8px 0; color: #64748B; font-family: monospace; font-size: 12px;">${escapeHtml(ip || 'Unknown')}</td>
      </tr>
    </table>

    <div style="background-color: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #885FFF; font-weight: 700; font-family: monospace;">
        Project Vision & Brief
      </p>
      <div style="font-size: 14px; line-height: 1.6; color: #E2E8F0;">
        ${safeMessage}
      </div>
    </div>

    <div style="text-align: left;">
      <a href="mailto:${safeEmail}?subject=Re: Your Project Inquiry with D'Creativs Studio" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #4100F5 0%, #885FFF 100%); color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 9999px;">
        Reply Directly to ${safeName}
      </a>
    </div>

  </div>
</body>
</html>`;
}

/**
 * Sends an email via Resend API (HTTP fetch, no heavy dependencies)
 */
async function sendViaResend({ apiKey, from, to, subject, html, reply_to }) {
  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  };

  if (reply_to) {
    payload.reply_to = reply_to;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Resend error: HTTP ${response.status}`);
  }
  return data;
}

/**
 * Main Request Handler
 */
export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const {
      name,
      company,
      selectedServices,
      budget,
      timeline,
      message,
      email,
      phone,
      website_trap, // Honeypot
    } = body;

    // Honeypot spam trap check: silently acknowledge if a bot filled the hidden input
    if (website_trap) {
      return res.status(200).json({ success: true, message: 'Transmitted successfully' });
    }

    // IP Rate Limiting
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'local';
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        error: 'Too many submissions from this connection. Please wait 10 minutes before submitting again.',
      });
    }

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Please enter your name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid work email address.' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Please provide a brief description of your project.' });
    }

    const services = Array.isArray(selectedServices) && selectedServices.length > 0
      ? selectedServices
      : ['General Inquiry'];

    const inquiryData = {
      name: name.trim(),
      company: (company || '').trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      services,
      budget: budget || 'Not specified',
      timeline: timeline || 'Flexible',
      message: message.trim(),
      ip: clientIp,
    };

    const clientHtml = buildClientConfirmationHtml(inquiryData);
    const studioHtml = buildStudioNotificationHtml(inquiryData);

    const resendApiKey = process.env.RESEND_API_KEY;
    const studioEmail = process.env.STUDIO_INBOX_EMAIL || 'dcreativs.studio@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || "D'Creativs Studio <onboarding@resend.dev>";

    if (resendApiKey) {
      // Live Email Dispatch via Resend
      await Promise.all([
        // 1. Send Internal Studio Notification
        sendViaResend({
          apiKey: resendApiKey,
          from: fromEmail,
          to: studioEmail,
          subject: `New Project Inquiry: ${inquiryData.name} (${inquiryData.company || 'Independent'})`,
          html: studioHtml,
          reply_to: inquiryData.email,
        }),
        // 2. Send Client Confirmation Email
        sendViaResend({
          apiKey: resendApiKey,
          from: fromEmail,
          to: inquiryData.email,
          subject: "Brief Transmitted — D'Creativs Studio",
          html: clientHtml,
          reply_to: studioEmail,
        }),
      ]);

      return res.status(200).json({
        success: true,
        message: 'Project brief securely transmitted. Confirmation email dispatched.',
      });
    } else {
      // Dev / Simulated Mode when RESEND_API_KEY is not yet added in .env
      console.log('--- [CONTACT FORM INQUIRY RECEIVED (SIMULATED DEV MODE)] ---');
      console.log('Client:', inquiryData.name, `<${inquiryData.email}>`);
      console.log('Company:', inquiryData.company);
      console.log('Disciplines:', inquiryData.services.join(', '));
      console.log('Budget:', inquiryData.budget);
      console.log('Timeline:', inquiryData.timeline);
      console.log('Brief:', inquiryData.message);
      console.log('-> To send live emails, set RESEND_API_KEY in your environment.');
      console.log('-----------------------------------------------------------');

      return res.status(200).json({
        success: true,
        mode: 'dev_simulated',
        message: 'Brief transmitted successfully (dev simulation: emails logged to console).',
      });
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred while transmitting your brief. Please try again.',
    });
  }
}
