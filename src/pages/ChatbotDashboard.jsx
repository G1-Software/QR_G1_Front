import { useEffect, useRef, useState } from "react";
import "../styles/App.css";
import "../styles/adminHome.css";
import { AdminNavbar } from "../components/AdminNavbar";
export function ChatbotDashboard() {
  const headerRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState(900);

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const verticalPadding = 48;
      const available = window.innerHeight - headerHeight - verticalPadding;
      setFrameHeight(Math.max(available, 900));
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="requests-dashboard">
      <AdminNavbar />

      <section className="dashboard-wrapper">
        <iframe
          title="Google Looker Studio dashboard"
          src={import.meta.env.VITE_LOOKER_CHATBOT}
          loading="lazy"
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          height={frameHeight}
          className="dashboard-frame"
          style={{ height: `${frameHeight}px` }}
        />
      </section>
    </div>
  );
}
