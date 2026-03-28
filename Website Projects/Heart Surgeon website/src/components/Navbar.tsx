"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className={styles.logo}>
          Dr. Sarveshwer Prasad
        </Link>
        <nav className={`${styles.navLinks} ${isOpen ? styles.navOpen : ""}`}>
          <Link href="/" className={pathname === "/" ? styles.active : ""}>Home</Link>
          <Link href="/about" className={pathname === "/about" ? styles.active : ""}>About</Link>
          <Link href="/services" className={pathname?.startsWith("/services") ? styles.active : ""}>Services</Link>
          <Link href="/consultation" className={pathname === "/consultation" ? styles.active : ""}>Online Consult</Link>
          <Link href="/contact" className={pathname === "/contact" ? styles.active : ""}>Contact</Link>
          
          <Link href="/book" className={`btn-primary ${styles.mobileBookBtn}`}>
            Book Appointment
          </Link>
        </nav>
        
        <div className={styles.desktopActions}>
          <ThemeToggle />
          <Link href="/book" className="btn-primary" style={{ padding: '10px 20px' }}>
            Book Appointment
          </Link>
        </div>

        <div className={styles.mobileActions}>
          <ThemeToggle />
          <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`${styles.bar} ${isOpen ? styles.barOpenTop : ""}`}></span>
            <span className={`${styles.bar} ${isOpen ? styles.barOpenMiddle : ""}`}></span>
            <span className={`${styles.bar} ${isOpen ? styles.barOpenBottom : ""}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
