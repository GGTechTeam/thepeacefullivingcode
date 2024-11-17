import React, { useState } from 'react';

const YouTubePlayer = ({ videoId }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="youtube-player">
            <style>
                {`
                    .youtube-player {
                        width: 100%;
                        max-width: 800px;
                        margin: 20px auto;
                        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                        border-radius: 12px;
                        padding: 20px;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    }

                    .video-container {
                        position: relative;
                        width: 100%;
                        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    }

                    .video-container iframe {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: none;
                    }

                    .video-title {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin: 15px 0;
                        color: #2d3436;
                    }

                    .video-description {
                        color: #636e72;
                        margin-bottom: 15px;
                        line-height: 1.5;
                    }
                `}
            </style>

            <div className="video-container">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube Video Player"
                />
            </div>
        </div>
    );
};

export default YouTubePlayer;
