import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.brandSection}>
          <h2 className={styles.brandName}>Dr. Sarveshwer Prasad</h2>
          <p className={styles.tagline}>Advanced Cardiac Care with Precision & Trust</p>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/drsarveshwerprasad/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              Instagram
            </a>
            {/* Add more social icons as needed */}
          </div>
        </div>
        
        <div className={styles.linksSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Doctor</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/admin/login" style={{ color: 'var(--primary-color)' }}>Admin Login</Link></li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h3>Contact Form / Info</h3>
          <p><strong>Hospital:</strong> Sterling Hospital, Rajkot</p>
          <p><strong>Phone:</strong> <a href="tel:+919909751284">9909751284</a></p>
          <Link href="/book" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Book Appointment
          </Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Dr. Sarveshwer Prasad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
