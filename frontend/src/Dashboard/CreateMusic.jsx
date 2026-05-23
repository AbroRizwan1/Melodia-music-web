import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MusicList from './MusicList';
import { useMusic } from "../Features/Music/UseMusic";

const initialMusicForm = { title: "", image: null, imagePreview: "", music: null, musicName: "" };

const CreateMusic = ({ InputField, setSubmissions, showToast, inputStyle, imageRef, musicRef, btnStyle, submissions }) => {


    const {
        musicForm,
        setMusicForm,
        musicErrors,
        setMusicErrors,
        editMusic,
        music,
        isUploading,
        handleImageChange,
        handleMusicFileChange,
        handleMusicSubmit,
        handleEdit,
        handleDelete,
    } = useMusic(initialMusicForm, showToast);




    return (
        <div>
            {/* Inject responsive styles */}
            <style>{`
                .create-music-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 28px;
                    max-width: 900px;
                }

                @media (max-width: 768px) {
                    .create-music-grid {
                        grid-template-columns: 1fr;
                        gap: 20px;
                        max-width: 100%;
                    }
                }

                .create-music-form-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(139,92,246,0.18);
                    border-radius: 18px;
                    padding: 28px;
                    backdrop-filter: blur(12px);
                }

                @media (max-width: 480px) {
                    .create-music-form-card {
                        padding: 18px;
                        border-radius: 14px;
                    }
                }

                .create-music-upload-zone {
                    border-radius: 12px;
                    padding: 18px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: rgba(139,92,246,0.04);
                }

                @media (max-width: 480px) {
                    .create-music-upload-zone {
                        padding: 14px;
                    }
                }

                .create-music-track-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(139,92,246,0.15);
                    border-radius: 14px;
                    padding: 14px 16px;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    transition: border-color 0.2s;
                }

                @media (max-width: 480px) {
                    .create-music-track-card {
                        padding: 12px;
                        gap: 10px;
                    }
                }

                .create-music-section-title {
                    font-family: "'Syne', sans-serif";
                    font-size: 16px;
                    font-weight: 700;
                    color: #9ca3af;
                    margin-bottom: 16px;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                }

                @media (max-width: 480px) {
                    .create-music-section-title {
                        font-size: 13px;
                    }
                }
            `}</style>

            <div style={{ animation: "fadeIn 0.3s ease" }}>
                <div className="create-music-grid">
                    {/* Form Card */}
                    <div className="create-music-form-card">
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#e9d5ff", marginBottom: 22 }}>
                            Track Details
                        </h2>

                        <InputField label="Track Title" error={musicErrors.title}>
                            <input
                                type="text"
                                placeholder="e.g. Midnight Drive"
                                value={musicForm.title}
                                onChange={e => {
                                    setMusicForm(f => ({ ...f, title: e.target.value })); setMusicErrors(err => ({ ...err, title: "" }));
                                }}
                                style={{ ...inputStyle, borderColor: musicErrors.title ? "#f87171" : "rgba(139,92,246,0.25)", width: "100%", boxSizing: "border-box" }}
                            />
                        </InputField>

                        <InputField label="Cover Image" error={musicErrors.image}>
                            <div
                                className="create-music-upload-zone upload-zone"
                                onClick={() => imageRef.current.click()}
                                style={{ border: `2px dashed ${musicErrors.image ? "#f87171" : "rgba(139,92,246,0.3)"}` }}
                            >
                                {musicForm.imagePreview
                                    ? <img src={musicForm.imagePreview} alt="cover" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, margin: "0 auto" }} />
                                    : <>
                                        <div style={{ fontSize: 28, marginBottom: 6 }}>🖼️</div>
                                        <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>Click to upload cover image</p>
                                        <p style={{ color: "#6b7280", fontSize: 11, marginTop: 3, marginBottom: 0 }}>PNG, JPG, WEBP</p>
                                    </>
                                }
                            </div>
                            <input ref={imageRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
                        </InputField>

                        <InputField label="Music File" error={musicErrors.music}>
                            <div
                                className="create-music-upload-zone upload-zone"
                                onClick={() => musicRef.current.click()}
                                style={{ border: `2px dashed ${musicErrors.music ? "#f87171" : "rgba(139,92,246,0.3)"}` }}
                            >
                                <div style={{ fontSize: 28, marginBottom: 6 }}>🎵</div>
                                {musicForm.musicName
                                    ? <p style={{ color: "#c4b5fd", fontSize: 13, fontWeight: 500, margin: 0, wordBreak: "break-all" }}>{musicForm.musicName}</p>
                                    : <>
                                        <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>Click to upload audio file</p>
                                        <p style={{ color: "#6b7280", fontSize: 11, marginTop: 3, marginBottom: 0 }}>MP3, WAV, FLAC, OGG</p>
                                    </>
                                }
                            </div>
                            <input ref={musicRef} type="file" accept="audio/*" style={{ display: "none" }} onChange={handleMusicFileChange} />
                        </InputField>

                        <button disabled={isUploading} className="submit-btn" onClick={handleMusicSubmit} style={{ ...btnStyle, width: "100%", boxSizing: "border-box" }}>
                            {editMusic ? "Update Music" : "Add Music"}
                        </button>
                    </div>

                    {/* Tracks List */}

                    <MusicList
                        music={music}
                        onEdit={(track) => handleEdit(track)}
                        onDelete={(id) => handleDelete(id)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateMusic