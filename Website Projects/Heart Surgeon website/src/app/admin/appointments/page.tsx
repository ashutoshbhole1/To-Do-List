"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { format } from "date-fns";

type Appointment = {
  _id: string;
  patientName: string;
  phone: string;
  email: string;
  issue: string;
  date: string;
  time: string;
  type: string;
  meetLink?: string;
  status: string;
  createdAt: string;
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rescheduleData, setRescheduleData] = useState<{id: string, date: string, time: string} | null>(null);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch");
      }
      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Failed to fetch appointments", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setProcessingId(id);
    let payload: any = { status: newStatus };
    
    if (newStatus === "rescheduled" && rescheduleData && rescheduleData.id === id) {
      payload.date = rescheduleData.date;
      payload.time = rescheduleData.time;
    }

    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      fetchAppointments();
      if (newStatus === "rescheduled") {
        setRescheduleData(null);
      }
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <div className={styles.dashboardContainer}><p>Loading...</p></div>;

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>Manage Appointments</h1>
      
      <div className={styles.tableContainer}>
        <table className={styles.appointmentsTable}>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Patient Details</th>
              <th>Type</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "2rem" }}>No appointments found.</td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>
                    <strong>
                      {apt.date ? (() => {
                        try {
                          return format(new Date(apt.date), "dd MMM yyyy");
                        } catch(e) {
                          return apt.date;
                        }
                      })() : "N/A"}
                    </strong><br/>
                    <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>{apt.time || "N/A"}</span>
                  </td>
                  <td>
                    <strong>{apt.patientName || "Unknown"}</strong><br/>
                    <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>{apt.phone}</span><br/>
                    {apt.email && <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>{apt.email}</span>}
                  </td>
                  <td>
                    {apt.type === "online" ? (
                      <div>
                        <span style={{ fontWeight: 600 }}>🌐 Online</span><br/>
                        {apt.meetLink && (
                          <a 
                            href={apt.meetLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ fontSize: "0.85rem", color: "#3b82f6", textDecoration: "underline", display: "inline-block", marginTop: "4px" }}
                          >
                            Join Meet
                          </a>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontWeight: 600 }}>🏥 Offline</span>
                    )}
                  </td>
                  <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={apt.issue}>
                    {apt.issue}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status-${apt.status}`]}`}>
                      {apt.status === "rescheduled" ? "Rescheduled" : apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons} style={{ flexWrap: 'wrap', gap: '8px' }}>
                      {rescheduleData?.id === apt._id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <input type="date" value={rescheduleData.date} onChange={(e) => setRescheduleData({...rescheduleData, date: e.target.value})} style={{ padding: '4px', fontSize: '0.8rem' }} />
                          <input type="time" value={rescheduleData.time.substring(0,5)} onChange={(e) => setRescheduleData({...rescheduleData, time: e.target.value})} style={{ padding: '4px', fontSize: '0.8rem' }} />
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button disabled={processingId === apt._id} onClick={() => updateStatus(apt._id, "rescheduled")} className={`${styles.btnSmall} ${styles.btnApprove}`}>Save</button>
                            <button disabled={processingId === apt._id} onClick={() => setRescheduleData(null)} className={styles.btnSmall} style={{ background: '#6b7280', color: 'white' }}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {apt.status === "pending" && (
                            <>
                              <button disabled={processingId === apt._id} onClick={() => updateStatus(apt._id, "approved")} className={`${styles.btnSmall} ${styles.btnApprove}`}>
                                {processingId === apt._id ? "..." : "Approve"}
                              </button>
                              <button disabled={processingId === apt._id} onClick={() => updateStatus(apt._id, "rejected")} className={`${styles.btnSmall} ${styles.btnReject}`}>Reject</button>
                            </>
                          )}
                          {(apt.status === "approved" || apt.status === "rejected" || apt.status === "rescheduled") && (
                            <>
                              <button disabled={processingId === apt._id} onClick={() => setRescheduleData({ id: apt._id, date: apt.date || "", time: apt.time || "" })} className={styles.btnSmall} style={{ background: '#3b82f6', color: 'white' }}>Reschedule</button>
                              <button disabled={processingId === apt._id} onClick={() => updateStatus(apt._id, "pending")} className={styles.btnSmall} style={{ background: "#6b7280", color: "white" }}>Reset</button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
