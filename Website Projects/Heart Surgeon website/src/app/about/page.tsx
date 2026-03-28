import styles from "./about.module.css";
import Image from "next/image";

export default function About() {
  return (
    <div className="container animate-fade-in-up">
      <div className={styles.aboutHeader}>
        <h1 className={styles.title}>About Dr. Sarveshwer Prasad</h1>
        <p className={styles.subtitle}>Consultant Cardiac Surgeon & MS, MCh - CVTS (Gold Medalist)</p>
      </div>

      <div className={`animate-fade-in-up ${styles.profileSection}`}>
        <div className={`glass-panel ${styles.imageCard} animate-zoom-in`}>
          <div className={styles.imageWrapper}>
            <Image 
              src="/Assets/Dr. Sarveshwar Prasad.png" 
              alt="Dr. Sarveshwer Prasad" 
              fill 
              style={{ objectFit: 'cover', objectPosition: 'top' }} 
            />
          </div>
        </div>
        
        <div className={styles.bioContent}>
          <h2>Profile Overview</h2>
          <p>
            Dr. Sarveshwer Prasad is a highly acclaimed Cardiovascular and Thoracic Surgeon currently serving as a Consultant Cardiac Surgeon at Sterling Hospital, Rajkot. Recognised as a Gold Medalist in MCh - CVTS, Dr. Prasad is known for precision, patient-centric care, and a remarkable success rate in complex cardiac procedures.
          </p>
          <p>
            With an emphasis on Minimally Invasive Cardiac Surgery, he ensures that his patients experience faster recovery times, minimal scarring, and excellent long-term outcomes.
          </p>

          <div className={styles.credentialsGrid}>
            <div className={`glass-panel ${styles.credentialCard} animate-fade-in-up-delay-1`}>
              <h3>Qualifications</h3>
              <ul>
                <li><strong>MCh - CVTS</strong> (Gold Medalist)</li>
                <li><strong>MS</strong> in General Surgery</li>
                <li><strong>MBBS</strong></li>
              </ul>
            </div>
            <div className={`glass-panel ${styles.credentialCard} animate-fade-in-up-delay-2`}>
              <h3>Specializations</h3>
              <ul>
                <li>Minimally Invasive Cardiac Surgery</li>
                <li>Coronary Artery Bypass Grafting (CABG)</li>
                <li>Heart Valve Repair & Replacement</li>
                <li>Heart Failure Management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={`animate-fade-in-up-delay-1 ${styles.timelineSection}`}>
        <h2 className={styles.sectionTitle}>Experience & Achievements</h2>
        <div className={styles.timeline}>
          <div className={`glass-panel ${styles.timelineItem}`}>
            <h4>Consultant Cardiac Surgeon</h4>
            <p className={styles.timelineLocation}>Sterling Hospital, Rajkot</p>
            <p>Leading the cardiothoracic department and performing advanced minimally invasive surgeries.</p>
          </div>
          <div className={`glass-panel ${styles.timelineItem}`}>
            <h4>Gold Medalist Award</h4>
            <p className={styles.timelineLocation}>MCh - CVTS Programs</p>
            <p>Awarded for outstanding academic and surgical performance during MCh specialization.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
