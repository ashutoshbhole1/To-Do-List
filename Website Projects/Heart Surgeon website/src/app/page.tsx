import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Advanced Cardiac Care with Precision & Trust</h1>
            <p className={styles.heroSubtitle}>
              Dr. Sarveshwer Prasad, MS, MCh - CVTS (Gold Medalist), provides world-class minimally invasive cardiac surgery and consultation at Sterling Hospital, Rajkot.
            </p>
            <div className={styles.heroActions}>
              <Link href="/book" className="btn-primary">Book Appointment</Link>
              <Link href="/consultation" className="btn-secondary">Consult Online</Link>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div className={`glass-panel ${styles.imageCard}`}>
              <div style={{ position: 'relative', width: '100%', height: '600px', borderRadius: '16px', overflow: 'hidden' }}>
                <Image 
                  src="/Assets/hero img.jpg" 
                  alt="Heart Surgery Hero" 
                  fill 
                  style={{ objectFit: 'contain', objectPosition: 'center' }} 
                  priority 
                />
              </div>
              <div className={styles.statsBadge}>
                <strong>Gold Medalist</strong> Surgeon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={`glass-panel ${styles.trustCard}`}>
              <h3 className={styles.trustNumber}>20+</h3>
              <p>Years Experience</p>
            </div>
            <div className={`glass-panel ${styles.trustCard}`}>
              <h3 className={styles.trustNumber}>5000+</h3>
              <p>Successful Surgeries</p>
            </div>
            <div className={`glass-panel ${styles.trustCard}`}>
              <h3 className={styles.trustNumber}>99%</h3>
              <p>Success Rate</p>
            </div>
            <div className={`glass-panel ${styles.trustCard}`}>
              <h3 className={styles.trustNumber}>24/7</h3>
              <p>Emergency Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Our Specialized Services</h2>
          <div className={styles.servicesGrid}>
            {[
              { title: "Bypass Surgery (CABG)", desc: "Advanced coronary artery bypass grafting with exceptional outcomes." },
              { title: "Minimally Invasive Cardiac Surgery", desc: "Faster recovery, smaller incisions, and less pain." },
              { title: "Valve Replacement", desc: "Expertise in complex mitral and aortic valve repairs/replacements." },
              { title: "Heart Failure Treatment", desc: "Comprehensive management and surgical options for end-stage heart failure." },
            ].map((service, idx) => (
              <div key={idx} className={`glass-panel ${styles.serviceCard}`}>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link href="/services" className={styles.learnMore}>Learn More &rarr;</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/services" className="btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Quick Booking CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={`glass-panel ${styles.ctaCard}`}>
            <h2>Ready to Take Care of Your Heart?</h2>
            <p>Schedule a consultation with Dr. Sarveshwer Prasad today. Choose between an in-person visit or an online video consultation.</p>
            <div className={styles.ctaButtons}>
              <Link href="/book" className="btn-primary">Book Now</Link>
              <a href="tel:+919909751284" className="btn-secondary">Call Emergency</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
