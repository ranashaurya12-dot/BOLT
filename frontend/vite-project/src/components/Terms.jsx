import { useState } from "react";

export default function TermsAndConditions() {
  const [expanded, setExpanded] = useState(null);

  const sections = [
    {
      id: 1,
      title: "Eligibility",
      content:
        "You must be at least 18 years of age or use this website under the supervision of a parent or legal guardian. By placing an order, you represent that the information provided is accurate and complete.",
    },
    {
      id: 2,
      title: "Products",
      content:
        "Bolt Fuel offers sports nutrition products including, but not limited to, whey protein, creatine, pre-workout supplements, mass gainers, BCAA/EAA, vitamins, protein bars, and fitness accessories. Product descriptions, images, nutritional information, and pricing are provided for informational purposes and may be updated without prior notice.",
    },
    {
      id: 3,
      title: "Supplement & Medical Disclaimer",
      content:
        "Our products are dietary supplements and are not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary depending on age, diet, lifestyle, exercise routine, and other personal factors. Customers who are pregnant, nursing, under 18 years of age, taking medication, or have any existing medical condition should consult a qualified healthcare professional before using any supplement. Products should be consumed strictly according to the recommended serving size and usage instructions.",
    },
    {
      id: 4,
      title: "Orders & Payments",
      content:
        "All orders are subject to acceptance and product availability. We reserve the right to refuse, limit, or cancel any order at our sole discretion, including orders suspected of fraud or unauthorized activity. Prices displayed on the website are subject to change without prior notice. Payments must be completed through the payment methods made available on our website.",
    },
    {
      id: 5,
      title: "Shipping & Delivery",
      content:
        "We aim to process and dispatch orders promptly. Delivery timelines are estimates only and may vary depending on courier services, weather conditions, holidays, or other circumstances beyond our control. Bolt Fuel shall not be liable for delays caused by third-party logistics providers.",
    },
    {
      id: 6,
      title: "Returns & Refunds",
      content:
        "Returns, replacements, or refunds will only be accepted in accordance with our Refund & Return Policy. Products that have been opened, used, damaged by the customer, or returned without their original packaging may not be eligible for return unless required by applicable law. Customers receiving damaged, defective, or incorrect products must notify us within the specified period after delivery along with supporting photographs.",
    },
    {
      id: 7,
      title: "Intellectual Property",
      content:
        "All content on this website, including logos, product names, graphics, text, images, videos, designs, trademarks, and other materials, is the exclusive property of Bolt Fuel or its licensors and is protected under applicable intellectual property laws. No content may be copied, reproduced, modified, distributed, or used without our prior written permission.",
    },
    {
      id: 8,
      title: "User Conduct",
      content:
        "You agree not to misuse the website, interfere with its operation, attempt unauthorized access, upload malicious software, provide false information, or engage in any activity that violates applicable laws or infringes the rights of others.",
    },
    {
      id: 9,
      title: "Limitation of Liability",
      content:
        "To the maximum extent permitted by law, Bolt Fuel shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of our website or products. Our total liability, if any, shall not exceed the amount paid by the customer for the relevant order.",
    },
    {
      id: 10,
      title: "Product Information",
      content:
        "Product images are provided for illustration purposes only and actual packaging may differ. Nutritional values, ingredients, flavors, formulations, and packaging may change from time to time without prior notice as part of product improvements or regulatory requirements.",
    },
    {
      id: 11,
      title: "Privacy",
      content:
        "Your use of this website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.",
    },
    {
      id: 12,
      title: "Governing Law & Dispute Resolution",
      content:
        "These Terms shall be governed by and interpreted in accordance with the laws of India. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts located in [City, State], India.",
    },
    {
      id: 13,
      title: "Changes to Terms",
      content:
        "Bolt Fuel reserves the right to update or modify these Terms at any time. Revised Terms shall become effective immediately upon publication on this website. Continued use of the website after such updates constitutes your acceptance of the revised Terms.",
    },
    {
      id: 14,
      title: "Contact Us",
      content:
        "For any questions regarding these Terms & Conditions, please contact us:\n\nBolt Fuel\nAddress: [Company Address]\nEmail: [Email Address]\nPhone: [Phone Number]\nGST Number: [GST Number]",
    },
  ];

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        .section-item { border-bottom: 1px solid rgba(255,255,255,0.07); }
        .section-item:last-child { border-bottom: none; }
        .toggle-btn:hover { background: rgba(255,255,255,0.04) !important; }
        .content-text { white-space: pre-line; }
      `}</style>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroBadge}>Legal</div>
        <h1 style={styles.heroTitle}>Terms & Conditions</h1>
        <p style={styles.heroSub}>Effective Date: [Effective Date]</p>
        <p style={styles.heroDesc}>
          Welcome to <span style={{ color: "#f59e0b" }}>Bolt Fuel</span>. By accessing our website or purchasing
          any product, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
        </p>
      </div>

      {/* Sections */}
      <div style={styles.container}>
        <div style={styles.card}>
          {sections.map((s) => (
            <div key={s.id} className="section-item">
              <button
                className="toggle-btn"
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
                  <p className="content-text" style={styles.contentText}>{s.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
       
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
  card: {
    background: "#111",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12,
    overflow: "hidden",
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
  footerNote: {
    marginTop: 32,
    fontSize: 13,
    color: "rgba(255,255,255,0.3)",
    lineHeight: 1.7,
    textAlign: "center",
    fontWeight: 300,
  },
};