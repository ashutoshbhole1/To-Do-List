"use client";

import { useState, useEffect } from "react";
import styles from "./book.module.css";

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    issue: "",
    date: "",
    time: "",
    type: "offline"
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/blocked-dates")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBlockedDates(data.map((d: any) => d.date));
        }
      })
      .catch(err => console.error("Error fetching blocked dates", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "date") {
      if (blockedDates.includes(e.target.value)) {
        setErrorMsg("Dr. Prasad is unavailable on this selected date. Please choose another date.");
      } else {
        setErrorMsg("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (blockedDates.includes(formData.date)) {
      setErrorMsg("Dr. Prasad is unavailable on this selected date. Please choose another date.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/appointments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to book appointment");

      setSuccess(true);
      setFormData({
        patientName: "", phone: "", email: "", issue: "", date: "", time: "", type: "offline"
      });
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={`glass-panel ${styles.successCard}`}>
          <div className={styles.successIcon}>✅</div>
          <h2>Appointment Request Sent!</h2>
          <p>We have successfully received your request for an appointment.</p>
          <p className={styles.followUpText}>
            Our team will contact you shortly to confirm your booking slot.
            {formData.type === "online" && " A Google Meet link will be provided upon confirmation."}
          </p>
          <button className="btn-primary" onClick={() => setSuccess(false)}>Book Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Book an Appointment</h1>
        <p className={styles.subtitle}>Select your preferred date, time, and consultation method.</p>
      </div>

      <div className={styles.formContainer}>
        <div className={`glass-panel ${styles.formCard}`}>
          {errorMsg && <div className={styles.errorBox}>{errorMsg}</div>}
          
          <form onSubmit={handleSubmit} className={styles.bookingForm}>
            <div className={styles.formGrid}>
              
              {/* Personal Details */}
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required placeholder="e.g. John Doe" />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. +91 9876543210" />
              </div>
              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Optional, for meet link" />
              </div>

              {/* Appointment Details */}
              <div className={styles.formGroup}>
                <label>Preferred Date *</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className={styles.formGroup}>
                <label>Preferred Time *</label>
                <select name="time" value={formData.time} onChange={handleChange} required>
                  <option value="" disabled>Select a slot</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>

              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label>Consultation Type *</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="type" value="offline" checked={formData.type === "offline"} onChange={handleChange} />
                    <span>In-Person (Hospital Visit)</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="type" value="online" checked={formData.type === "online"} onChange={handleChange} />
                    <span>Online (Google Meet)</span>
                  </label>
                </div>
              </div>

              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label>Medical Issue / Symptoms *</label>
                <textarea name="issue" value={formData.issue} onChange={handleChange} rows={4} required placeholder="Briefly describe your symptoms or reason for visit"></textarea>
              </div>
            </div>

            <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? "Submitting..." : "Confirm Booking Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
