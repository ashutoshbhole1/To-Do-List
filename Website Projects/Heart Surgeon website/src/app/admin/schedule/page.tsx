"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";
import { format } from "date-fns";

type BlockedDate = { _id: string; date: string; reason: string };
type WorkingHour = { _id: string; day: string; start: string; end: string; isClosed: boolean; note: string; order: number };

function formatTime(time24: string) {
  if (!time24 || time24 === "00:00") return "";
  const [h, m] = time24.split(':');
  const d = new Date();
  d.setHours(parseInt(h));
  d.setMinutes(parseInt(m));
  return format(d, "hh:mm a");
}

export default function ScheduleManagement() {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [isEditingHours, setIsEditingHours] = useState(false);
  
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    try {
      const [blockedRes, hoursRes] = await Promise.all([
        fetch("/api/blocked-dates"),
        fetch("/api/working-hours")
      ]);
      const blocked = await blockedRes.json();
      const hours = await hoursRes.json();
      
      if (Array.isArray(blocked)) setBlockedDates(blocked);
      if (Array.isArray(hours)) setWorkingHours(hours);
    } catch (error) {
      console.error("Failed to load schedule data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBlock = async () => {
    if (!newDate) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newDate }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setNewDate("");
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBlock = async (id: string) => {
    try {
      await fetch(`/api/blocked-dates/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to remove blocked date", error);
    }
  };

  const handleSaveHours = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/working-hours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workingHours)
      });
      if (res.ok) {
        setIsEditingHours(false);
        fetchData();
      }
    } catch (err) {
      console.error("Error saving hours", err);
    } finally {
      setLoading(false);
    }
  };

  const updateHourField = (id: string, field: keyof WorkingHour, value: any) => {
    setWorkingHours(prev => prev.map(wh => wh._id === id ? { ...wh, [field]: value } : wh));
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>Schedule Management</h1>
      
      <div className={`glass-panel ${styles.recentSection}`}>
        <h2>Manage Working Hours</h2>
        <p style={{ opacity: 0.8, marginBottom: "1.5rem" }}>
          Configure your daily availability and block specific dates when you are unavailable.
        </p>

        <div className={styles.scheduleGrid}>
          <div>
            <h3>Standard Working Hours</h3>
            
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {workingHours.map(wh => (
                <div key={wh._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', background: isEditingHours ? 'var(--glass-bg)' : 'transparent', borderRadius: '8px', border: isEditingHours ? '1px solid var(--glass-border)' : 'none' }}>
                  <strong style={{ width: '90px' }}>{wh.day}:</strong>
                  
                  {isEditingHours ? (
                    <div style={{ display: 'flex', gap: '5px', flex: 1, alignItems: 'center' }}>
                      <input type="checkbox" checked={wh.isClosed} onChange={(e) => updateHourField(wh._id, 'isClosed', e.target.checked)} title="Closed" />
                      {!wh.isClosed && (
                        <>
                          <input type="time" value={wh.start} onChange={(e) => updateHourField(wh._id, 'start', e.target.value)} style={{ padding: '0.2rem', width:'90px' }} />
                          <span>-</span>
                          <input type="time" value={wh.end} onChange={(e) => updateHourField(wh._id, 'end', e.target.value)} style={{ padding: '0.2rem', width:'90px' }} />
                        </>
                      )}
                      <input type="text" placeholder="Note (e.g. No OPD)" value={wh.note} onChange={(e) => updateHourField(wh._id, 'note', e.target.value)} style={{ padding: '0.3rem', flex: 1, fontSize:'0.8rem' }} />
                    </div>
                  ) : (
                    <span style={{ flex: 1, textAlign: 'right' }}>
                      {wh.isClosed ? "Closed" : 
                       wh.note ? wh.note : 
                       `${formatTime(wh.start)} - ${formatTime(wh.end)}`}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {workingHours.length > 0 && (
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                {isEditingHours ? (
                  <>
                    <button className="btn-primary" onClick={handleSaveHours} disabled={loading} style={{ padding: '10px 20px' }}>{loading ? "Saving..." : "Save Hours"}</button>
                    <button onClick={() => {setIsEditingHours(false); fetchData();}} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                  </>
                ) : (
                  <button className="btn-primary" onClick={() => setIsEditingHours(true)} style={{ padding: '10px 20px' }}>Edit Hours</button>
                )}
              </div>
            )}
          </div>

          <div>
            <h3>Blocked Dates / Leave</h3>
            <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1rem' }}>Dates marked as blocked will not be available for patient booking.</p>
            
            {errorMsg && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{errorMsg}</p>}
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <input 
                type="date" 
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)' }} 
              />
              <button 
                onClick={handleAddBlock}
                disabled={loading || !newDate}
                className="btn-primary" 
                style={{ padding: '0.8rem 1.5rem', borderRadius: '8px' }}>
                {loading ? "Adding..." : "Block Date"}
              </button>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {blockedDates.length === 0 ? (
                <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>No upcoming blocked dates.</p>
              ) : (
                blockedDates.map(bDate => (
                  <li key={bDate._id} style={{ padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{bDate.date ? format(new Date(bDate.date), "dd MMM yyyy") : "Invalid"}</strong>
                    <button onClick={() => handleRemoveBlock(bDate._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
