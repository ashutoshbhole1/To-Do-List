import styles from "./admin.module.css";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let stats = { total: 0, online: 0, offline: 0, pending: 0 };
  let errorMsg = null;

  try {
    await dbConnect();
    stats.total = await Appointment.countDocuments();
    stats.online = await Appointment.countDocuments({ type: "online" });
    stats.offline = await Appointment.countDocuments({ type: "offline" });
    stats.pending = await Appointment.countDocuments({ status: "pending" });
  } catch (error: any) {
    console.error("Dashboard error:", error);
    errorMsg = "Unable to connect to the database to fetch statistics.";
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      
      {errorMsg && (
        <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '2rem', fontWeight: 500 }}>
          {errorMsg}
        </div>
      )}

      <div className={styles.statsGrid}>
        <div className={`glass-panel ${styles.statCard}`}>
          <h3>Total Appointments</h3>
          <div className={styles.statValue}>{stats.total}</div>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <h3>Online Meetings</h3>
          <div className={styles.statValue}>{stats.online}</div>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <h3>Hospital Visits</h3>
          <div className={styles.statValue}>{stats.offline}</div>
        </div>
        <div className={`glass-panel ${styles.statCard}`}>
          <h3>Pending Approvals</h3>
          <div className={`${styles.statValue} ${styles.pendingValue}`}>{stats.pending}</div>
        </div>
      </div>

      <div className={`glass-panel ${styles.recentSection}`}>
        <h2>Quick Actions</h2>
        <div className={styles.actionLinks}>
          <a href="/admin/appointments" className="btn-primary">Manage Appointments</a>
        </div>
      </div>
    </div>
  );
}
