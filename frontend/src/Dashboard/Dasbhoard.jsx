import { useState, useRef, useContext } from "react";
import Sidebar from "../Component/Sidebar";
import CreateMusic from "./CreateMusic";
import CreateAlbum from "./CreateAlbum";
import { userContext } from "../ContextApi/UserContext";
import { LogOut, Menu, X, Music2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";

const SIDEBAR_ITEMS = [
  { id: "create-music", label: "Create Music", icon: "🎵" },
  { id: "create-album", label: "Create Album", icon: "💿" },
];

function InputField({ label, error, children }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a78bfa", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </label>
      {children}
      {error && <p style={{ color: "#f87171", fontSize: 12, marginTop: 5 }}>{error}</p>}
    </div>
  );
}

function Toast({ msg, onClose }) {
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
      color: "#fff", padding: "14px 22px", borderRadius: 14, fontSize: 15, fontWeight: 500,
      boxShadow: "0 8px 32px rgba(124,58,237,0.4)", zIndex: 1000, display: "flex", alignItems: "center", gap: 10,
      animation: "slideUp 0.3s ease"
    }}>
      <span>✅</span> {msg}
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#c4b5fd", cursor: "pointer", marginLeft: 8, fontSize: 18, lineHeight: 1 }}>×</button>
    </div>
  );
}

export default function MusicDashboard() {
  const [active, setActive] = useState("create-music");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout } = useContext(userContext);

  const navigate = useNavigate();

  const [toast, setToast] = useState(null);
  const [submissions, setSubmissions] = useState({ music: [], albums: [] });
  const imageRef = useRef();
  const musicRef = useRef();

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }


  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };



  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: "rgba(139,92,246,0.08)", border: "1.5px solid rgba(139,92,246,0.25)",
    color: "#f3e8ff", borderRadius: 10, padding: "10px 14px", fontSize: 15,
    outline: "none", transition: "border 0.2s",
  };

  const btnStyle = {
    width: "100%", padding: "13px", background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700,
    cursor: "pointer", letterSpacing: "0.02em", transition: "opacity 0.2s, transform 0.15s",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0a1e; }
        @keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
        .nav-item:hover { background: rgba(139,92,246,0.15) !important; }
        .nav-item.active { background: rgba(139,92,246,0.25) !important; border-left: 3px solid #a78bfa !important; }
        .submit-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .submit-btn:active { transform: scale(0.98); }
        .upload-zone:hover { border-color: #a78bfa !important; background: rgba(139,92,246,0.12) !important; }
        input[type="text"]:focus { border-color: #a78bfa !important; box-shadow: 0 0 0 3px rgba(167,139,250,0.15); }
        textarea:focus { border-color: #a78bfa !important; box-shadow: 0 0 0 3px rgba(167,139,250,0.15); }
        .card-item { animation: fadeIn 0.3s ease both; }
        .card-item:hover { border-color: rgba(139,92,246,0.5) !important; }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); transition: transform 0.3s ease; position: fixed !important; z-index: 100; }
          .sidebar.open { transform: translateX(0); }
          .main-content { margin-left: 0 !important; }
          .overlay { display: block !important; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#0f0a1e", fontFamily: "'DM Sans', sans-serif" }}>

        {/* Overlay (mobile) */}
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            display: "none", position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)", zIndex: 99,
            ...(sidebarOpen ? {} : { pointerEvents: "none", opacity: 0 })
          }}
        />

        {/* Sidebar */}

        <Sidebar setActive={setActive} user={user} submissions={submissions} active={active} SIDEBAR_ITEMS={SIDEBAR_ITEMS} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Main */}
        <main className="main-content" style={{ flex: 1, marginLeft: 250, minHeight: "100vh", overflowY: "auto" }}>
          {/* Header */}
          <header style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 32px", borderBottom: "1px solid rgba(139,92,246,0.1)",
            background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)",
            position: "sticky", top: 0, zIndex: 50,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ display: "none", background: "none", border: "none", color: "#a78bfa", fontSize: 24, cursor: "pointer", padding: 4 }}
                className="hamburger"
                aria-label="Toggle sidebar"
              >☰</button>
              <div>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#f3e8ff" }}>
                  {active === "create-music" ? "Create Music" : "Create Album"}
                </h1>
                <p style={{ fontSize: 13, color: "#7c3aed", marginTop: 2 }}>
                  {active === "create-music" ? "Upload your track to the library" : "Bundle your tracks into an album"}
                </p>
              </div>
            </div>
            <div className="text-white flex gap-5 items-center justify-center">
              <h1>
                {user.username}
              </h1>
              <button
                onClick={handleLogout}
                title="Logout"
                className="flex items-center gap-1.5 !px-4 !py-2  text-sm font-semibold text-white bg-red-700 hover:bg-red-600 rounded-full transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>

          </header>

          <div style={{ padding: "32px 32px" }}>
            {active === "create-music" && (
              // Create Music 
              <CreateMusic InputField={InputField} showToast={showToast} setSubmissions={setSubmissions} btnStyle={btnStyle} inputStyle={inputStyle} imageRef={imageRef} musicRef={musicRef} submissions={submissions} />

            )}

            {active === "create-album" && (
              <CreateAlbum inputStyle={inputStyle} showToast={showToast} btnStyle={btnStyle} setSubmissions={setSubmissions} submissions={submissions} InputField={InputField} active={active} setActive={setActive} />
            )}
          </div>
        </main>
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* Mobile responsive styles via JSX */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger { display: block !important; }
          .overlay { display: block !important; opacity: ${sidebarOpen ? "1" : "0"}; pointer-events: ${sidebarOpen ? "all" : "none"}; transition: opacity 0.3s; }
        }
        @media (max-width: 600px) {
          .grid-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}