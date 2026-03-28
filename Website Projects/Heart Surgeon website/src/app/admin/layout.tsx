import styles from "./admin.module.css";
import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // If there's no session, it means we are either on the login page (which should not use this layout ideally)
  // But since login is inside /admin, layout applies. We can conditionally render sidebar.
  
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={`glass-panel ${styles.sidebar}`}>
        <div className={styles.sidebarHeader}>
          <h3>Admin Panel</h3>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin">Dashboard </Link>
          <Link href="/admin/appointments">Appointments </Link>
          <Link href="/admin/schedule">Schedule </Link>
          <Link href="/admin/settings">Settings </Link>
          <a 
            href="/api/auth/signout"
            style={{ textAlign: 'left', display: 'block', textDecoration: 'none', background: 'none', border: 'none', color: '#ef4444', padding: '0.8rem 1rem', cursor: 'pointer', fontWeight: 500, marginTop: 'auto' }}
          >
            Logout
          </a>
        </nav>
      </aside>
      <main className={styles.adminContent}>
        {children}
      </main>
    </div>
  );
}
