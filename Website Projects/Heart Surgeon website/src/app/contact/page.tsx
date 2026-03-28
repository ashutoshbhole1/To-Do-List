import styles from "./contact.module.css";

export default function Contact() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>We are here to answer your questions and help you schedule your visit.</p>
      </div>

      <div className={styles.contactContainer}>
        <div className={`glass-panel ${styles.infoCard}`}>
          <h2>Contact Information</h2>
          <div className={styles.infoItem}>
            <h3>📍 Hospital Address</h3>
            <p>Sterling Hospital, 150 Feet Ring Road,<br/>Near Raiya Circle, Rajkot, Gujarat 360007</p>
          </div>
          <div className={styles.infoItem}>
            <h3>📞 Phone Support</h3>
            <p><a href="tel:+919909751284">+91 9909751284</a></p>
            <p>Available Mon-Sat, 9:00 AM - 7:00 PM</p>
          </div>
          <div className={styles.infoItem}>
            <h3>💬 WhatsApp</h3>
            <p>
              <a 
                href="https://wa.me/919909751284?text=Hello%20Dr.%20Sarveshwer%20Prasad,%20I%20want%20to%20inquire%20about..."
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                Chat on WhatsApp
              </a>
            </p>
          </div>
        </div>

        <div className={`glass-panel ${styles.formCard}`}>
          <h2>Send a Message</h2>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 **********" required />
            </div>
            <div className={styles.formGroup}>
              <label>Message / Inquiry</label>
              <textarea rows={5} placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <h2 className={styles.mapTitle}>Find Us Here</h2>
        <div className={`glass-panel ${styles.mapWrapper}`}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5658603613765!2d70.76840741542159!3d22.31298418531737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98a3c8e4e69%3A0xc3f17387cc004ec9!2sSterling%20Hospital%20Rajkot!5e0!3m2!1sen!2sin!4v1683838423456!5m2!1sen!2sin" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  );
}
