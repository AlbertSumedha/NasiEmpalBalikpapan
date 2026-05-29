"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 60);
      if (window.scrollY > 80) setMenuOpen(false);

      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
          element.classList.add("active");
        }
      });

      const sections = ["home", "about", "gallery"];
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 150) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const menuItems = [
    {
      src: "/Nasi Empal.jpeg",
      name: "Nasi Empal",
      desc: "Empal sapi lembut dengan bumbu rempah khas, disajikan di atas daun pisang dengan lalapan segar.",
      badge: "Favorit",
    },
    {
      src: "/Nasi Sop Empal.jpeg",
      name: "Nasi Sop Empal",
      desc: "Kuah sop hangat berpadu empal sapi, sayuran segar, dan sambal pedas yang menggugah selera.",
      badge: "Terlaris",
    },
    {
      src: "/Nasi Empal Penyet.jpeg",
      name: "Nasi Empal Penyet",
      desc: "Empal penyet dengan sambal terasi segar, tempe, tahu, dan pelengkap yang melimpah.",
      badge: "Pedas",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --brown-deep: #2C1A0E;
          --brown-rich: #5C3317;
          --brown-mid: #8B5A2B;
          --brown-warm: #C4864A;
          --cream-dark: #E8D5B0;
          --cream-light: #F7EFD8;
          --cream-pale: #FBF6EC;
          --gold: #C9963A;
          --gold-light: #E8C07A;
          --text-body: #3D2314;
          --text-muted: #7A5A3C;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream-pale);
          color: var(--text-body);
          overflow-x: hidden;
        }

        /* ── NAVBAR ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 28px 48px;
          transition: all 0.45s ease;
          background: transparent;
        }
        .navbar::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(20,10,4,0.78) 0%, rgba(20,10,4,0) 100%);
          pointer-events: none;
          transition: opacity 0.45s ease;
          z-index: 0;
        }
        .navbar.shrink::before { opacity: 0; }
        .navbar.shrink {
          padding: 14px 48px;
          background: rgba(251,246,236,0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(139,90,43,0.15);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--cream-pale);
          letter-spacing: 0.02em;
          line-height: 1.2;
          transition: color 0.45s ease;
          text-decoration: none;
        }
        .navbar.shrink .logo { color: var(--brown-deep); }
        .logo span {
          display: block;
          font-size: 0.65rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-top: 1px;
          transition: color 0.45s ease;
        }
        .navbar.shrink .logo span { color: var(--brown-warm); }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .nav-link {
          font-size: 0.82rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(251,246,236,0.85);
          text-decoration: none;
          position: relative;
          transition: color 0.3s;
        }
        .navbar.shrink .nav-link { color: var(--text-muted); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--cream-pale); }
        .navbar.shrink .nav-link:hover { color: var(--brown-deep); }
        .nav-link.active { color: var(--gold-light); }
        .navbar.shrink .nav-link.active { color: var(--brown-deep); }
        .nav-link.active::after, .nav-link:hover::after { width: 100%; }
        .nav-btn {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--cream-pale);
          background: var(--brown-rich);
          padding: 12px 26px;
          border-radius: 2px;
          text-decoration: none;
          transition: all 0.3s;
        }
        .nav-btn:hover { background: var(--brown-mid); }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
          background: none;
          border: none;
          z-index: 2;
        }
        .hamburger span {
          display: block;
          width: 24px; height: 1.5px;
          background: var(--cream-pale);
          transition: all 0.35s ease;
          transform-origin: center;
        }
        .navbar.shrink .hamburger span { background: var(--brown-deep); }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--brown-deep);
          z-index: 99;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
        .mobile-menu .nav-link {
          font-size: 1.1rem;
          color: rgba(251,246,236,0.7);
          letter-spacing: 0.18em;
        }
        .mobile-menu .nav-link.active { color: var(--gold-light); }
        .mobile-menu .nav-link:hover { color: var(--cream-pale); }
        .mobile-menu .nav-btn { margin-top: 12px; padding: 16px 40px; font-size: 0.85rem; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 48px;
          position: relative;
          background: var(--brown-deep);
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('/image9.jpeg') center/cover no-repeat;
          opacity: 0.42;
        }
        .hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 65% 50%, transparent 25%, rgba(20,10,4,0.6) 100%);
          pointer-events: none;
        }
        .hero-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .hero-badge {
          font-size: 0.72rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--gold-light);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.2s forwards;
        }
        .hero-badge::before {
          content: '';
          width: 40px; height: 1px;
          background: var(--gold);
        }
        .hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.4rem, 7.5vw, 6.4rem);
          font-weight: 500;
          color: var(--cream-pale);
          line-height: 1.06;
          margin-bottom: 28px;
          max-width: 760px;
          text-shadow: 0 2px 24px rgba(0,0,0,0.4);
          opacity: 0;
          animation: fadeUp 0.9s ease 0.4s forwards;
        }
        .hero h1 em { font-style: italic; color: var(--gold-light); }
        .hero p {
          font-size: 1rem;
          font-weight: 300;
          color: rgba(251,246,236,0.78);
          line-height: 1.85;
          max-width: 460px;
          margin-bottom: 48px;
          letter-spacing: 0.01em;
          text-align: left;
          text-shadow: 0 1px 8px rgba(0,0,0,0.35);
          opacity: 0;
          animation: fadeUp 0.9s ease 0.6s forwards;
        }
        .hero-actions {
          display: flex;
          gap: 18px;
          align-items: center;
          opacity: 0;
          animation: fadeUp 0.9s ease 0.8s forwards;
        }
        .btn-primary {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--brown-deep);
          background: var(--gold);
          padding: 16px 36px;
          border-radius: 2px;
          text-decoration: none;
          transition: all 0.3s;
        }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
        .btn-outline {
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--cream-pale);
          border: 1px solid rgba(251,246,236,0.35);
          padding: 16px 36px;
          border-radius: 2px;
          text-decoration: none;
          transition: all 0.3s;
        }
        .btn-outline:hover { border-color: rgba(251,246,236,0.75); background: rgba(251,246,236,0.06); }
        .hero-scroll {
          position: absolute;
          bottom: 40px; left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: fadeIn 1s ease 1.2s forwards;
        }
        .hero-scroll span {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(251,246,236,0.35);
        }
        .scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, rgba(201,150,58,0.9), transparent);
          animation: scrollPulse 2.2s ease-in-out infinite;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(0.75); }
          50%       { opacity: 1;    transform: scaleY(1); }
        }

        /* ── SECTION BASE ── */
        .section { padding: 120px 48px; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-label {
          font-size: 0.72rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 300;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .section-label::before {
          content: '';
          width: 30px; height: 1px;
          background: var(--gold);
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 500;
          color: var(--brown-deep);
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .section-title em { font-style: italic; color: var(--brown-warm); }
        .section-divider {
          width: 60px; height: 1px;
          background: var(--gold);
          margin-bottom: 60px;
        }

        /* ── REVEAL + STAGGER ── */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .stagger-children > * {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .stagger-children.active > *:nth-child(1) { transition-delay: 0ms;   opacity: 1; transform: none; }
        .stagger-children.active > *:nth-child(2) { transition-delay: 110ms; opacity: 1; transform: none; }
        .stagger-children.active > *:nth-child(3) { transition-delay: 220ms; opacity: 1; transform: none; }
        .stagger-children.active > *:nth-child(4) { transition-delay: 330ms; opacity: 1; transform: none; }

        /* ── ABOUT ── */
        .about-section { background: var(--cream-pale); }
        .about-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 72px;
        }
        .about-text p {
          font-size: 1.05rem;
          line-height: 1.95;
          color: var(--text-muted);
          font-weight: 300;
          margin-bottom: 40px;
        }
        .stat-row {
          display: flex;
          border-top: 1px solid rgba(139,90,43,0.15);
          border-bottom: 1px solid rgba(139,90,43,0.15);
        }
        .stat-item {
          flex: 1;
          padding: 24px 0;
          text-align: center;
          border-right: 1px solid rgba(139,90,43,0.15);
        }
        .stat-item:last-child { border-right: none; }
        .stat-item strong {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem;
          font-weight: 600;
          color: var(--brown-deep);
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-item span {
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 300;
        }
        .about-image-wrap { position: relative; }
        .about-image-wrap img {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 2px;
          display: block;
        }
        .about-image-accent {
          position: absolute;
          top: -18px; right: -18px;
          width: 80px; height: 80px;
          border: 1px solid var(--gold);
          border-radius: 2px;
          z-index: -1;
        }
        .about-image-accent-2 {
          position: absolute;
          bottom: -14px; left: -14px;
          width: 50px; height: 50px;
          border: 1px solid rgba(201,150,58,0.4);
          border-radius: 2px;
          z-index: -1;
        }

        /* Feature cards */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: rgba(139,90,43,0.1);
        }
        .feature-card {
          background: var(--cream-pale);
          padding: 40px 30px;
          transition: background 0.35s ease, transform 0.35s ease;
          cursor: default;
        }
        .feature-card:hover { background: var(--cream-light); transform: translateY(-3px); }
        .feature-icon {
          width: 44px; height: 44px;
          border: 1px solid var(--gold);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          color: var(--gold);
          font-size: 1.05rem;
          transition: background 0.3s, color 0.3s;
        }
        .feature-card:hover .feature-icon { background: var(--gold); color: var(--brown-deep); }
        .feature-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--brown-deep);
          margin-bottom: 10px;
        }
        .feature-card p {
          font-size: 0.87rem;
          line-height: 1.75;
          color: var(--text-muted);
          font-weight: 300;
        }

        /* ── MENU SECTION ── */
        .menu-section { background: var(--cream-light); }
        .menu-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 100px;
        }
        .menu-image {
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }
        .menu-image img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          display: block;
          transition: transform 0.7s ease;
        }
        .menu-image:hover img { transform: scale(1.04); }
        .menu-content h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: var(--brown-deep);
          margin-bottom: 18px;
          line-height: 1.25;
        }
        .menu-content p {
          font-size: 0.96rem;
          line-height: 1.9;
          color: var(--text-muted);
          font-weight: 300;
          margin-bottom: 28px;
        }
        .menu-highlights { list-style: none; }
        .menu-highlights li {
          font-size: 0.88rem;
          color: var(--text-muted);
          padding: 12px 0;
          border-bottom: 1px solid rgba(139,90,43,0.1);
          display: flex;
          align-items: center;
          gap: 14px;
          font-weight: 300;
          letter-spacing: 0.02em;
          transition: color 0.25s, padding-left 0.25s;
        }
        .menu-highlights li:hover { color: var(--brown-deep); padding-left: 4px; }
        .menu-highlights li::before {
          content: '';
          width: 20px; height: 1px;
          background: var(--gold);
          flex-shrink: 0;
          transition: width 0.3s;
        }
        .menu-highlights li:hover::before { width: 28px; }
        .menu-cta {
          margin-top: 36px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--brown-rich);
          border-bottom: 1px solid var(--gold);
          padding-bottom: 4px;
          text-decoration: none;
          transition: color 0.3s, gap 0.3s;
        }
        .menu-cta:hover { color: var(--gold); gap: 14px; }

        /* ── MENU PHOTOCARDS ── */
        .photocards-label {
          font-size: 0.72rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 300;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .photocards-label::before {
          content: '';
          width: 30px; height: 1px;
          background: var(--gold);
        }
        .photocards-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 500;
          color: var(--brown-deep);
          margin-bottom: 10px;
          line-height: 1.15;
        }
        .photocards-title em { font-style: italic; color: var(--brown-warm); }
        .photocards-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
          font-weight: 300;
          margin-bottom: 52px;
          letter-spacing: 0.02em;
        }
        .photocards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 100px;
        }
        .photocard {
          background: var(--cream-pale);
          border-radius: 3px;
          overflow: hidden;
          transition: transform 0.4s ease;
          position: relative;
        }
        .photocard:hover { transform: translateY(-6px); }
        .photocard-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .photocard-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s ease;
        }
        .photocard:hover .photocard-img-wrap img { transform: scale(1.07); }
        .photocard-badge {
          position: absolute;
          top: 16px; left: 16px;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brown-deep);
          background: var(--gold);
          padding: 5px 12px;
          border-radius: 1px;
          z-index: 2;
        }
        .photocard-body {
          padding: 24px 26px 28px;
          border: 1px solid rgba(139,90,43,0.1);
          border-top: none;
          border-radius: 0 0 3px 3px;
        }
        .photocard-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: var(--brown-deep);
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .photocard-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 300;
          line-height: 1.75;
          margin-bottom: 20px;
        }
        .photocard-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.73rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brown-rich);
          text-decoration: none;
          border-bottom: 1px solid var(--gold);
          padding-bottom: 3px;
          transition: color 0.3s, gap 0.3s;
        }
        .photocard-cta:hover { color: var(--gold); gap: 12px; }

        /* ── GALLERY ── */
        .gallery-header { margin-bottom: 40px; }
        .gallery-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 500;
          color: var(--brown-deep);
          margin-bottom: 10px;
          line-height: 1.15;
        }
        .gallery-title em { font-style: italic; color: var(--brown-warm); }
        .gallery-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        /* Masonry-style 4-col grid for 11 items */
        .docs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 220px;
          gap: 4px;
        }
        /* Hero item — spans 2×2 */
        .docs-grid .docs-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
        /* Second accent — spans 2 cols, 1 row */
        .docs-grid .docs-item:nth-child(6) { grid-column: span 2; }

        .docs-item {
          overflow: hidden;
          position: relative;
          cursor: pointer;
          border-radius: 1px;
        }
        .docs-item img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .docs-item:hover img { transform: scale(1.07); }
        .docs-item-overlay {
          position: absolute;
          inset: 0;
          background: rgba(44,26,14,0);
          transition: background 0.35s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .docs-item:hover .docs-item-overlay { background: rgba(44,26,14,0.3); }
        .docs-item-overlay-icon {
          opacity: 0;
          transform: scale(0.7);
          transition: all 0.35s ease;
          width: 40px; height: 40px;
          border: 1px solid rgba(251,246,236,0.6);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: rgba(251,246,236,0.9);
          font-size: 1.2rem;
          font-weight: 300;
        }
        .docs-item:hover .docs-item-overlay-icon { opacity: 1; transform: scale(1); }

        /* ── CTA STRIP ── */
        .cta-strip {
          background: var(--brown-deep);
          padding: 100px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-strip::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          border-radius: 50%;
          border: 1px solid rgba(201,150,58,0.08);
          pointer-events: none;
        }
        .cta-strip::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 960px; height: 960px;
          border-radius: 50%;
          border: 1px solid rgba(201,150,58,0.04);
          pointer-events: none;
        }
        .cta-strip-inner { max-width: 640px; margin: 0 auto; position: relative; z-index: 1; }
        .cta-gold-line { width: 40px; height: 1px; background: var(--gold); margin: 0 auto 32px; }
        .cta-strip p {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.7rem, 3vw, 2.5rem);
          font-style: italic;
          font-weight: 400;
          color: var(--cream-light);
          line-height: 1.55;
          margin-bottom: 12px;
        }
        .cta-strip-author {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(232,213,176,0.4);
          margin-bottom: 44px;
          font-weight: 300;
          display: block;
        }
        .cta-strip a {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--brown-deep);
          background: var(--gold);
          padding: 18px 44px;
          border-radius: 2px;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
        }
        .cta-strip a:hover { background: var(--gold-light); transform: translateY(-2px); }

        /* ── FOOTER ── */
        footer {
          background: var(--brown-deep);
          border-top: 1px solid rgba(201,150,58,0.15);
          padding: 48px;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--cream-light);
          line-height: 1.2;
        }
        .footer-logo span {
          display: block;
          font-size: 0.62rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(232,213,176,0.4);
          margin-top: 3px;
        }
        footer p {
          font-size: 0.78rem;
          color: rgba(232,213,176,0.35);
          font-weight: 300;
          letter-spacing: 0.04em;
          text-align: center;
        }
        .footer-links { display: flex; gap: 28px; }
        .footer-links a {
          font-size: 0.76rem;
          color: rgba(232,213,176,0.45);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .footer-links a:hover { color: var(--gold-light); }

        /* ── WA FLOAT ── */
       .wa-float {
          position: fixed;
          bottom: 28px;
          right: max(24px, env(safe-area-inset-right));
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          z-index: 9999;
    }
        .wa-label {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--brown-deep);
          background: var(--cream-pale);
          padding: 8px 14px;
          border-radius: 20px;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(8px);
          transition: all 0.3s ease;
          pointer-events: none;
          letter-spacing: 0.03em;
          box-shadow: 0 2px 12px rgba(44,26,14,0.15);
        }
        .wa-float:hover .wa-label { opacity: 1; transform: translateX(0); }
        .wa-btn {
          width: 54px; height: 54px;
          background: #25D366;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          color: white;
          box-shadow: 0 4px 20px rgba(37,211,102,0.35);
          transition: transform 0.3s, box-shadow 0.3s;
          flex-shrink: 0;
          overflow: hidden;
        }
        .wa-float:hover .wa-btn {
          transform: scale(1.08);
          box-shadow: 0 6px 28px rgba(37,211,102,0.5);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .navbar { padding: 20px 24px; }
          .navbar.shrink { padding: 14px 24px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: flex; }
          .hero { padding: 0 24px; }
          .section { padding: 80px 24px; }
          .about-intro { grid-template-columns: 1fr; gap: 40px; }
          .about-intro .about-image-wrap { order: -1; }
          .features-grid { grid-template-columns: 1fr 1fr; }
          .menu-layout { grid-template-columns: 1fr; gap: 40px; }
          .photocards-grid { grid-template-columns: 1fr; gap: 20px; }
          .docs-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
          .docs-grid .docs-item:nth-child(1) { grid-column: span 1; grid-row: span 1; }
          .docs-grid .docs-item:nth-child(6) { grid-column: span 1; }
          .cta-strip { padding: 72px 24px; }
          footer { padding: 36px 24px; }
          .footer-inner { flex-direction: column; gap: 20px; text-align: center; }
          .footer-links { justify-content: center; }
        }
        @media (max-width: 680px) {
          .photocards-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; align-items: flex-start; gap: 14px; }
          .stat-row { flex-wrap: wrap; }
          .stat-item { flex: 0 0 50%; border-bottom: 1px solid rgba(139,90,43,0.15); }
          .docs-grid { grid-auto-rows: 140px; }
        }
      `}</style>

      {/* MOBILE DRAWER */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link
          href="#home"
          className={`nav-link ${activeSection === "home" ? "active" : ""}`}
          onClick={handleNavClick}
        >
          Home
        </Link>
        <Link
          href="#about"
          className={`nav-link ${activeSection === "about" ? "active" : ""}`}
          onClick={handleNavClick}
        >
          Tentang Kami
        </Link>
        <Link
          href="#gallery"
          className={`nav-link ${activeSection === "gallery" ? "active" : ""}`}
          onClick={handleNavClick}
        >
          Menu & Galeri
        </Link>
        <Link
          href="https://wa.me/6285751252276"
          target="_blank"
          className="nav-btn"
          onClick={handleNavClick}
        >
          Pesan Sekarang
        </Link>
      </div>

      {/* NAVBAR */}
      <nav className={`navbar ${isShrunk ? "shrink" : ""}`}>
        <div className="nav-container">
          <Link href="#home" className="logo">
            Nasi Empal Ny. Lika
            <span>Balikpapan</span>
          </Link>
          <div className="nav-links">
            <Link
              href="#home"
              className={`nav-link ${activeSection === "home" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="#about"
              className={`nav-link ${activeSection === "about" ? "active" : ""}`}
            >
              Tentang Kami
            </Link>
            <Link
              href="#gallery"
              className={`nav-link ${activeSection === "gallery" ? "active" : ""}`}
            >
              Menu & Galeri
            </Link>
            <Link
              href="https://wa.me/6285751252276"
              target="_blank"
              className="nav-btn"
            >
              Pesan Sekarang
            </Link>
          </div>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-badge">Resep Warisan Keluarga</div>
          <h1>
            Kelezatan
            <br />
            <em>Autentik</em>
            <br />
            Nusantara
          </h1>
          <p>
            Empal sapi lembut dengan rempah rahasia keluarga yang meresap
            sempurna. Sajian rasa masakan rumahan di setiap suapan.
          </p>
          <div className="hero-actions">
            <Link
              href="https://wa.me/6285751252276"
              target="_blank"
              className="btn-primary"
            >
              Pesan Sekarang
            </Link>
            <Link href="#about" className="btn-outline">
              Kenali Kami
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Tentang Kami</div>
            <h2 className="section-title">
              Dimasak dengan <em>Cinta,</em>
              <br />
              Disajikan dengan Bangga
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="about-intro reveal">
            <div className="about-text">
              <p>
                Nasi Empal Ny. Lika hadir membawa cita rasa otentik empal sapi
                yang telah diwariskan turun-temurun. Setiap hidangan kami
                dimasak perlahan menggunakan bumbu rempah pilihan tanpa
                pengawet, menghadirkan tekstur daging yang empuk dan rasa yang
                kaya di setiap suapan.
              </p>
              <div className="stat-row">
                <div className="stat-item">
                  <strong>38+</strong>
                  <span>Tahun Berdiri</span>
                </div>
                <div className="stat-item">
                  <strong>1000+</strong>
                  <span>Pelanggan Setia</span>
                </div>
                <div className="stat-item">
                  <strong>100%</strong>
                  <span>Bahan Alami</span>
                </div>
              </div>
            </div>
            <div className="about-image-wrap">
              <img src="/image2.jpeg" alt="Sajian Nasi Empal Ny. Lika" />
              <div className="about-image-accent"></div>
              <div className="about-image-accent-2"></div>
            </div>
          </div>

          <div className="features-grid stagger-children reveal">
            {[
              {
                icon: "🍽",
                title: "Resep Keluarga",
                desc: "Resep turun-temurun asli Balikpapan yang dijaga keasliannya.",
              },
              {
                icon: "🌿",
                title: "Bahan Alami",
                desc: "Daging sapi segar dan bumbu pilihan, tanpa bahan pengawet.",
              },
              {
                icon: "✓",
                title: "100% Higienis",
                desc: "Diproses secara higienis dan terjamin kebersihannya.",
              },
              {
                icon: "★",
                title: "Rasa Premium",
                desc: "Tekstur daging empuk dengan bumbu yang meresap kuat.",
              },
            ].map((item, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU & GALLERY */}
      <section id="gallery" className="section menu-section">
        <div className="section-inner">
          {/* Menu intro */}
          <div className="reveal">
            <div className="section-label">Daftar Menu</div>
            <h2 className="section-title">
              Sajian <em>Autentik</em>
              <br />
              Ny. Lika
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="menu-layout reveal">
            <div className="menu-image">
              <img src="/menu.jpeg" alt="Daftar Menu Nasi Empal" />
            </div>
            <div className="menu-content">
              <h3>Cita Rasa Empal yang Tak Terlupakan</h3>
              <p>
                Kami menghadirkan empal sapi yang empuk dengan racikan bumbu
                tradisional khas Balikpapan. Dimasak dengan metode perlahan agar
                setiap rempah meresap sempurna ke dalam daging.
              </p>
              <ul className="menu-highlights">
                <li>Daging Sapi Pilihan Premium</li>
                <li>Tanpa Bahan Pengawet</li>
                <li>Sambal Fresh Setiap Hari</li>
                <li>Porsi Mengenyangkan</li>
              </ul>
              <Link
                href="https://wa.me/6285751252276"
                target="_blank"
                className="menu-cta"
              >
                Lihat Menu Lengkap & Pesan →
              </Link>
            </div>
          </div>

          {/* ── PHOTOCARDS ── */}
          <div className="reveal">
            <div className="photocards-label">Pilihan Menu</div>
            <h2 className="photocards-title">
              Menu <em>Andalan</em> Kami
            </h2>
            <p className="photocards-sub">
              Tiga sajian terpopuler yang selalu jadi favorit pelanggan setia
              kami
            </p>
          </div>

          <div className="photocards-grid stagger-children reveal">
            {menuItems.map((item, i) => (
              <div key={i} className="photocard">
                <div className="photocard-img-wrap">
                  <img src={item.src} alt={item.name} />
                  <div className="photocard-badge">{item.badge}</div>
                </div>
                <div className="photocard-body">
                  <div className="photocard-name">{item.name}</div>
                  <p className="photocard-desc">{item.desc}</p>
                  <Link
                    href="https://wa.me/6285751252276"
                    target="_blank"
                    className="photocard-cta"
                  >
                    Pesan Sekarang →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ── GALLERY ── */}
          <div className="gallery-header reveal">
            <h2 className="gallery-title">
              Dokumentasi <em>Kelezatan</em>
            </h2>
            <p className="gallery-sub">
              Setiap foto menceritakan dedikasi kami terhadap kualitas dan cita
              rasa
            </p>
          </div>

          <div className="docs-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => (
              <div
                key={num}
                className="docs-item reveal"
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <img src={`/image${num}.jpeg`} alt={`Dokumentasi ${num}`} />
                <div className="docs-item-overlay">
                  <div className="docs-item-overlay-icon">+</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <div className="cta-strip">
        <div className="cta-strip-inner reveal">
          <div className="cta-gold-line"></div>
          <p>
            "Satu suapan, seribu kenangan — inilah rasa rumah yang
            sesungguhnya."
          </p>
          <span className="cta-strip-author">— Ny. Lika, Pendiri</span>
          <Link href="https://wa.me/6285751252276" target="_blank">
            Pesan via WhatsApp
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            Nasi Empal Ny. Lika
            <span>Balikpapan</span>
          </div>
          <p>
            &copy; 2026 Nasi Empal Ny. Lika. Dibuat dengan cinta untuk pecinta
            kuliner.
          </p>
          <div className="footer-links">
            <Link href="#home">Home</Link>
            <Link href="#about">Tentang</Link>
            <Link href="#gallery">Menu</Link>
          </div>
        </div>
      </footer>

      {/* WA FLOAT */}
      <Link
        href="https://wa.me/6285751252276"
        className="wa-float"
        target="_blank"
        title="Chat via WhatsApp"
      >
        <span className="wa-label">Pesan sekarang?</span>
        <div className="wa-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="white"
          >
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.664 4.786 1.82 6.77L2 30l7.43-1.79A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.823-1.594l-.418-.248-4.33 1.044 1.074-4.222-.272-.433A11.47 11.47 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.617c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172-.23.344-.89 1.118-1.09 1.348-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.04-1.912-2.384-.2-.344-.021-.53.15-.701.155-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.776-1.87-1.063-2.562-.28-.672-.564-.58-.776-.59l-.66-.012c-.23 0-.603.086-.918.43-.316.344-1.204 1.176-1.204 2.867s1.233 3.326 1.405 3.555c.172.23 2.428 3.708 5.882 5.198.822.355 1.464.567 1.964.726.825.263 1.576.226 2.17.137.662-.099 2.036-.832 2.323-1.635.287-.803.287-1.492.2-1.635-.086-.143-.316-.23-.66-.402z" />
          </svg>
        </div>
      </Link>
    </>
  );
}
