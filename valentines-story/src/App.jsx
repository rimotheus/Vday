import React, { useState, useEffect, useRef } from 'react';
import './index.css'
import './App.css'

const config = {
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/ddccukyyk/video/upload/v1770996985/SZA_-_Snooze_Audio_Sv5yCzPCkv8_wastk9.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};

export default function ValentinesStory() {
    const [currentState, setCurrentState] = useState(1);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (config.music.enabled && audioRef.current) {
            audioRef.current.volume = config.music.volume;
            
            setTimeout(() => {
                if (config.music.autoplay && currentState <= 2) {
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                setIsMusicPlaying(true);
                                console.log("Music autoplay successful");
                            })
                            .catch(error => {
                                console.log("Autoplay blocked by browser:", error);
                            });
                    }
                }
            }, 500);
        }
    }, []);

    // Stop music when leaving state 2
    useEffect(() => {
        if (currentState > 2 && audioRef.current) {
            audioRef.current.pause();
            setIsMusicPlaying(false);
        }
    }, [currentState]);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setIsMusicPlaying(true);
            } else {
                audioRef.current.pause();
                setIsMusicPlaying(false);
            }
        }
    };

    const handleStartStory = () => setCurrentState(2);
    const handleContinueComic = () => setCurrentState(3);
    const handleContinueVideo = () => setCurrentState(4);

    return (
        <>
            {/* GLOBAL AUDIO ELEMENT - PERSISTS ACROSS ALL STATES */}
            {config.music.enabled && (
                <audio 
                    ref={audioRef} 
                    src={config.music.musicUrl} 
                    loop 
                />
            )}

            {/* STATE 1 */}
            {currentState === 1 && (
                <div 
                    className="state-1-container"
                    style={{
                        backgroundImage: 'url(background.jpg)',
                    }}
                >
                    <button
                        onClick={toggleMusic}
                        className="music-button"
                    >
                        {isMusicPlaying ? config.music.stopText : config.music.startText}
                    </button>

                    <h1 className="title">Valentine's Day Story</h1>

                    <div className="characters-container">
                        <div className="character" id="mualani-char">
                            <img src="mualani.png" alt="Mualani" />
                        </div>

                        <div className="character" id="kinich-char">
                            <img src="kinich.png" alt="Kinich" />
                        </div>
                    </div>

                    <div className="button-container">
                        <button onClick={handleStartStory} className="start-button">
                            Start Story ❤️
                        </button>
                    </div>
                </div>
            )}

            {/* STATE 2: COMIC BOOK UI WITH IMAGES */}
            {currentState === 2 && (
                <div 
                    className="state-2-container"
                    style={{
                        backgroundImage: 'url(background1.webp)',
                    }}
                >
                    <button
                        onClick={toggleMusic}
                        className="music-button"
                    >
                        {isMusicPlaying ? config.music.stopText : config.music.startText}
                    </button>

                    <div className="comic-container">
                        {/* Panel 1: Paimon */}
                        <div className="panel panel-image">
                            <img src="paimon.png" alt="Paimon" className="panel-img" />
                            <p className="speech">Some tea is brewing, I feel it! ☕</p>
                        </div>

                        {/* Panel 2: Kinich */}
                        <div className="panel panel-image">
                            <img src="kinich1.png" alt="Kinich" className="panel-img" />
                            <p className="speech">I'm spending 10 hours looking at places to eat gahhh I'll settle for this!</p>
                        </div>

                        {/* Panel 3: Mualani */}
                        <div className="panel panel-image">
                            <img src="mualani1.png" alt="Mualani" className="panel-img" />
                            <p className="speech">Ahhh what do I wear for tonight? 👗</p>
                        </div>

                        {/* Panel 4: Paimon text */}
                        <div className="panel">
                            <img src="paimon.png" alt="Paimon" className="panel-img" />
                            <p className="text top-left">As the hours go by</p>
                            <p className="text bottom-right">both panicked...</p>
                        </div>

                        {/* Panel 5: Kinich */}
                        <div className="panel panel-image">
                            <img src="kinich.png" alt="Kinich" className="panel-img" />
                            <p className="speech">I'm ready... er nope I'm not ready 😅</p>
                        </div>

                        {/* Panel 6: Mualani */}
                        <div className="panel panel-image">
                            <img src="mualani.png" alt="Mualani" className="panel-img" />
                            <p className="speech">Hehe hehe hehe 💕</p>
                        </div>

                        {/* Panel 7: End */}
                        <div className="panel">
                            <p className="text bottom-right">TO BE CONTINUED... 📖</p>
                        </div>
                    </div>

                    <button onClick={handleContinueComic} className="comic-continue-button">
                        Continue <span className="arrow-icon">→</span>
                    </button>
                </div>
            )}

            {/* STATE 3: FIRST VIDEO (NO MUSIC) */}
            {currentState === 3 && (
                <div 
                    className="state-3-container"
                    style={{
                        backgroundImage: 'url(background1.webp)',
                    }}
                >
                    <div className="content-container">
                        <h1 className="video-title">It All Started With a Meal</h1>

                        <div className="video-container">
                            <iframe
                                src="https://www.youtube.com/embed/_zF_-CoqOFw?si=41oQQ4ROPw5ckE_5" 
                                title="Valentine's Story Part 1"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        <button onClick={handleContinueVideo} className="continue-button">
                            Continue <span className="arrow-icon">→</span>
                        </button>
                    </div>
                </div>
            )}

            {/* STATE 4: ANIMATED TRANSITION + SECOND VIDEO (NO MUSIC) */}
            {currentState === 4 && (
                <div 
                    className="state-4-container"
                    style={{
                        backgroundImage: 'url(background2.jpg)',
                    }}
                >
                    <div className="character-animation mualani-animation">
                        <img src="mualani.png" alt="Mualani" />
                    </div>
                    <div className="character-animation kinich-animation">
                        <img src="kinich.png" alt="Kinich" />
                    </div>

                    {/* Loading Bar */}
                    <div className="loading-bar-container">
                        <div className="loading-bar-fill"></div>
                    </div>

                    <div className="fade-in-content">
                        <h1 className="journey-title">Our Journey Continues</h1>

                        <div className="video-container">
                            <iframe
                                src="https://www.youtube.com/embed/MT2KQB0r950?si=ecpsv8z91asFq0HS"
                                title="Valentine's Story Part 2"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}