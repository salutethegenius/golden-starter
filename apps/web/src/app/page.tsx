"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Marquee setup
    const items = [
      "Two Sailings Per Week",
      "Priority Handling",
      "Pickup & Delivery",
      "Affordable Rates",
      "Nassau Based",
      "Air Freight",
      "Client Portal 2026",
      "Trusted Courier",
    ];
    if (mqRef.current) {
      let html = "";
      for (let r = 0; r < 2; r++) {
        items.forEach((t) => {
          html += `<span class="mq-item">${t}<span class="mq-dot"></span></span>`;
        });
      }
      mqRef.current.innerHTML = html;
    }

    // Nav scroll
    const handleScroll = () => {
      const nav = document.getElementById("nav");
      if (nav) {
        nav.classList.toggle("solid", window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection Observer reveals
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Three.js hero
    let animationId: number;
    const initThree = async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const W = window.innerWidth;
      const H = window.innerHeight;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(65, W / H, 0.1, 500);
      cam.position.z = 38;

      const N = 650;
      const buf = new Float32Array(N * 3);
      for (let i = 0; i < N * 3; i++) buf[i] = (Math.random() - 0.5) * 120;

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(buf, 3));

      const mat = new THREE.PointsMaterial({
        color: 0xc8983a,
        size: 0.24,
        transparent: true,
        opacity: 0.45,
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);

      let t = 0;
      function tick() {
        animationId = requestAnimationFrame(tick);
        t += 0.0007;
        pts.rotation.y = t * 0.5;
        pts.rotation.x = Math.sin(t * 0.25) * 0.12;
        renderer.render(scene, cam);
      }
      tick();

      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
      };
    };

    const cleanup = initThree();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      io.disconnect();
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        :root {
          --g: #c8983a;
          --gb: #e4b050;
          --gd: #9a7828;
          --bk: #0a0a0a;
          --cr: #f0ebe0;
          --d1: #111111;
          --d2: #0d0d0d;
        }
        html {
          scroll-behavior: smooth;
          font-size: 16px;
        }
        body {
          font-family: "Barlow Condensed", sans-serif;
          background: var(--bk);
          color: var(--cr);
          overflow-x: hidden;
        }
        ::selection {
          background: var(--g);
          color: var(--bk);
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .bebas {
          font-family: "Bebas Neue", sans-serif;
        }

        /* NAV */
        #nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 64px;
          transition: all 0.35s;
        }
        #nav.solid {
          background: rgba(10, 10, 10, 0.96);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(200, 152, 58, 0.18);
        }
        .nav-links {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .nav-links a {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(240, 235, 224, 0.6);
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: var(--g);
        }
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

        /* BUTTONS */
        .btn-p {
          background: var(--g);
          color: var(--bk);
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
        .btn-p:hover {
          background: var(--gb);
          transform: translateY(-2px);
        }
        .btn-g {
          background: transparent;
          color: var(--cr);
          border: 1px solid rgba(240, 235, 224, 0.3);
          padding: 14px 36px;
          font-family: "Barlow Condensed", sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-g:hover {
          border-color: var(--g);
          background: rgba(200, 152, 58, 0.07);
        }
        .btn-p.sm {
          padding: 10px 24px;
        }

        /* HERO */
        #hero {
          position: relative;
          height: 100vh;
          min-height: 640px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--bk);
        }
        #hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .hero-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: linear-gradient(transparent, var(--bk));
          pointer-events: none;
        }
        .hero-line-1 {
          position: absolute;
          top: 18%;
          right: 7%;
          width: 1.5px;
          height: 180px;
          background: linear-gradient(transparent, var(--g), transparent);
          transform: rotate(12deg);
          opacity: 0.55;
        }
        .hero-line-2 {
          position: absolute;
          bottom: 28%;
          right: 20%;
          width: 1px;
          height: 110px;
          background: linear-gradient(transparent, var(--g), transparent);
          transform: rotate(-9deg);
          opacity: 0.3;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 0 60px;
          max-width: 920px;
        }
        .hero-tag {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
          opacity: 0.75;
        }
        .hero-tag-line {
          width: 40px;
          height: 1px;
          background: var(--g);
        }
        .hero-tag span {
          font-size: 12px;
          letter-spacing: 0.44em;
          text-transform: uppercase;
          color: var(--g);
          font-weight: 600;
        }
        .hero-h1 {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(80px, 11vw, 138px);
          line-height: 0.86;
          margin-bottom: 0;
        }
        .hero-h1 .gold {
          color: var(--g);
        }
        .hero-sub {
          font-size: 20px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(240, 235, 224, 0.55);
          max-width: 480px;
          margin-top: 30px;
          margin-bottom: 44px;
        }
        .hero-ctas {
          display: flex;
          gap: 14px;
        }
        .scroll-line {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
        }
        .scroll-line div {
          width: 1px;
          height: 56px;
          background: linear-gradient(transparent, var(--g));
          opacity: 0.45;
        }

        /* MARQUEE */
        .marquee-wrap {
          background: var(--g);
          overflow: hidden;
          padding: 13px 0;
        }
        .mq-track {
          display: flex;
          animation: mq 24s linear infinite;
          width: max-content;
        }
        @keyframes mq {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .mq-item {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 0 28px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--bk);
          white-space: nowrap;
        }
        .mq-dot {
          width: 4px;
          height: 4px;
          background: var(--bk);
          border-radius: 50%;
        }

        /* SECTIONS */
        .sec {
          padding: 120px 60px;
        }
        .sec-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .sec-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }
        .sec-label .acc {
          width: 40px;
          height: 1px;
          background: var(--g);
          flex-shrink: 0;
        }
        .sec-label span {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.44em;
          text-transform: uppercase;
          color: var(--g);
        }
        .sec-label-c {
          justify-content: center;
        }
        .sec-label-c .acc2 {
          width: 40px;
          height: 1px;
          background: var(--g);
        }
        .sec-h {
          font-family: "Bebas Neue", sans-serif;
          line-height: 0.9;
          color: var(--cr);
        }
        .sec-h .g {
          color: var(--g);
        }
        .body-text {
          font-weight: 300;
          font-size: 17px;
          line-height: 1.8;
          color: rgba(240, 235, 224, 0.55);
        }

        /* ABOUT */
        #about {
          background: var(--bk);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px;
        }
        .stat-box {
          background: var(--d1);
          padding: 36px 28px;
          border: 1px solid #1c1c1c;
        }
        .stat-num {
          font-family: "Bebas Neue", sans-serif;
          font-size: 52px;
          color: var(--g);
          line-height: 1;
        }
        .stat-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240, 235, 224, 0.3);
          margin-top: 8px;
        }

        /* PORTAL */
        #portal {
          background: var(--d2);
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
        }
        .step-card {
          background: var(--d1);
          padding: 48px 32px;
          position: relative;
          overflow: hidden;
          border-bottom: 2px solid var(--g);
        }
        .step-bg-num {
          position: absolute;
          top: -10px;
          left: -4px;
          font-family: "Bebas Neue", sans-serif;
          font-size: 88px;
          color: rgba(200, 152, 58, 0.08);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .step-inner {
          position: relative;
          z-index: 1;
          margin-top: 40px;
        }
        .step-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 26px;
          letter-spacing: 0.05em;
          margin-bottom: 14px;
        }
        .portal-cta-wrap {
          text-align: center;
          margin-top: 48px;
        }
        .portal-cta-sub {
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(240, 235, 224, 0.28);
          margin-bottom: 18px;
        }

        /* PRICING */
        #pricing {
          background: var(--bk);
        }
        .price-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
          margin-bottom: 24px;
        }
        .price-card {
          background: var(--d1);
          padding: 40px 32px;
          border: 1px solid #1c1c1c;
          transition: border-color 0.3s, transform 0.3s;
        }
        .price-card:hover {
          border-color: var(--g);
          transform: translateY(-4px);
        }
        .price-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--g);
          margin-bottom: 10px;
        }
        .price-name {
          font-family: "Bebas Neue", sans-serif;
          font-size: 21px;
          letter-spacing: 0.05em;
          margin-bottom: 28px;
        }
        .price-num {
          font-family: "Bebas Neue", sans-serif;
          font-size: 58px;
          line-height: 1;
          color: var(--cr);
        }
        .price-note {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240, 235, 224, 0.28);
          margin-top: 6px;
        }
        .price-info {
          padding: 22px 28px;
          background: rgba(200, 152, 58, 0.06);
          border: 1px solid rgba(200, 152, 58, 0.2);
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .price-info-bar {
          width: 3px;
          height: 36px;
          background: var(--g);
          flex-shrink: 0;
        }

        /* SERVICES */
        #services {
          background: var(--d2);
        }
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3px;
        }
        .svc-card {
          background: var(--d1);
          padding: 36px 24px;
          border: 1px solid #1c1c1c;
          transition: border-color 0.3s, transform 0.3s;
        }
        .svc-card:hover {
          border-color: var(--g);
          transform: translateY(-4px);
        }
        .svc-icon {
          width: 30px;
          height: 30px;
          border: 1.5px solid var(--g);
          transform: rotate(45deg);
          margin-bottom: 28px;
        }
        .svc-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 22px;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }

        /* CONTACT */
        #contact {
          background: var(--bk);
          position: relative;
          overflow: hidden;
        }
        .contact-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(180px, 28vw, 340px);
          color: rgba(200, 152, 58, 0.032);
          letter-spacing: 0.08em;
          pointer-events: none;
          white-space: nowrap;
          user-select: none;
          line-height: 1;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          position: relative;
          z-index: 1;
        }
        .address-box {
          padding: 40px;
          background: var(--d1);
          border-left: 4px solid var(--g);
          margin-bottom: 20px;
        }
        .address-badge {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--g);
          margin-bottom: 20px;
        }
        .address-text {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(18px, 2vw, 24px);
          line-height: 2;
          letter-spacing: 0.04em;
        }
        .big-phone {
          display: block;
          margin-bottom: 36px;
        }
        .phone-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--g);
          margin-bottom: 8px;
        }
        .phone-num {
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(48px, 7vw, 74px);
          line-height: 1;
          letter-spacing: 0.03em;
          transition: color 0.2s;
        }
        .big-phone:hover .phone-num {
          color: var(--g);
        }
        .hours-grid {
          display: grid;
          gap: 3px;
        }
        .hour-row {
          background: var(--d1);
          padding: 18px 22px;
          border: 1px solid #1c1c1c;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hour-day {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--g);
        }
        .hour-time {
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.06em;
        }
        .hour-row.closed .hour-day {
          color: rgba(240, 235, 224, 0.2);
        }
        .hour-row.closed .hour-time {
          color: rgba(240, 235, 224, 0.22);
        }

        /* FOOTER */
        footer {
          background: #060606;
          border-top: 1px solid #181818;
          padding: 36px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--g);
          opacity: 0.6;
        }
        .footer-copy {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240, 235, 224, 0.18);
        }
        .footer-credit {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: rgba(240, 235, 224, 0.28);
        }
        .footer-credit a {
          color: var(--g);
          transition: opacity 0.2s;
        }
        .footer-credit a:hover {
          opacity: 0.7;
        }

        /* REVEAL */
        .reveal {
          opacity: 0;
          transform: translateY(38px);
          transition: opacity 0.8s, transform 0.8s;
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal.d1 {
          transition-delay: 0.1s;
        }
        .reveal.d2 {
          transition-delay: 0.2s;
        }
        .reveal.d3 {
          transition-delay: 0.3s;
        }
        .reveal.d4 {
          transition-delay: 0.4s;
        }

        /* LOGO SVG helper */
        .logo-svg {
          flex-shrink: 0;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .about-grid,
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .svc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          #nav {
            padding: 0 24px;
          }
          .nav-links a {
            display: none;
          }
          .sec {
            padding: 80px 24px;
          }
          .hero-content {
            padding: 0 24px;
          }
          .steps-grid,
          .price-grid {
            grid-template-columns: 1fr;
          }
          .svc-grid {
            grid-template-columns: 1fr;
          }
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
        <a href="#" className="wordmark">
          <svg
            className="logo-svg"
            width="34"
            height="34"
            viewBox="0 0 72 72"
            fill="none"
          >
            <path
              d="M36 4L68 36L36 68L4 36Z"
              stroke="#C8983A"
              strokeWidth="2.2"
              fill="none"
            />
            <rect x="19" y="22" width="8" height="28" fill="#C8983A" />
            <rect x="32" y="18" width="8" height="36" fill="#C8983A" />
            <rect x="45" y="22" width="8" height="28" fill="#C8983A" />
            <line
              x1="19"
              y1="50"
              x2="53"
              y2="50"
              stroke="#C8983A"
              strokeWidth="2"
            />
          </svg>
          <div className="wm-text">
            <div className="wm-a">AMT</div>
            <div className="wm-b">Imports</div>
          </div>
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <Link href="/login" className="btn-p sm">
            Client Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <canvas ref={canvasRef} id="hero-canvas"></canvas>
        <div className="hero-fade"></div>
        <div className="hero-line-1"></div>
        <div className="hero-line-2"></div>
        <div className="hero-content">
          <div className="hero-tag">
            <div className="hero-tag-line"></div>
            <span>Nassau, The Bahamas</span>
          </div>
          <h1 className="hero-h1">
            Ship Smart.
            <br />
            <span className="gold">Ship AMT.</span>
          </h1>
          <p className="hero-sub">
            Air freight from Florida to Nassau — two sailings a week. Real
            pickup, real delivery, and a client portal so you always know where
            your stuff is.
          </p>
          <div className="hero-ctas">
            <Link href="/login" className="btn-p">
              Client Login
            </Link>
            <a href="#services" className="btn-g">
              Our Services
            </a>
          </div>
        </div>
        <div className="scroll-line">
          <div></div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="mq-track" ref={mqRef}></div>
      </div>

      {/* ABOUT */}
      <section className="sec" id="about" style={{ background: "var(--bk)" }}>
        <div className="sec-inner">
          <div className="about-grid">
            <div className="reveal" data-rev="story">
              <div className="sec-label">
                <div className="acc"></div>
                <span>Our Story</span>
              </div>
              <h2
                className="sec-h"
                style={{
                  fontSize: "clamp(52px,6vw,86px)",
                  marginBottom: "32px",
                }}
              >
                Three Brothers.
                <br />
                <span className="g">One Mission.</span>
              </h2>
              <p
                className="body-text"
                style={{ fontSize: "19px", marginBottom: "22px" }}
              >
                AMT stands for us — three brothers building something real from
                Nassau. We grew up knowing how hard it was to get goods
                delivered affordably and on time. So we built the solution
                ourselves.
              </p>
              <p className="body-text" style={{ fontSize: "19px" }}>
                Two sailings every week. Prices that make sense. Real people
                picking up the phone. And now a portal so you actually know
                where your package is. That&apos;s the AMT way.
              </p>
            </div>
            <div className="reveal d2 stats-grid" data-rev="stats">
              <div className="stat-box">
                <div className="stat-num">10K+</div>
                <div className="stat-label">Deliveries Made</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">99.5%</div>
                <div className="stat-label">On-Time Rate</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">500+</div>
                <div className="stat-label">Business Clients</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">2×</div>
                <div className="stat-label">Sailings Per Week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAL */}
      <section className="sec" id="portal" style={{ background: "var(--d2)" }}>
        <div className="sec-inner">
          <div
            className="reveal"
            data-rev="portal-h"
            style={{ textAlign: "center", marginBottom: "72px" }}
          >
            <div
              className="sec-label sec-label-c"
              style={{ justifyContent: "center" }}
            >
              <div className="acc2"></div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.44em",
                  textTransform: "uppercase",
                  color: "var(--g)",
                  padding: "0 14px",
                }}
              >
                New in 2026
              </span>
              <div className="acc2"></div>
            </div>
            <h2
              className="sec-h"
              style={{
                fontSize: "clamp(52px,6vw,84px)",
                marginBottom: "24px",
              }}
            >
              Your Packages
              <br />
              <span className="g">Have a Home Now.</span>
            </h2>
            <p
              className="body-text"
              style={{ fontSize: "19px", maxWidth: "540px", margin: "0 auto" }}
            >
              A full client portal is launching this year. Track packages, view
              invoices, pay online. Admin-approved accounts only — your data
              stays secure and yours.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card reveal" data-rev="s1">
              <div className="step-bg-num">01</div>
              <div className="step-inner">
                <div className="step-title">We Set You Up</div>
                <p className="body-text" style={{ fontSize: "17px" }}>
                  Contact us to open your account. Our admin creates your
                  profile and sends a secure invitation directly to your email.
                </p>
              </div>
            </div>
            <div className="step-card reveal d2" data-rev="s2">
              <div className="step-bg-num">02</div>
              <div className="step-inner">
                <div className="step-title">Confirm &amp; Sign In</div>
                <p className="body-text" style={{ fontSize: "17px" }}>
                  Click the link in your email, set your password, and your
                  portal is ready from day one. No waiting, no hassle.
                </p>
              </div>
            </div>
            <div className="step-card reveal d3" data-rev="s3">
              <div className="step-bg-num">03</div>
              <div className="step-inner">
                <div className="step-title">Track Everything</div>
                <p className="body-text" style={{ fontSize: "17px" }}>
                  View your packages, check order status, download invoices,
                  and pay online — anytime, from any device.
                </p>
              </div>
            </div>
          </div>
          <div className="portal-cta-wrap reveal" data-rev="portal-cta">
            <p className="portal-cta-sub">Ready to get access?</p>
            <a href="#contact" className="btn-p">
              Contact Us to Open Your Account
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        className="sec"
        id="pricing"
        style={{ background: "var(--bk)" }}
      >
        <div className="sec-inner">
          <div
            className="reveal"
            data-rev="price-h"
            style={{ marginBottom: "64px" }}
          >
            <div className="sec-label">
              <div className="acc"></div>
              <span>Pricing</span>
            </div>
            <h2 className="sec-h" style={{ fontSize: "clamp(52px,6vw,84px)" }}>
              Simple Rates.
              <br />
              <span className="g">No Surprises.</span>
            </h2>
          </div>
          <div className="price-grid">
            <div className="price-card reveal" data-rev="p1">
              <div className="price-badge">Up to 10 lbs</div>
              <div className="price-name">Small Package</div>
              <div className="price-num">From $8</div>
              <div className="price-note">Per package</div>
            </div>
            <div className="price-card reveal d2" data-rev="p2">
              <div className="price-badge">10 – 50 lbs</div>
              <div className="price-name">Standard Freight</div>
              <div className="price-num">From $15</div>
              <div className="price-note">Per package</div>
            </div>
            <div className="price-card reveal d3" data-rev="p3">
              <div className="price-badge">50 lbs &amp; over</div>
              <div className="price-name">Bulk / Business</div>
              <div className="price-num">Custom</div>
              <div className="price-note">Call for quote</div>
            </div>
          </div>
          <div className="price-info reveal" data-rev="p-note">
            <div className="price-info-bar"></div>
            <p className="body-text" style={{ fontSize: "16px" }}>
              All rates include standard handling. Priority handling, insurance,
              and same-day pickup available at additional cost. Call for
              business account rates and volume discounts.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="sec"
        id="services"
        style={{ background: "var(--d2)" }}
      >
        <div className="sec-inner">
          <div
            className="reveal"
            data-rev="svc-h"
            style={{ textAlign: "center", marginBottom: "72px" }}
          >
            <div
              className="sec-label sec-label-c"
              style={{ justifyContent: "center", marginBottom: "18px" }}
            >
              <div className="acc2"></div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.44em",
                  textTransform: "uppercase",
                  color: "var(--g)",
                  padding: "0 14px",
                }}
              >
                What We Do
              </span>
              <div className="acc2"></div>
            </div>
            <h2 className="sec-h" style={{ fontSize: "clamp(52px,6vw,84px)" }}>
              Built For The Bahamas.
            </h2>
          </div>
          <div className="svc-grid">
            <div className="svc-card reveal" data-rev="sv1">
              <div className="svc-icon"></div>
              <div className="svc-title">Air Freight</div>
              <p
                className="body-text"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                Direct from Ft. Lauderdale. Two sailings every week —
                consistent, reliable, and on schedule.
              </p>
            </div>
            <div className="svc-card reveal d1" data-rev="sv2">
              <div className="svc-icon"></div>
              <div className="svc-title">Pickup &amp; Delivery</div>
              <p
                className="body-text"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                We come to you in Nassau, or you drop off with us. Delivery
                right to your door.
              </p>
            </div>
            <div className="svc-card reveal d2" data-rev="sv3">
              <div className="svc-icon"></div>
              <div className="svc-title">Priority Handling</div>
              <p
                className="body-text"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                Urgent packages go to the front. Handled with care from pickup
                all the way to your door.
              </p>
            </div>
            <div className="svc-card reveal d3" data-rev="sv4">
              <div className="svc-icon"></div>
              <div className="svc-title">Fragile &amp; Special</div>
              <p
                className="body-text"
                style={{ fontSize: "16px", lineHeight: 1.75 }}
              >
                Electronics, documents, high-value items — white-glove handling
                on every sensitive shipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec" id="contact" style={{ background: "var(--bk)" }}>
        <div className="contact-bg-text">AMT</div>
        <div className="sec-inner">
          <div className="contact-grid">
            {/* ADDRESS */}
            <div className="reveal" data-rev="addr">
              <div className="sec-label">
                <div className="acc"></div>
                <span>US Freight Address</span>
              </div>
              <h2
                className="sec-h"
                style={{
                  fontSize: "clamp(40px,4.5vw,60px)",
                  marginBottom: "36px",
                }}
              >
                Ship Here
                <br />
                <span className="g">From Any US Store.</span>
              </h2>
              <div className="address-box">
                <div className="address-badge">Your Shipping Address</div>
                <div className="address-text">
                  (Your Name)
                  <br />
                  C/O Mike Ferguson
                  <br />
                  950 Eller Dr Bay 1<br />
                  Suite 5<br />
                  Ft Lauderdale, FL 33316
                </div>
              </div>
              <p className="body-text" style={{ fontSize: "16px" }}>
                Order from any US retailer using this address. We consolidate
                your goods and bring them home on our next sailing to Nassau.
              </p>
            </div>
            {/* PHONE + HOURS */}
            <div className="reveal d2" data-rev="reach">
              <div className="sec-label">
                <div className="acc"></div>
                <span>Get In Touch</span>
              </div>
              <h2
                className="sec-h"
                style={{
                  fontSize: "clamp(40px,4.5vw,60px)",
                  marginBottom: "36px",
                }}
              >
                Real People.
                <br />
                <span className="g">Real Answers.</span>
              </h2>
              <a href="tel:2428215883" className="big-phone">
                <div className="phone-label">Call or WhatsApp</div>
                <div className="phone-num">(242) 821-5883</div>
              </a>
              <div className="hours-grid">
                <div className="hour-row">
                  <span className="hour-day">Mon – Fri</span>
                  <span className="hour-time">9:00 AM – 6:00 PM</span>
                </div>
                <div className="hour-row">
                  <span className="hour-day">Saturday</span>
                  <span className="hour-time">10:00 AM – 4:00 PM</span>
                </div>
                <div className="hour-row closed">
                  <span className="hour-day">Sun &amp; Holidays</span>
                  <span className="hour-time">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wordmark">
          <svg
            className="logo-svg"
            width="26"
            height="26"
            viewBox="0 0 72 72"
            fill="none"
          >
            <path
              d="M36 4L68 36L36 68L4 36Z"
              stroke="#C8983A"
              strokeWidth="2.2"
              fill="none"
            />
            <rect x="19" y="22" width="8" height="28" fill="#C8983A" />
            <rect x="32" y="18" width="8" height="36" fill="#C8983A" />
            <rect x="45" y="22" width="8" height="28" fill="#C8983A" />
            <line
              x1="19"
              y1="50"
              x2="53"
              y2="50"
              stroke="#C8983A"
              strokeWidth="2"
            />
          </svg>
          <div className="wm-text" style={{ marginLeft: "10px" }}>
            <div className="wm-a" style={{ fontSize: "17px" }}>
              AMT Imports
            </div>
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
