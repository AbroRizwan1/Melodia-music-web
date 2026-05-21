import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

const AlbumList = ({ submissions, onDelete, onEdit, handleAlbumSubmit, albums, }) => {


    return (
        <div>
            <h2 className="ca-section-title">Your Albums</h2>

            {albums.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-600">
                    <span className="text-4xl mb-3">💿</span>
                    <p className="text-sm">No albums yet. Create your first!</p>
                </div>
            ) : (
                <div className="overflow-y-auto max-h-[520px] pr-1 flex flex-col gap-2"
                    style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(79,70,229,0.3) transparent" }}
                >
                    <style>{`
                    .album-list-wrap::-webkit-scrollbar { width: 4px; }
                    .album-list-wrap::-webkit-scrollbar-track { background: transparent; }
                    .album-list-wrap::-webkit-scrollbar-thumb { background: rgba(79,70,229,0.3); border-radius: 99px; }
                    .album-list-wrap::-webkit-scrollbar-thumb:hover { background: rgba(79,70,229,0.55); }

                    .album-action-btn { opacity: 0; transition: opacity 0.15s; }
                    .ca-album-card:hover .album-action-btn { opacity: 1; }
                `}</style>

                    {albums.map((a, i) => (
                        <div
                            key={i}
                            className="ca-album-card album-list-wrap"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            {/* Top row: icon + info + action buttons */}
                            <div className="flex items-center gap-3 mb-2.5">
                                <div className="w-11 h-11 rounded-lg flex-shrink-0 flex  items-center justify-center text-xl"
                                    style={{ background: "rgba(79,70,229,0.2)" }}>
                                    💿
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-purple-100 text-sm truncate">
                                        {a.title}
                                    </div>
                                    <div className="text-[11px] font-semibold mt-0.5  tracking-wide"
                                        style={{ color: "#4f46e5" }}>
                                        {a.artist?.username}
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="album-action-btn flex items-center gap-1.5 flex-shrink-0">
                                    {/* Edit */}
                                    <button
                                        onClick={() => onEdit?.(a)}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center
                                        bg-indigo-500/10 hover:bg-indigo-500/25
                                        text-indigo-400 hover:text-indigo-300
                                        transition-colors"
                                        title="Edit"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>

                                    {/* Delete */}
                                    <button
                                        type='button'
                                        onClick={() => onDelete?.(a._id || a.id)}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center
                                        bg-red-500/10 hover:bg-red-500/25
                                        text-red-400 hover:text-red-300
                                        transition-colors"
                                        title="Delete"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Track count */}
                            <div className="text-[11px]  text-gray-600 mb-2.5">
                                {a.musics.length} track{a.musics.length !== 1 ? "s" : ""}
                            </div>


                            {/* Track pills */}
                            <div className="flex flex-wrap gap-1.5">
                                {a.musics.map((track, index) => (
                                    <span
                                        key={index}
                                        className="flex !py-1 !px-2  items-center gap-1 text-[11px] text-purple-300 rounded-full"
                                        style={{
                                            background: "rgba(124,58,237,0.15)",
                                            border: "1px solid rgba(124,58,237,0.25)",
                                        }}
                                    >
                                        {track.image && (
                                            <img
                                                src={track.image}
                                                alt=""
                                                className="w-3.5 h-3.5 rounded-sm object-cover"
                                            />
                                        )}
                                        {track.title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AlbumList
