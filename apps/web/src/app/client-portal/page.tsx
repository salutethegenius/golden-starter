"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientPortalMarketing() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("nav");
      if (nav) nav.classList.toggle("solid", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --g: #1A6FD4;
          --gb: #1580EE;
          --gd: #145DB3;
          --cyan: #00C2D4;
          --navy: #162B52;
          --frost: #B8CDD8;
          --bk: #ffffff;
          --cr: #162B52;
          --d1: #f5f8fa;
          --d2: #edf2f6;
        }
        html { scroll-behavior: smooth; font-size: 16px; }
        body {
          font-family: "Barlow Condensed", sans-serif;
          background: var(--bk);
          color: var(--cr);
          overflow-x: hidden;
        }
        ::selection { background: var(--g); color: #fff; }
        a { color: inherit; text-decoration: none; }

        /* NAV */
        #nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 64px;
          transition: all 0.35s;
        }
        #nav.solid {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(22,43,82,0.1);
          box-shadow: 0 1px 8px rgba(22,43,82,0.06);
        }
        .nav-links {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .nav-links a:not(.btn-p) {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(22,43,82,0.55);
          transition: color 0.2s;
        }
        .nav-links a:not(.btn-p):hover { color: var(--g); }
        .wordmark {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wm-text .wm-a {
          font-family: "Bebas Neue", sans-serif;
          font-size: 20px;
          letter-spacing: 0.06em;
          line-height: 1;
        }
        .wm-text .wm-b {
          font-size: 9px;
          letter-spacing: 0.44em;
          color: var(--g);
          font-weight: 700;
          margin-top: -2px;
          text-transform: uppercase;
        }
        .nav-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px; height: 44px;
          padding: 0; border: none;
          background: transparent;
          cursor: pointer;
          color: var(--navy);
        }
        .nav-toggle-icon {
          position: relative;
          width: 22px; height: 16px;
        }
        .nav-toggle-icon span {
          display: block;
          position: absolute;
          left: 0; width: 100%; height: 2px;
          background: currentColor;
          border-radius: 1px;
          transition: transform 0.25s ease, opacity 0.2s ease;
        }
        .nav-toggle-icon span:nth-child(1) { top: 0; }
        .nav-toggle-icon span:nth-child(2) { top: 50%; transform: translateY(-50%); }
        .nav-toggle-icon span:nth-child(3) { bottom: 0; }
        .nav-toggle[aria-expanded="true"] .nav-toggle-icon span:nth-child(1) {
          top: 50%; transform: translateY(-50%) rotate(45deg);
        }
        .nav-toggle[aria-expanded="true"] .nav-toggle-icon span:nth-child(2) { opacity: 0; }
        .nav-toggle[aria-expanded="true"] .nav-toggle-icon span:nth-child(3) {
          bottom: 50%; transform: translateY(50%) rotate(-45deg);
        }
        .nav-mobile {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 199;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(12px);
          padding: 88px 24px 32px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease, visibility 0.25s ease;
        }
        .nav-mobile.open { opacity: 1; visibility: visible; }
        .nav-mobile a {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--navy);
          padding: 14px 20px;
          transition: color 0.2s;
        }
        .nav-mobile a:hover { color: var(--g); }
        .nav-mobile .btn-p { margin-top: 16px; padding: 14px 32px; }

        /* BUTTONS */
        .btn-p {
          background: var(--g);
          color: #ffffff;
          border: none;
          padding: 14px 36px;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-p:hover { background: var(--gb); transform: translateY(-2px); }
        .btn-g {
          background: transparent;
          color: var(--cr);
          border: 1px solid rgba(22,43,82,0.25);
          padding: 14px 36px;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-g:hover { border-color: var(--g); background: rgba(26,111,212,0.06); }
        .btn-p.sm { padding: 10px 24px; }

        /* PAGE */
        .cp-hero {
          padding: 140px 60px 80px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .cp-tag {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 20px;
        }
        .cp-hero-h {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(48px, 6vw, 80px);
          line-height: 0.92;
          max-width: 800px;
          margin-bottom: 28px;
        }
        .cp-hero-sub {
          font-size: 20px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(22,43,82,0.55);
          max-width: 620px;
          margin-bottom: 36px;
        }
        .cp-hero-sub b {
          font-weight: 600;
          color: var(--cr);
        }
        .cp-hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
        }
        .cp-hero-note {
          font-size: 14px;
          color: rgba(22,43,82,0.5);
        }
        .cp-hero-note b {
          font-weight: 600;
          color: var(--g);
        }

        /* HERO IMAGE */
        .cp-hero-img-wrap {
          margin-top: 60px;
          position: relative;
        }
        .cp-hero-img-wrap::before {
          content: "";
          position: absolute;
          inset: -20px;
          z-index: -1;
          background: radial-gradient(ellipse at center, rgba(0,194,212,0.08) 0%, transparent 70%);
          border-radius: 32px;
        }
        .cp-hero-img-wrap img {
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgba(184,205,216,0.5);
          box-shadow: 0 30px 80px rgba(22,43,82,0.16), 0 8px 24px rgba(22,43,82,0.08);
        }

        /* STORY SECTIONS */
        .cp-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 60px;
        }
        .cp-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .cp-row.flip .cp-text { order: 2; }
        .cp-row.flip .cp-img { order: 1; }
        .cp-step {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 16px;
        }
        .cp-h2 {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(36px, 4vw, 52px);
          line-height: 0.94;
          margin-bottom: 24px;
        }
        .cp-body {
          font-size: 18px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(22,43,82,0.6);
          margin-bottom: 16px;
        }
        .cp-bold {
          font-size: 18px;
          font-weight: 600;
          color: var(--cr);
          line-height: 1.6;
        }
        .cp-list {
          list-style: none;
          padding: 0;
          margin: 16px 0 0;
        }
        .cp-list li {
          font-size: 15px;
          font-weight: 400;
          color: rgba(22,43,82,0.6);
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
        }
        .cp-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 13px;
          width: 8px;
          height: 8px;
          border: 1.5px solid var(--g);
          transform: rotate(45deg);
        }
        .cp-img img {
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgba(184,205,216,0.5);
          box-shadow: 0 24px 70px rgba(22,43,82,0.14), 0 6px 20px rgba(22,43,82,0.06);
        }
        .cp-divider {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 60px;
        }
        .cp-divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--frost), transparent);
        }

        /* CTA BANNER */
        .cp-cta {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 60px;
        }
        .cp-cta-box {
          background: var(--d1);
          border: 1px solid var(--frost);
          padding: 64px;
          text-align: center;
        }
        .cp-cta-box .cp-tag { margin-bottom: 14px; }
        .cp-cta-h {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(36px, 4vw, 56px);
          line-height: 0.94;
          max-width: 700px;
          margin: 0 auto 20px;
        }
        .cp-cta-sub {
          font-size: 17px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(22,43,82,0.55);
          max-width: 580px;
          margin: 0 auto 32px;
        }
        .cp-cta-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* FOOTER */
        footer {
          background: var(--d2);
          border-top: 1px solid var(--frost);
          padding: 36px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-copy {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(22,43,82,0.35);
        }
        .footer-credit {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: rgba(22,43,82,0.45);
        }
        .footer-credit a { color: var(--g); transition: opacity 0.2s; }
        .footer-credit a:hover { opacity: 0.7; }

        /* REVEAL */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal.d1 { transition-delay: 0.15s; }
        .reveal.d2 { transition-delay: 0.3s; }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .cp-row { grid-template-columns: 1fr; gap: 40px; }
          .cp-row.flip .cp-text { order: 1; }
          .cp-row.flip .cp-img { order: 2; }
        }
        @media (max-width: 768px) {
          #nav { padding: 0 20px; }
          .nav-links { display: none; }
          .nav-toggle { display: flex; }
          .nav-mobile { display: flex; }
          .cp-hero { padding: 120px 20px 60px; }
          .cp-hero-h { font-size: 48px; }
          .cp-hero-sub { font-size: 17px; }
          .cp-section { padding: 60px 20px; }
          .cp-cta { padding: 60px 20px; }
          .cp-cta-box { padding: 40px 24px; }
          .cp-divider { padding: 0 20px; }
          .cp-hero-ctas { flex-direction: column; align-items: flex-start; }
          footer {
            flex-direction: column;
            gap: 16px;
            padding: 24px;
            text-align: center;
          }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* NAV */}
      <nav id="nav">
        <Link href="/" className="wordmark">
          <svg className="logo-svg" width="34" height="34" viewBox="0 0 72 72" fill="none">
            <path d="M36 4L68 36L36 68L4 36Z" stroke="#162B52" strokeWidth="2.2" fill="none" />
            <rect x="19" y="22" width="8" height="28" fill="#162B52" />
            <rect x="32" y="18" width="8" height="36" fill="#162B52" />
            <rect x="45" y="22" width="8" height="28" fill="#162B52" />
            <line x1="19" y1="50" x2="53" y2="50" stroke="#162B52" strokeWidth="2" />
          </svg>
          <div className="wm-text">
            <div className="wm-a">AMT</div>
            <div className="wm-b">Imports</div>
          </div>
        </Link>
        <div className="nav-links">
          <Link href="/#services">Services</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/login" className="btn-p sm">Client Login</Link>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-toggle-icon" aria-hidden>
            <span /><span /><span />
          </span>
        </button>
      </nav>
      <div className={`nav-mobile ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <Link href="/#services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link href="/#pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
        <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link href="/login" className="btn-p" onClick={() => setMenuOpen(false)}>Client Login</Link>
      </div>

      {/* HERO */}
      <div className="cp-hero">
        <div className="cp-tag">AMT Client Portal</div>
        <h1 className="cp-hero-h">
          Your shipments, invoices,
          <br />
          and deliveries in one
          <br />
          <span style={{ color: "var(--g)" }}>clear view.</span>
        </h1>
        <p className="cp-hero-sub">
          The AMT online account is your always-on control center. Track every package from{" "}
          <b>Ft. Lauderdale</b> to <b>Nassau</b>, see what&apos;s owed, and schedule delivery
          — without calling in.
        </p>
        <div className="cp-hero-ctas">
          <Link href="/login" className="btn-p">Log In To Your Portal</Link>
          <p className="cp-hero-note">
            No account yet? <b>Contact us and we&apos;ll set you up.</b>
          </p>
        </div>
        <div className="cp-hero-img-wrap reveal">
          <img src="/portal-dashboard.png" alt="AMT client portal dashboard overview" />
        </div>
      </div>

      {/* STEP 1 */}
      <div className="cp-divider"><div className="cp-divider-line"></div></div>
      <div className="cp-section">
        <div className="cp-row flip">
          <div className="cp-text reveal">
            <div className="cp-step">Step 1</div>
            <h2 className="cp-h2">
              We create your
              <br />
              secure online account.
            </h2>
            <p className="cp-body">
              AMT is invitation-only. Our team sets up your profile, links your customer record,
              and sends a secure email invite. You choose your password and you&apos;re in — no
              forms, no complicated signup flows.
            </p>
            <ul className="cp-list">
              <li>Your data stays private to your account.</li>
              <li>Admin-approved access only.</li>
              <li>Works on desktop, tablet, and mobile.</li>
            </ul>
          </div>
          <div className="cp-img reveal d1">
            <img src="/portal-orders.png" alt="AMT orders view" />
          </div>
        </div>
      </div>

      {/* STEP 2 */}
      <div className="cp-divider"><div className="cp-divider-line"></div></div>
      <div className="cp-section">
        <div className="cp-row">
          <div className="cp-img reveal">
            <img src="/portal-dashboard.png" alt="AMT dashboard overview" />
          </div>
          <div className="cp-text reveal d1">
            <div className="cp-step">Step 2</div>
            <h2 className="cp-h2">
              See every shipment
              <br />
              at a glance.
            </h2>
            <p className="cp-body">
              Your dashboard pulls everything into one simple view: active orders, total
              shipments, recent invoices, and what&apos;s currently owed. No digging through
              WhatsApp threads or emails.
            </p>
            <p className="cp-bold">
              One login. One dashboard. Real status, updated by the same people
              moving your freight.
            </p>
          </div>
        </div>
      </div>

      {/* STEP 3 */}
      <div className="cp-divider"><div className="cp-divider-line"></div></div>
      <div className="cp-section">
        <div className="cp-row flip">
          <div className="cp-text reveal">
            <div className="cp-step">Step 3</div>
            <h2 className="cp-h2">
              Track each package
              <br />
              from dock to doorstep.
            </h2>
            <p className="cp-body">
              Every order gets a clear status timeline so you always know where it is —
              Processing, Ready for Pickup, Out for Delivery, Completed. No guessing, no
              chasing updates.
            </p>
            <p className="cp-bold">
              View your orders on the go — anytime, anywhere.
            </p>
          </div>
          <div className="cp-img reveal d1">
            <img src="/portal-order-detail.png" alt="Order tracking timeline" />
          </div>
        </div>
      </div>

      {/* STEP 4 */}
      <div className="cp-divider"><div className="cp-divider-line"></div></div>
      <div className="cp-section">
        <div className="cp-row">
          <div className="cp-img reveal">
            <img src="/portal-invoice-detail.png" alt="Invoice detail with pay button" />
          </div>
          <div className="cp-text reveal d1">
            <div className="cp-step">Step 4</div>
            <h2 className="cp-h2">
              See what&apos;s owed.
              <br />
              Pay online. Stay current.
            </h2>
            <p className="cp-body">
              The invoices tab shows every bill in one place — what&apos;s open, what&apos;s
              paid, and what&apos;s due soon. Open any invoice to see the full breakdown and
              pay securely online.
            </p>
            <p className="cp-bold">
              No more hunting for PDFs. No more &ldquo;did that one get paid?&rdquo; texts.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cp-cta">
        <div className="cp-cta-box">
          <div className="cp-tag">Ready for real visibility?</div>
          <h2 className="cp-cta-h">
            Your packages deserve a real home
            <br />
            <span style={{ color: "var(--g)" }}>— and so does your tracking.</span>
          </h2>
          <p className="cp-cta-sub">
            Open an account with AMT and we&apos;ll switch on your online portal. From that
            moment on, every shipment, every invoice, and every delivery lives in one place
            you can trust.
          </p>
          <div className="cp-cta-btns">
            <Link href="/login" className="btn-p">Log In To Your Portal</Link>
            <Link href="/#contact" className="btn-g">Talk To The AMT Team</Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="wordmark">
          <svg className="logo-svg" width="26" height="26" viewBox="0 0 72 72" fill="none">
            <path d="M36 4L68 36L36 68L4 36Z" stroke="#162B52" strokeWidth="2.2" fill="none" />
            <rect x="19" y="22" width="8" height="28" fill="#162B52" />
            <rect x="32" y="18" width="8" height="36" fill="#162B52" />
            <rect x="45" y="22" width="8" height="28" fill="#162B52" />
            <line x1="19" y1="50" x2="53" y2="50" stroke="#162B52" strokeWidth="2" />
          </svg>
          <div className="wm-text" style={{ marginLeft: "10px" }}>
            <div className="wm-a" style={{ fontSize: "17px" }}>AMT Imports</div>
          </div>
        </div>
        <div className="footer-copy">© 2026 AMT Imports · Nassau, Bahamas</div>
        <div className="footer-credit">
          Site developed by{" "}
          <a href="https://kemisdigital.com" target="_blank" rel="noopener noreferrer">
            KemisDigital
          </a>{" "}
          for Three Great Brothers
        </div>
      </footer>
    </>
  );
}
