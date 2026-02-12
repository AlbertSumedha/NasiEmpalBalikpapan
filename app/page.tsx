"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Navbar Shrink Logic
      setIsShrunk(window.scrollY > 50);

      // Scroll Reveal Logic
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });

      // Active Link Logic
      const sections = ["home", "about", "gallery"];
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - 150;
          if (window.scrollY >= sectionTop) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${isShrunk ? "shrink" : ""}`}>
        <div className="nav-container">
          <div className="logo">NASI EMPAL Ny. Lika</div>
          <div className="nav-links">
            <Link href="#home" className={`nav-link ${activeSection === "home" ? "active" : ""}`}>Home</Link>
            <Link href="#about" className={`nav-link ${activeSection === "about" ? "active" : ""}`}>Tentang Kami</Link>
            <Link href="#gallery" className={`nav-link ${activeSection === "gallery" ? "active" : ""}`}>Menu & Galeri</Link>
            <Link href="https://wa.me/6285751252276" target="_blank" className="nav-btn">Pesan Sekarang</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero">
        <h1>Kelezatan Autentik Nusantara</h1>
        <p>Empal sapi lembut dengan rempah rahasia keluarga yang meresap sempurna. Sajian rasa masakan keluarga di setiap suapan.</p>
        <Link href="https://wa.me/6285751252276" className="btn-cta">Cicipi Sekarang</Link>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section reveal">
        <div className="about-content">
          <h2>Kenapa Memilih Kami?</h2>
          <div className="divider"></div>
          <p className="about-text-top">
            <strong>Nasi Empal Ny. Lika</strong> menghadirkan kualitas premium. Kami menggunakan daging sapi pilihan dan rempah segar untuk memastikan setiap hidangan memiliki rasa yang tak terlupakan.
          </p>
          <div className="about-features">
            <div className="feature-card">
              <i className="fas fa-utensils"></i>
              <h3>Resep Keluarga</h3>
              <p>Resep asli orang tua yang dijaga keasliannya.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-leaf"></i>
              <h3>Bahan Alami</h3>
              <p>Daging sapi segar dan bumbu pilihan tanpa bahan pengawet.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-check-circle"></i>
              <h3>100% higienis</h3>
              <p>Diproses secara higienis dan terjamin kebersihannya.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-star"></i>
              <h3>Rasa Premium</h3>
              <p>Tekstur daging empuk dengan bumbu yang meresap kuat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MENU & GALLERY SECTION */}
      <section id="gallery" className="section" style={{ background: "var(--soft-bg)" }}>
        <div className="about-content">
          <h2 className="reveal">Daftar Menu Kami</h2>
          <div className="divider reveal"></div>

          <div className="menu-intro-wrapper reveal">
            <div className="menu-intro-image">
              <img src="/menu.jpeg" alt="Daftar Menu Nasi Empal" />
            </div>
            <div className="menu-intro-text">
              <h3>Sajian Autentik Ny. Lika</h3>
              <p>Kami menghadirkan cita rasa empal sapi yang empuk dengan racikan bumbu tradisional khas Balikpapan. Dimasak dengan metode perlahan agar setiap rempah meresap sempurna.</p>
              <ul className="menu-highlights">
                <li><i className="fas fa-check-circle"></i> Daging Sapi Pilihan Premium</li>
                <li><i className="fas fa-check-circle"></i> Tanpa Bahan Pengawet</li>
                <li><i className="fas fa-check-circle"></i> Sambal Fresh Setiap Hari</li>
              </ul>
            </div>
          </div>

          <h2 className="docs-title reveal" style={{ marginTop: "80px" }}>Dokumentasi Kelezatan</h2>
          <div className="divider reveal"></div>
          
          <div className="docs-grid">
            {[9, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="docs-item reveal">
                <img src={`/image${num}.jpeg`} alt={`Dok ${num}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="logo">Nasi Empal Ny. Lika</div>
        <p>&copy; 2026 Nasi Empal Ny. Lika. Dibuat dengan cinta untuk pecinta kuliner.</p>
      </footer>

      {/* WA FLOAT */}
      <Link href="https://wa.me/6285751252276" className="wa-float" target="_blank">
        <i className="fab fa-whatsapp"></i>
      </Link>
    </>
  );
}