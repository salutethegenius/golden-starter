import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How KemisDigital collects, uses, and protects information shared with us through kemisdigital.com and our strategy session forms.",
};

export default function PrivacyPage() {
  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "120px 24px 80px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#0f172a",
      }}
    >
      <p
        style={{
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontWeight: 600,
          color: "#6b7280",
          marginBottom: "8px",
        }}
      >
        KemisDigital
      </p>
      <h1
        style={{
          fontSize: "32px",
          lineHeight: 1.1,
          fontWeight: 800,
          marginBottom: "8px",
        }}
      >
        Privacy Policy
      </h1>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "32px" }}>
        Last updated: March 2026
      </p>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Who we are</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
          KemisDigital (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) designs and builds software platforms for
          Bahamian businesses. This privacy policy explains how we handle information collected through
          <strong> kemisdigital.com</strong> and any forms you submit to book a strategy session.
        </p>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Information we collect</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "8px" }}>
          When you use our site or book a strategy session, we may collect:
        </p>
        <ul style={{ fontSize: "14px", lineHeight: 1.7, paddingLeft: "18px", marginBottom: "8px" }}>
          <li>
            <strong>Contact details</strong> – name, email address, phone number, company name, and your role.
          </li>
          <li>
            <strong>Business context</strong> – industry, team size, current tools, pain points, goals, and project
            requirements you share in the form.
          </li>
          <li>
            <strong>Technical information</strong> – source URL and browser user agent, which we store alongside your
            submission to help us understand how our site is used and to troubleshoot issues.
          </li>
        </ul>
        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
          We do not intentionally collect sensitive personal information (such as ID numbers or payment card details)
          through this site. Please do not include this type of information in free-text fields.
        </p>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>How we use your information</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "8px" }}>
          We use the information we collect to:
        </p>
        <ul style={{ fontSize: "14px", lineHeight: 1.7, paddingLeft: "18px" }}>
          <li>Review your project and prepare for a strategy session.</li>
          <li>Follow up on your enquiry by email or phone.</li>
          <li>Plan and improve our services and internal processes.</li>
          <li>Keep basic records for operational, security, and legal purposes.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Where your data is stored</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
          Strategy session submissions are stored securely in our Supabase project and may be mirrored in our internal
          project management and email tools. These providers process data on our behalf and are bound by their own
          security and privacy commitments.
        </p>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>How long we keep information</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
          We keep submission data for as long as it is useful for evaluating projects, maintaining client
          relationships, and meeting our legal or regulatory obligations. If you would like us to remove your
          information from our records, you can contact us at{" "}
          <a href="mailto:frontdesk@kemisdigital.com">frontdesk@kemisdigital.com</a>.
        </p>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Sharing your information</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
          We do not sell your personal information. We may share it with:
        </p>
        <ul style={{ fontSize: "14px", lineHeight: 1.7, paddingLeft: "18px" }}>
          <li>
            <strong>Service providers</strong> who host our infrastructure, email, and analytics, strictly for the
            purpose of providing their services to us.
          </li>
          <li>
            <strong>Professional advisors or authorities</strong> if required to comply with law, enforce our
            agreements, or protect our rights.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Cookies and analytics</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
          Our site may use basic analytics and logging to understand how visitors use kemisdigital.com and to keep the
          platform secure. Any cookies or similar technologies are used only to support site functionality and
          performance, not for third-party advertising.
        </p>
      </section>

      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Your choices</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "8px" }}>
          You can request that we:
        </p>
        <ul style={{ fontSize: "14px", lineHeight: 1.7, paddingLeft: "18px" }}>
          <li>Provide a copy of the information you have shared with us.</li>
          <li>Correct information that is inaccurate or outdated.</li>
          <li>Delete information we no longer need for the purposes described above.</li>
        </ul>
        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
          To make a request, email{" "}
          <a href="mailto:frontdesk@kemisdigital.com">frontdesk@kemisdigital.com</a> and we will respond as soon as we
          reasonably can.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Contact</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
          If you have any questions about this policy or how we handle your information, please contact:
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
          KemisDigital<br />
          Nassau, The Bahamas<br />
          <a href="mailto:frontdesk@kemisdigital.com">frontdesk@kemisdigital.com</a>
        </p>
      </section>
    </main>
  );
}

