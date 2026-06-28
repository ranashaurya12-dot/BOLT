import { useState } from "react";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";

export default function PrivacyPolicy() {
  const [expanded, setExpanded] = useState(null);

  const sections = [
    {
      id: 1,
      title: "Information We Collect",
      content:
        "We may collect personal information including your name, email address, phone number, billing and shipping address, account credentials, order history, and any information you voluntarily provide while contacting customer support. We may also collect technical information such as your IP address, browser type, device information, and website usage data.",
    },
    {
      id: 2,
      title: "How We Use Your Information",
      content:
        "Your information is collected solely for legitimate business purposes, including:\n\n• Processing and delivering your orders.\n• Providing customer support.\n• Managing your account.\n• Improving our website, products, and services.\n• Sending order confirmations and service-related communications.\n• Sending promotional offers where you have provided your consent.\n• Complying with applicable legal and regulatory obligations.",
    },
    {
      id: 3,
      title: "Cookies & Similar Technologies",
      content:
        "Our website may use cookies and similar technologies to enhance your browsing experience, remember your preferences, analyze website traffic, and improve website performance. You may disable cookies through your browser settings; however, certain website features may not function properly.",
    },
    {
      id: 4,
      title: "Payment Information",
      content:
        "Payments are securely processed through trusted third-party payment gateways. Bolt Fuel does not store your complete debit card, credit card, or banking information unless required by applicable law. All payment transactions are handled using industry-standard security measures implemented by our payment partners.",
    },
    {
      id: 5,
      title: "Shipping & Delivery Information",
      content:
        "To fulfill your orders, we may share necessary delivery details such as your name, address, phone number, and order information with our authorized courier and logistics partners. Such information is used exclusively for order fulfillment and customer support.",
    },
    {
      id: 6,
      title: "Marketing Communications",
      content:
        "If you choose to receive promotional communications, we may send you updates regarding new products, offers, or other marketing materials. You may unsubscribe from marketing emails or messages at any time by following the unsubscribe instructions or contacting us directly.",
    },
    {
      id: 7,
      title: "Sharing of Information",
      content:
        "Bolt Fuel does not sell, rent, or trade your personal information to third parties.\n\nWe may share your information only with:\n\n• Trusted payment service providers.\n• Courier and logistics partners.\n• Website hosting and analytics providers.\n• Customer support service providers.\n• Government authorities or regulatory bodies where required by applicable law.\n\nAll third-party service providers are expected to maintain appropriate confidentiality and security standards.",
    },
    {
      id: 8,
      title: "Data Security",
      content:
        "We implement reasonable technical, administrative, and organizational measures to safeguard your personal information against unauthorized access, misuse, alteration, disclosure, or destruction. While we strive to protect your information, no method of electronic transmission or storage can be guaranteed to be completely secure.",
    },
    {
      id: 9,
      title: "Data Retention",
      content:
        "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Once the information is no longer required, it will be securely deleted or anonymized where reasonably practicable.",
    },
    {
      id: 10,
      title: "Your Rights",
      content:
        "Subject to applicable law, you may request access to, correction of, or deletion of your personal information. You may also withdraw consent for certain processing activities where permitted by law. Requests may be submitted using the contact information provided below, and we will respond within a reasonable period.",
    },
    {
      id: 11,
      title: "Children's Privacy",
      content:
        "Our website and products are not intended for individuals under the age of 18 years without the supervision or consent of a parent or legal guardian. We do not knowingly collect personal information from children.",
    },
    {
      id: 12,
      title: "Third-Party Websites",
      content:
        "Our website may contain links to third-party websites for your convenience. Bolt Fuel is not responsible for the privacy practices, content, or policies of those websites. Users are encouraged to review the privacy policies of any third-party websites they visit.",
    },
    {
      id: 13,
      title: "International Data Transfers",
      content:
        "Where applicable, your information may be processed or stored using secure systems located outside India by trusted service providers. We take reasonable measures to ensure that such transfers comply with applicable data protection laws and maintain an appropriate level of security.",
    },
    {
      id: 14,
      title: "Changes to This Privacy Policy",
      content:
        "We reserve the right to modify or update this Privacy Policy at any time. Any changes will become effective immediately upon publication on our website unless otherwise stated. We encourage users to review this Privacy Policy periodically to remain informed about how their information is protected.",
    },
    {
      id: 15,
      title: "Contact Information",
      content:
        "If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:\n\nBolt Fuel\nAddress: E-53, Block E, Sector 14, Rohini, Delhi, 110085, India\nEmail: Boltfuelindia@gmail.com\nPhone: 8447445621",
    },
  ];

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div style={styles.page}>
      <style>{`
        .pp-item { border-bottom: 1px solid rgba(255,255,255,0.07); }
        .pp-item:last-child { border-bottom: none; }
        .pp-btn:hover { background: rgba(255,255,255,0.04) !important; }
        .pp-text { white-space: pre-line; }
      `}</style>

      <div style={styles.hero}>
        <div style={styles.heroBadge}>Legal</div>
        <h1 style={styles.heroTitle}>Privacy Policy</h1>
        <p style={styles.heroSub}>Last Updated: 2025</p>
        <p style={styles.heroDesc}>
          At <span style={{ color: "#f59e0b" }}>Bolt Fuel</span>, we value your privacy and are committed to
          protecting your personal information. This policy explains how we collect, use, and protect your data.
        </p>
      </div>

      <div style={styles.container}>
        <div style={styles.introBox}>
          <span style={styles.shieldIcon}>🔒</span>
          <p style={styles.introText}>
            By using our website, you consent to the practices described in this Privacy Policy.
            We do not sell, rent, or trade your personal information to third parties.
          </p>
        </div>

        <div style={styles.card}>
          {sections.map((s) => (
            <div key={s.id} className="pp-item">
              <button
                className="pp-btn"
                onClick={() => toggle(s.id)}
                style={{
                  ...styles.toggleBtn,
                  background: expanded === s.id ? "rgba(245,158,11,0.06)" : "transparent",
                }}
              >
                <div style={styles.toggleLeft}>
                  <span style={{ ...styles.num, color: expanded === s.id ? "#f59e0b" : "rgba(255,255,255,0.2)" }}>
                    {String(s.id).padStart(2, "0")}
                  </span>
                  <span style={{ ...styles.sectionTitle, color: expanded === s.id ? "#fff" : "rgba(255,255,255,0.75)" }}>
                    {s.title}
                  </span>
                </div>
                <span style={{ ...styles.chevron, transform: expanded === s.id ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {expanded === s.id && (
                <div style={styles.contentBox}>
                  <p className="pp-text" style={styles.contentText}>{s.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={styles.contactCard}>
          <h3 style={styles.contactTitle}>Have Questions?</h3>
          <p style={styles.contactSub}>Reach out to us directly regarding your privacy concerns.</p>
          <div style={styles.contactGrid}>
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Email</span>
              <a href="mailto:Boltfuelindia@gmail.com" style={styles.contactValue}>Boltfuelindia@gmail.com</a>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Phone</span>
              <a href="tel:8447445621" style={styles.contactValue}>8447445621</a>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Address</span>
              <span style={styles.contactValue}>E-53, Block E, Sector 14, Rohini, Delhi, 110085, India</span>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    fontFamily: "'Inter', sans-serif",
    color: "#fff",
  },
  hero: {
    background: "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
    borderBottom: "1px solid rgba(245,158,11,0.15)",
    padding: "72px 24px 56px",
    textAlign: "center",
  },
  heroBadge: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#f59e0b",
    border: "1px solid rgba(245,158,11,0.4)",
    borderRadius: 3,
    padding: "4px 14px",
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(32px, 6vw, 56px)",
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 12px",
    lineHeight: 1.1,
  },
  heroSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.35)",
    margin: "0 0 20px",
    letterSpacing: "0.05em",
  },
  heroDesc: {
    fontSize: 15,
    color: "rgba(255,255,255,0.55)",
    maxWidth: 560,
    margin: "0 auto",
    lineHeight: 1.7,
    fontWeight: 300,
  },
  container: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  introBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    background: "rgba(245,158,11,0.06)",
    border: "1px solid rgba(245,158,11,0.2)",
    borderRadius: 10,
    padding: "18px 20px",
    marginBottom: 32,
  },
  shieldIcon: {
    fontSize: 20,
    flexShrink: 0,
    marginTop: 1,
  },
  introText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.7,
    fontWeight: 300,
    margin: 0,
  },
  card: {
    background: "#111",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 32,
  },
  toggleBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 24px",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.2s ease",
  },
  toggleLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  num: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.1em",
    minWidth: 24,
    transition: "color 0.2s ease",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 500,
    transition: "color 0.2s ease",
  },
  chevron: {
    color: "rgba(255,255,255,0.3)",
    transition: "transform 0.3s ease",
    flexShrink: 0,
  },
  contentBox: {
    padding: "0 24px 20px 64px",
  },
  contentText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.8,
    fontWeight: 300,
    margin: 0,
  },
  contactCard: {
    background: "#111",
    border: "1px solid rgba(245,158,11,0.2)",
    borderRadius: 12,
    padding: "28px 24px",
    marginBottom: 32,
  },
  contactTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 6px",
  },
  contactSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    margin: "0 0 20px",
    fontWeight: 300,
  },
  contactGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  contactItem: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  contactLabel: {
    fontSize: 11,
    color: "#f59e0b",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  contactValue: {
    fontSize: 14,
    color: "rgba(255,255,255,0.65)",
    fontWeight: 300,
    textDecoration: "none",
  },
  footerNote: {
    fontSize: 13,
    color: "rgba(255,255,255,0.3)",
    lineHeight: 1.7,
    textAlign: "center",
    fontWeight: 300,
    margin: 0,
  },
};