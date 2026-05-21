import React from 'react'

const Sidebar = ({ sidebarOpen, user, setSidebarOpen, SIDEBAR_ITEMS, active, setActive, submissions }) => {


    return (
        <div>
            <aside className={`sidebar${sidebarOpen ? " open" : ""}`} style={{
                width: 250, background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(139,92,246,0.15)",
                display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0,
                backdropFilter: "blur(12px)", padding: "24px 0",
            }}>
                {/* Logo */}
                <div style={{ padding: "0 24px 28px", borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎶</div>
                        <div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#f3e8ff" }}>SoundForge</div>
                            <div style={{ fontSize: 11, color: "#7c3aed", fontWeight: 600, letterSpacing: "0.08em" }}>STUDIO</div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ padding: "16px 12px", flex: 1 }}>
                    <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 12px", marginBottom: 10 }}>Create</p>
                    {SIDEBAR_ITEMS.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item${active === item.id ? " active" : ""}`}
                            onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                            style={{
                                width: "100%", textAlign: "left", background: "none", border: "none",
                                borderLeft: "3px solid transparent", borderRadius: "0 10px 10px 0",
                                padding: "11px 16px", cursor: "pointer", display: "flex", alignItems: "center",
                                gap: 12, color: active === item.id ? "#c4b5fd" : "#9ca3af",
                                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: active === item.id ? 600 : 400,
                                marginBottom: 4, transition: "all 0.15s",
                            }}
                        >
                            <span style={{ fontSize: 18 }}>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Stats */}
                <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(139,92,246,0.1)" }}>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10, fontWeight: 500 }}>Your Library</div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <div style={{ flex: 1, background: "rgba(124,58,237,0.12)", borderRadius: 10, padding: "10px", textAlign: "center" }}>
                            <div style={{ fontSize: 22, fontWeight: 700, color: "#a78bfa", fontFamily: "'Syne', sans-serif" }}>{submissions.music.length}</div>
                            <div style={{ fontSize: 11, color: "#6b7280" }}>Tracks</div>
                        </div>
                        <div style={{ flex: 1, background: "rgba(79,70,229,0.12)", borderRadius: 10, padding: "10px", textAlign: "center" }}>
                            <div style={{ fontSize: 22, fontWeight: 700, color: "#818cf8", fontFamily: "'Syne', sans-serif" }}>{submissions.albums.length}</div>
                            <div style={{ fontSize: 11, color: "#6b7280" }}>Albums</div>
                        </div>
                    </div>
                </div>
            </aside>

        </div>
    )
}

export default Sidebar
