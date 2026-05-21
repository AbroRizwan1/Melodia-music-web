import React, { useState } from "react";

const MusicCard = ({ title, artist, id, image, isPlaying, onPlay }) => {
    const [liked, setLiked] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="rounded-2xl overflow-hidden border border-black/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #547A95, #2C3947)" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* IMAGE AREA */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={image || "https://via.placeholder.com/300"}
                    alt={title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`}
                />

                {/* Dark overlay on hover */}
                <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${hovered ? "opacity-40" : "opacity-0"}`}
                />

                {/* Play button — appears on hover */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
                        }`}
                >
                    <button
                        onClick={() => onPlay(id)}
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-transform duration-150"
                        style={{ backgroundColor: "#C2A56D" }}
                    >
                        {isPlaying ? (
                            /* Pause icon */
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="6" y="5" width="4" height="14" rx="1" />
                                <rect x="14" y="5" width="4" height="14" rx="1" />
                            </svg>
                        ) : (
                            /* Play icon */
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Like button */}
                <button
                    onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                    className="absolute top-2 right-2 text-lg leading-none p-1 transition-transform duration-150 hover:scale-125"
                >
                    {liked ? "❤️" : "🤍"}
                </button>

                {/* Playing badge on image */}
                {isPlaying && (
                    <div
                        className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: "#C2A56D", color: "#2C3947" }}
                    >
                        {/* Animated equalizer bars */}
                        <span className="flex items-end gap-[2px] h-3">
                            {[1, 2, 3].map((i) => (
                                <span
                                    key={i}
                                    className="w-[3px] rounded-sm"
                                    style={{
                                        backgroundColor: "#2C3947",
                                        animation: `eq-bar 0.8s ease-in-out infinite alternate`,
                                        animationDelay: `${i * 0.15}s`,
                                        height: "100%",
                                    }}
                                />
                            ))}
                        </span>
                        Playing
                    </div>
                )}
            </div>

            {/* INFO */}
            <div className="px-3 py-2.5">
                <h3
                    className="text-sm font-semibold truncate"
                    style={{ color: "#E8EDF2" }}
                >
                    {title}
                </h3>
                <p
                    className="text-xs truncate mt-0.5"
                    style={{ color: "rgba(232, 237, 242, 0.55)" }}
                >
                    {artist}
                </p>
            </div>

            {/* Keyframe styles */}
            <style>{`
        @keyframes wave-bar {
          0%   { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
        @keyframes eq-bar {
          0%   { transform: scaleY(0.2); }
          100% { transform: scaleY(1); }
        }
      `}</style>
        </div>
    );
};

export default MusicCard;