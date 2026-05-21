import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AlbumList from './AlbumList';
import { useAlbum } from '../Features/Album/UseAlbum';
import { useMusic } from '../Features/Music/UseMusic';


const initialAlbumForm = { title: "", musics: [] };

const CreateAlbum = ({ setActive, InputField, inputStyle, submissions, setSubmissions, btnStyle, showToast }) => {


    const { albumForm,
        setAlbumForm,
        albumErrors,
        setAlbumErrors,
        albums,
        editAlbum,
        toggleId,
        handleAlbumSubmit,
        handleDelete,
        handleEdit, } = useAlbum(initialAlbumForm, showToast)

    const allMusics = albums.flatMap((album) => album.musics || []);


    const { music } = useMusic()



    return (
        <div>
            <style>{`
                @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

                .create-album-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 28px;
                    max-width: 900px;
                }
                @media (max-width: 768px) {
                    .create-album-grid { grid-template-columns: 1fr; gap: 20px; max-width: 100%; }
                }

                .ca-form-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(79,70,229,0.25);
                    border-radius: 18px;
                    padding: 28px;
                    backdrop-filter: blur(12px);
                }
                @media (max-width: 480px) {
                    .ca-form-card { padding: 18px; border-radius: 14px; }
                }

                .ca-section-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 16px; font-weight: 700;
                    color: #9ca3af; margin-bottom: 16px;
                    text-transform: uppercase; letter-spacing: 0.06em;
                }
                @media (max-width: 480px) { .ca-section-title { font-size: 13px; } }

                .ca-album-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(79,70,229,0.18);
                    border-radius: 14px; padding: 16px; margin-bottom: 12px;
                    transition: border-color 0.2s;
                }
                .ca-album-card:hover { border-color: rgba(79,70,229,0.45); }
                @media (max-width: 480px) { .ca-album-card { padding: 12px; } }

                /* Track checkbox rows */
                .ca-track-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 12px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background 0.15s;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    user-select: none;
                }
                .ca-track-row:last-child { border-bottom: none; }
                .ca-track-row:hover { background: rgba(124,58,237,0.07); }
                .ca-track-row.selected { background: rgba(124,58,237,0.12); }

                .ca-checkbox {
                    width: 20px; height: 20px; flex-shrink: 0;
                    border-radius: 6px;
                    border: 2px solid rgba(139,92,246,0.35);
                    background: transparent;
                    display: flex; align-items: center; justify-content: center;
                    transition: border-color 0.15s, background 0.15s;
                }
                .ca-track-row.selected .ca-checkbox {
                    background: #7c3aed;
                    border-color: #7c3aed;
                }

                .ca-track-thumb {
                    width: 38px; height: 38px; border-radius: 8px;
                    object-fit: cover; flex-shrink: 0;
                }
                .ca-track-thumb-placeholder {
                    width: 38px; height: 38px; border-radius: 8px; flex-shrink: 0;
                    background: rgba(79,70,229,0.2);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 16px;
                }

                .ca-track-info { flex: 1; min-width: 0; }
                .ca-track-title {
                    font-weight: 600; color: #e9d5ff; font-size: 14px;
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .ca-track-id {
                    font-size: 10px; color: #7c3aed; font-weight: 600;
                    letter-spacing: 0.06em; margin-top: 2px;
                    font-family: monospace;
                }

                .ca-selected-badge {
                    font-size: 11px; font-weight: 600;
                    background: rgba(124,58,237,0.2);
                    color: #a78bfa;
                    padding: 2px 10px; border-radius: 20px;
                    border: 1px solid rgba(124,58,237,0.3);
                    white-space: nowrap;
                }

                .ca-error-box {
                    background: rgba(239,68,68,0.08);
                    border-radius: 10px; padding: 10px 14px; margin-bottom: 16px;
                    border: 1px solid rgba(239,68,68,0.15);
                    font-size: 12px; color: #f87171; margin-top: 0;
                }

                .ca-tracklist-container {
                    border: 1px solid rgba(139,92,246,0.2);
                    border-radius: 12px; overflow: hidden;
                    max-height: 280px; overflow-y: auto;
                }
                .ca-tracklist-container.error { border-color: #f87171; }
            `}</style>

            <div style={{ animation: "fadeIn 0.3s ease" }}>
                <div className="create-album-grid">

                    {/* ── LEFT: Form ── */}
                    <div className="ca-form-card">
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#c7d2fe", marginBottom: 22 }}>
                            Album Details
                        </h2>

                        {/* Title */}
                        <InputField label="Album Title" error={albumErrors.title}>
                            <input
                                type="text"
                                placeholder="e.g. Echoes of Night"
                                value={albumForm.title}
                                onChange={e => {
                                    setAlbumForm(f => ({ ...f, title: e.target.value }));
                                    setAlbumErrors(err => ({ ...err, title: "" }));
                                }}
                                style={{
                                    ...inputStyle,
                                    borderColor: albumErrors.title ? "#f87171" : "rgba(139,92,246,0.25)",
                                    width: "100%", boxSizing: "border-box",
                                }}
                            />
                        </InputField>

                        {/* Track Picker with Checkboxes */}
                        <div style={{ marginBottom: 18 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                                    Select Tracks *
                                </label>
                                {albumForm.musics.length > 0 && (
                                    <span className="ca-selected-badge">
                                        {albumForm.musics.length} selected
                                    </span>
                                )}
                            </div>

                            {music.length === 0 ? (<p className="ca-error-box" style={{ marginBottom: 0 }}>
                                ⚠️ No tracks yet. Go to "Create Music" first to upload tracks.
                            </p>) : (<div className={`ca-tracklist-container${albumErrors.musicIds ? " error" : ""}`}>
                                {music.map((m, index) => {
                                    const isSelected = albumForm.musics.includes(m._id);

                                    return (
                                        <div

                                            key={index}
                                            className={`ca-track-row${isSelected ? " selected" : ""}`}
                                            onClick={() => toggleId(m._id)}
                                        >

                                            {/* Checkbox */}
                                            <div className="ca-checkbox">
                                                {isSelected && (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                        stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                )}
                                            </div>

                                            {/* Thumbnail */}
                                            {m.image
                                                ? <img src={m.image} alt={m.title} className="ca-track-thumb" />
                                                : <div className="ca-track-thumb-placeholder">🎵</div>
                                            }

                                            {/* Info */}
                                            <div className="ca-track-info">
                                                <div className="ca-track-title">{m.title}</div>
                                                <div className="ca-track-id">{m.artist?.username}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            )}


                            {albumErrors.musicIds && (
                                <p style={{ color: "#f87171", fontSize: 12, marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
                                    <span>⚠</span> {albumErrors.musicIds}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            className="submit-btn"
                            onClick={handleAlbumSubmit}
                            style={{
                                ...btnStyle,
                                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                                width: "100%", boxSizing: "border-box",
                            }}
                        >
                            {editAlbum ? ("update Album") : ("Add Album")}
                        </button>
                    </div>

                    {/* ── RIGHT: Albums List ── */}
                    <AlbumList
                        albums={albums}
                        submissions={submissions}
                        onEdit={(album) => handleEdit(album)}
                        onDelete={(id) => handleDelete(id)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateAlbum;