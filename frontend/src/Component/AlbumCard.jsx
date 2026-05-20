import axios from "axios";
import { useState, useRef, useEffect, useCallback } from "react";

export function AlbumCard({ album }) {
    const [currentIndex, setCurrentIndex] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const tracks = album.musics || [];
    const [currentSongId, setCurrentSongId] = useState(null);
    const [musics, setMusics] = useState([]);

    async function fetchAlbumID() {
        try {
            const res = await axios.get(`http://localhost:3000/api/albums/${album._id}`, {
                withCredentials: true,
            });
            setMusics(res.data.album.musics);
        } catch (err) {
            console.log(err.message || err.res?.data?.message);
        }
    }

    useEffect(() => {
        fetchAlbumID();
    }, []);

    function getSrc(track) {
        if (track.musicFile instanceof File) return URL.createObjectURL(track.musicFile);
        return track.musicUrl || null;
    }

    const loadTrack = useCallback((index) => {
        const audio = audioRef.current;
        if (!audio) return;
        const track = tracks[index];
        if (!track) return;
        const src = getSrc(track);
        if (!src) return;
        audio.src = src;
        audio.play();
        setCurrentIndex(index);
        setPlaying(true);
        setProgress(0);
        setCurrentTime(0);
    }, [tracks]);

    function playAll() {
        loadTrack(0);
    }

    function playTrack(e, song) {
        e.stopPropagation();
        if (!song.uri) return;

        if (currentSongId === song._id) {
            if (playing) {
                audioRef.current.pause();
                setPlaying(false);
            } else {
                audioRef.current.play();
                setPlaying(true);
            }
            return;
        }

        audioRef.current?.pause();
        audioRef.current = new Audio(song.uri);
        audioRef.current.play();
        setCurrentSongId(song._id);
        setPlaying(true);
    }

    function onTimeUpdate() {
        const a = audioRef.current;
        if (!a) return;
        setCurrentTime(a.currentTime);
        setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    }

    function onEnded() {
        const next = currentIndex + 1;
        if (next < tracks.length) loadTrack(next);
        else { setPlaying(false); setCurrentIndex(null); setProgress(0); }
    }

    function seek(e) {
        const a = audioRef.current;
        if (!a || !a.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        a.currentTime = ((e.clientX - rect.left) / rect.width) * a.duration;
    }

    function fmt(s) {
        if (!s || isNaN(s)) return "0:00";
        return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
    }

    const coverTracks = musics.slice(0, 4);

    return (
        <div
            className="rounded-[18px] overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg, #547A95, #2C3947)" }}
        >
            <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onEnded={onEnded} preload="metadata" />

            {/* Top: cover collage + header */}
            <div className="flex">

                {/* Collage */}
                <div className="w-[120px] h-[120px] flex-shrink-0 grid grid-cols-2 gap-[2px]"
                    style={{ background: "#2C3947" }}>
                    {[0, 1, 2, 3].map((idx) => {
                        const t = coverTracks[idx];
                        return (
                            <div key={idx} className="overflow-hidden flex items-center justify-center bg-[#2C3947]">
                                {t?.image
                                    ? <img src={t.image} alt="" className="w-full h-full object-cover block" />
                                    : <div className="w-full h-full" style={{ background: "linear-gradient(135deg, #547A95, #2C3947)" }} />
                                }
                            </div>
                        );
                    })}
                </div>

                {/* Header */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                        <div className="text-[#E8EDF2] font-semibold text-[17px] leading-tight mb-1 truncate">
                            {album.title}
                        </div>
                        <div className="text-[#C2A56D] text-xs font-medium mb-0.5">
                            {album.artist?.username}
                        </div>
                        <div className="text-[rgba(232,237,242,0.45)] text-[11px]">
                            {musics.length} track{musics.length !== 1 ? "s" : ""}
                        </div>
                    </div>

                    {/* Play all button */}
                    <button className="flex items-center gap-2 group w-fit" onClick={playAll}>
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-150 group-hover:scale-110"
                            style={{ backgroundColor: "#C2A56D" }}
                        >
                            {playing ? (
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="#2C3947">
                                    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                                </svg>
                            ) : (
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="#2C3947" style={{ marginLeft: 1 }}>
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                            )}
                        </div>
                        <span className="text-[11px] text-[rgba(232,237,242,0.55)] group-hover:text-[#C2A56D] transition-colors duration-150">
                            {playing ? "Playing" : "Play all"}
                        </span>
                    </button>
                </div>
            </div>


            {/* Track list */}
            <div className="border-t border-white/10">
                {musics.map((track, i) => {
                    const isActive = currentSongId === track._id;
                    return (
                        <div
                            key={i}
                            className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer border-b border-white/5 last:border-b-0 transition-colors duration-150
                ${isActive ? "bg-white/10" : "hover:bg-white/5"}`}
                            onClick={(e) => playTrack(e, track)}
                        >
                            {/* Track number / equalizer */}
                            <div className="w-3.5 flex-shrink-0 flex items-center justify-center">
                                {isActive && playing ? (
                                    <div className="flex items-end gap-[1.5px] h-3">
                                        {[1, 2, 3].map((b) => (
                                            <span
                                                key={b}
                                                className="w-[2px] rounded-sm inline-block"
                                                style={{
                                                    backgroundColor: "#C2A56D",
                                                    animation: `eq${b} 0.7s ease-in-out infinite`,
                                                    animationDelay: `${(b - 1) * 0.15}s`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-[10px] text-[rgba(232,237,242,0.35)] text-center">{i + 1}</span>
                                )}
                            </div>

                            {/* Track image */}
                            {track.image && (
                                <img
                                    src={track.image}
                                    alt=""
                                    className="w-7 h-7 rounded-md object-cover flex-shrink-0"
                                />
                            )}

                            {/* Track name */}
                            <span
                                className={`flex-1 text-xs font-medium truncate transition-colors duration-150
                  ${isActive ? "text-[#C2A56D]" : "text-[rgba(232,237,242,0.8)]"}`}
                            >
                                {track.title}
                            </span>


                            {/* Mini play/pause button */}
                            <button
                                className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                style={{ backgroundColor: "#C2A56D" }}
                                onClick={(e) => playTrack(e, track)}
                            >
                                {isActive && playing ? (
                                    <svg width="7" height="7" viewBox="0 0 24 24" fill="#2C3947">
                                        <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                                    </svg>
                                ) : (
                                    <svg width="7" height="7" viewBox="0 0 24 24" fill="#2C3947" style={{ marginLeft: 1 }}>
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Keyframe animations */}
            <style>{`
        @keyframes eq1 { 0%,100%{height:4px} 50%{height:10px} }
        @keyframes eq2 { 0%,100%{height:8px} 50%{height:3px} }
        @keyframes eq3 { 0%,100%{height:6px} 50%{height:12px} }
      `}</style>
        </div>
    );
}

export default AlbumCard;