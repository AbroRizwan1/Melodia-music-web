import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MusicList = ({ submissions, onDelete, onEdit, music }) => {

    return (
        <div className="flex flex-col h-full">

            {/* Header */}
            <h2 className="create-music-section-title mb-4">
                Uploaded Tracks
                {music?.length > 0 && (
                    <span className="ml-2 text-xs font-semibold text-violet-400/60 normal-case tracking-normal">
                        ({music?.length})
                    </span>
                )}
            </h2>

            {/* Scrollable list */}
            <div className="overflow-y-auto pr-1 flex-1 max-h-[520px]"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(139,92,246,0.3) transparent",
                }}
            >
                <style>{`
                .music-list-scroll::-webkit-scrollbar { width: 4px; }
                .music-list-scroll::-webkit-scrollbar-track { background: transparent; }
                .music-list-scroll::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 99px; }
                .music-list-scroll::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,0.55); }

                .music-action-btn { opacity: 0; transition: opacity 0.15s; }
                .music-track-card:hover .music-action-btn { opacity: 1; }
            `}</style>

                {music?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-600">
                        <span className="text-4xl mb-3">🎵</span>
                        <p className="text-sm">No tracks yet. Create your first!</p>
                    </div>
                ) : (
                    <div className="music-list-scroll overflow-y-auto max-h-[520px] pr-1 flex flex-col gap-2">
                        {music?.map((m, i) => (

                            <div
                                key={i}
                                className="music-track-card create-music-track-card card-item group"
                                style={{ animationDelay: `${i * 0.05}s` }}
                            >
                                {/* Thumbnail */}
                                {m.image
                                    ? <img
                                        src={m.image}
                                        alt={m.title}
                                        className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                                    />
                                    : <div className="w-11 h-11 rounded-lg flex-shrink-0 bg-violet-500/20 flex items-center justify-center text-xl">
                                        🎵
                                    </div>
                                }

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-purple-100 text-sm truncate">
                                        {m.title}
                                    </div>
                                    <div className="text-[11px] text-violet-500  font-semibold mt-0.5 tracking-wide">
                                        {m.artist?.username}
                                    </div>
                                    {m.musicName && (
                                        <div className="text-[10px] text-gray-600 mt-0.5 truncate">
                                            {m.musicName}
                                        </div>
                                    )}
                                </div>

                                {/* Action buttons */}
                                <div className="music-action-btn flex items-center gap-1.5 flex-shrink-0">
                                    {/* Edit */}
                                    <button
                                        onClick={() => onEdit?.(m)}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center
                                        bg-violet-500/10 hover:bg-violet-500/25
                                        text-violet-400 hover:text-violet-300
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
                                        onClick={() => onDelete?.(m._id || m.id)}
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MusicList
