import React, { useEffect, useState } from 'react'
import MusicCard from '../Component/MusicCards';
import AlbumCard from '../Component/AlbumCard';
import axios from 'axios';

const Home = ({ musicRef, albumRef }) => {

    const [music, setMusic] = useState([]);
    const [audio, setAudio] = useState(null);
    const [playingId, setPlayingId] = useState(null);
    const [albums, setAlbums] = useState([]);

    const handlePlay = (id) => {
        const song = music.find(m => m._id === id);
        if (!song?.uri) return;

        if (playingId === id) {
            audio?.pause();
            setPlayingId(null);
            return;
        }

        if (audio) audio.pause();

        const newAudio = new Audio(song.uri);
        newAudio.play();
        setAudio(newAudio);
        setPlayingId(id);
    };

    const fetchMusic = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/music/", { withCredentials: true });
            setMusic(res.data.musics || []);
        } catch (err) {
            console.log("ERROR:", err.response?.data || err.message);
        }
    };

    const fetchAlbum = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/albums", { withCredentials: true });
            setAlbums(res.data.album);
        } catch (err) {
            console.log(err.message || err.res?.data?.message);
        }
    };

    useEffect(() => {
        fetchMusic();
        fetchAlbum();
    }, []);


    // console.log(albums.musics);


    return (
        <div className="min-h-screen bg-[#E8EDF2] text-[#1a1a2e] font-sans px-4 sm:px-8 pb-16">

            {/* ── TRACKS SECTION ── */}
            <div ref={musicRef} className="flex items-end justify-between pt-12 pb-6 mb-7 border-b border-[#1a1a2e]/10">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C2A56D]">
                        Library
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-semibold text-[#1a1a2e] leading-none tracking-tight">
                        Tracks
                    </h1>
                    <div className="w-10 h-0.5 mt-2 rounded-full bg-gradient-to-r from-[#C2A56D] to-transparent" />
                </div>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {music.map((item) => (
                    <MusicCard
                        key={item._id || item.id}
                        id={item._id || item.id}
                        title={item.title}
                        artist={item.artist?.username}
                        image={item.image}
                        isPlaying={playingId === (item._id || item.id)}
                        onPlay={handlePlay}
                    />
                ))}
            </div>

            {/* ── ALBUMS SECTION ── */}
            <div className="mt-16" ref={albumRef} >
                <div className="flex items-end justify-between pt-12 pb-6 mb-7 border-b border-[#1a1a2e]/10">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C2A56D]">
                            Collections
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1a1a2e] leading-none tracking-tight">
                            Albums
                        </h1>
                        <div className="w-10 h-0.5 mt-2 rounded-full bg-gradient-to-r from-[#C2A56D] to-transparent" />
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {albums.map((album) => (
                        <AlbumCard key={album._id} album={album} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;