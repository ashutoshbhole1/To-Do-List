import styles from "./services.module.css";
import Link from "next/link";
import Image from "next/image";

const servicesList = [
  {
    title: "Bypass Surgery (CABG)",
    shortDesc: "Advanced coronary artery bypass grafting to restore normal blood flow to an obstructed coronary artery.",
    benefits: [
      "Improves blood supply to the heart",
      "Reduces symptoms of angina",
      "Lowers the risk of heart attacks",
      "Increases chances of long-term survival"
    ]
  },
  {
    title: "Minimally Invasive Cardiac Surgery",
    shortDesc: "State-of-the-art surgical techniques using small incisions rather than opening the chest.",
    benefits: [
      "Smaller incisions and minimal scarring",
      "Reduced postoperative pain",
      "Shorter hospital stay",
      "Quicker return to normal activities"
    ]
  },
  {
    title: "Valve Replacement & Repair",
    shortDesc: "Surgical repair or replacement of diseased heart valves to restore normal cardiovascular function.",
    benefits: [
      "Restores normal blood flow",
      "Relieves strain on the heart muscle",
      "Significantly improves quality of life",
      "Options for mechanical or tissue valves"
    ]
  },
  {
    title: "Heart Failure Treatment",
    shortDesc: "Comprehensive medical and surgical management for patients suffering from advanced heart failure.",
    benefits: [
      "Optimized medication regimens",
      "Surgical interventions (e.g., VADs)",
      "Improved exercise tolerance",
      "Enhanced overall survival rate"
    ]
  },
  {
    title: "Emergency Cardiac Care",
    shortDesc: "Immediate surgical intervention for acute cardiovascular emergencies.",
    benefits: [
      "24/7 dedicated trauma team",
      "Rapid response times",
      "Advanced life support protocols",
      "High success rate in critical cases"
    ]
  }
];

export default function Services() {
  return (
    <div className="container animate-fade-in-up">
      <div className={styles.header}>
        <h1 className={styles.title}>Specialized Treatments & Procedures</h1>
        <p className={styles.subtitle}>
          Delivering advanced, evidence-based surgical solutions tailored to your unique cardiac needs.
        </p>
      </div>

      <div className="animate-fade-in-up-delay-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
        <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden' }} className="animate-zoom-in">
          <Image src="/Assets/heart.jpg" alt="Heart Anatomy" fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden' }} className="animate-zoom-in">
          <Image src="/Assets/heart 2.jpg" alt="Cardiac Surgical Care" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>

      <div className={`${styles.servicesGrid} animate-fade-in-up-delay-2`}>
        {servicesList.map((service, idx) => (
          <div key={idx} className={`glass-panel ${styles.serviceCard}`}>
            <h2>{service.title}</h2>
            <p className={styles.description}>{service.shortDesc}</p>
            <h3>Key Benefits:</h3>
            <ul className={styles.benefitsList}>
              {service.benefits.map((benefit, bIdx) => (
                <li key={bIdx}>{benefit}</li>
              ))}
            </ul>
            <div className={styles.cardFooter}>
              <Link href="/book" className="btn-primary">Book Consultation</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
