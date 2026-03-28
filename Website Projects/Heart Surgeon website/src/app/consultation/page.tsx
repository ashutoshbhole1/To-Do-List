import styles from "./consultation.module.css";
import Link from "next/link";

export default function Consultation() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Online Video Consultation</h1>
        <p className={styles.subtitle}>
          Expert cardiac care from the comfort of your home. Consult with Dr. Sarveshwer Prasad via Google Meet.
        </p>
      </div>

      <div className={styles.benefitsSection}>
        <div className={`glass-panel ${styles.benefitCard}`}>
          <div className={styles.icon}>⏱️</div>
          <h3>Save Time</h3>
          <p>No waiting rooms or travel required. Get your expert opinion instantly from anywhere.</p>
        </div>
        <div className={`glass-panel ${styles.benefitCard}`}>
          <div className={styles.icon}>🏠</div>
          <h3>Consult from Home</h3>
          <p>Perfect for follow-ups or initial discussions before deciding on surgery.</p>
        </div>
        <div className={`glass-panel ${styles.benefitCard}`}>
          <div className={styles.icon}>🔒</div>
          <h3>Secure & Private</h3>
          <p>Your medical history and discussions are completely confidential via secure Google Meet links.</p>
        </div>
      </div>

      <div className={styles.processSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.timeline}>
          <div className={`glass-panel ${styles.stepCard}`}>
            <span className={styles.stepNumber}>1</span>
            <div>
              <h3>Book Appointment</h3>
              <p>Select a date and time that works for you. Choose 'Online Consultation' in our booking form.</p>
            </div>
          </div>
          <div className={`glass-panel ${styles.stepCard}`}>
            <span className={styles.stepNumber}>2</span>
            <div>
              <h3>Receive Meeting Link</h3>
              <p>An automated Google Meet link will be sent to your email and WhatsApp instantly upon confirmation.</p>
            </div>
          </div>
          <div className={`glass-panel ${styles.stepCard}`}>
            <span className={styles.stepNumber}>3</span>
            <div>
              <h3>Join the Session</h3>
              <p>At the scheduled time, simply click the link from your phone or computer to start the video call.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ctaContainer}>
        <div className={`glass-panel ${styles.ctaBox}`}>
          <h2>Ready for your Online Consultation?</h2>
          <p>Book your slot now and get expert medical advice directly.</p>
          <Link href="/book" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
            Book Online Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
