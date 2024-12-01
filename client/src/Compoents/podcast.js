import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Music, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';

import audioFile1 from '../Assest/music.mp3';
import audioFile2 from '../Assest/music.mp3';
import audioFile3 from '../Assest/music.mp3';
import audioFile4 from '../Assest/music.mp3';
import audioFile5 from '../Assest/music.mp3';

const PodcastPlayer = () => {
  const [selectedPodcastIndex, setSelectedPodcastIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const waveSurferRef = useRef(null);
  const containerRef = useRef(null);

  const podcastData = [
    {
      id: 1,
      title: "Startup Insights",
      subtitle: "Entrepreneurship Podcast",
      audioFile: audioFile1,
      category: "Entrepreneurship",
      duration: "42:35",
      description: "Deep dive into startup ecosystem and entrepreneurial strategies."
    },
    {
      id: 2,
      title: "Tech Trends 2024",
      subtitle: "Technology & Innovation",
      audioFile: audioFile2,
      category: "Technology",
      duration: "55:12",
      description: "Exploring cutting-edge technological innovations and future predictions."
    },
    {
      id: 3,
      title: "Digital Marketing Secrets",
      subtitle: "Marketing Strategy",
      audioFile: audioFile3,
      category: "Marketing",
      duration: "38:47",
      description: "Insider tips and strategies for digital marketing success."
    },
    {
      id: 4,
      title: "AI and Future",
      subtitle: "Technology Exploration",
      audioFile: audioFile4,
      category: "AI",
      duration: "51:23",
      description: "Comprehensive analysis of artificial intelligence's impact on society."
    },
    {
      id: 5,
      title: "Sustainable Innovation",
      subtitle: "Environmental Tech",
      audioFile: audioFile5,
      category: "Environment",
      duration: "47:56",
      description: "Innovative solutions for environmental challenges and sustainability."
    }
    
  ];

  const selectedPodcast = podcastData[selectedPodcastIndex];

  const togglePlay = () => {
    if (waveSurferRef.current) {
      if (isPlaying) {
        waveSurferRef.current.pause();
      } else {
        waveSurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    const newIndex = selectedPodcastIndex > 0 
      ? selectedPodcastIndex - 1 
      : podcastData.length - 1;
    
    setSelectedPodcastIndex(newIndex);
    setIsPlaying(false);
  };

  const handleNext = () => {
    const newIndex = (selectedPodcastIndex + 1) % podcastData.length;
    
    setSelectedPodcastIndex(newIndex);
    setIsPlaying(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (waveSurferRef.current) {
      waveSurferRef.current.setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (waveSurferRef.current) {
      const currentVolume = waveSurferRef.current.getVolume();
      if (currentVolume > 0) {
        waveSurferRef.current.setVolume(0);
        setVolume(0);
      } else {
        waveSurferRef.current.setVolume(0.5);
        setVolume(0.5);
      }
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      // Destroy existing wavesurfer instance if it exists
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }

      // Create new wavesurfer instance
      const waveSurfer = WaveSurfer.create({
        container: containerRef.current,
        waveColor: 'rgba(74, 144, 226, 0.3)',
        progressColor: '#4a90e2',
        responsive: true,
        height: 80,
        barWidth: 2,
        barRadius: 3,
      });

      // Load selected podcast audio
      waveSurfer.load(selectedPodcast.audioFile);
      
      // Set volume
      waveSurfer.setVolume(volume);

      // Play if previously playing
      if (isPlaying) {
        waveSurfer.play();
      }

      // Store reference
      waveSurferRef.current = waveSurfer;

      // Cleanup
      return () => {
        waveSurfer.destroy();
      };
    }
  }, [selectedPodcastIndex]);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: '20px',
    },
    header: {
      backgroundColor: '#4a90e2',
      color: 'white',
      padding: '15px',
      textAlign: 'center',
      borderRadius: '10px 10px 0 0',
      marginBottom: '20px',
    },
    content: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
    },
    podcastList: {
      flex: '1 1 300px',
      maxHeight: '700px',
      overflowY: 'auto',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      overflowY:'auto'
    },
    podcastItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      margin: '5px 0',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeItem: {
      backgroundColor: '#e6f2ff',
      transform: 'scale(1.02)',
    },
    playerContainer: {
      flex: '2 1 500px',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
    audioControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    controlButton: {
      background: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    volumeControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    videoContainer: {
      width: '100%',
      borderRadius: '10px',
      overflow: 'hidden',
      marginTop: '20px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
    videoIframe: {
      width: '100%',
      height: '400px',
      border: 'none',
    }
  };

  const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  
  span:first-child {
    color: #4A90E2;
  }
  
  span:last-child {
    color: #F5A623;
  }
`;

  return (
    <div style={styles.container}>
      <Title>
        <span>Podcast for </span> <span> You</span>
      </Title>
      
      <div style={styles.content}>
        {/* Podcast List */}
        <div style={styles.podcastList}>
          <h2>Podcast Library</h2>
          {podcastData.map((podcast, index) => (
            <div 
              key={podcast.id}
              style={{
                ...styles.podcastItem,
                ...(selectedPodcastIndex === index ? styles.activeItem : {})
              }}
              onClick={() => {
                setSelectedPodcastIndex(index);
                setIsPlaying(false);
              }}
            >
              <Music style={{ marginRight: '10px', color: '#4a90e2' }} />
              <div>
                <h3 style={{ margin: 0 }}>{podcast.title}</h3>
                <p style={{ margin: 0, color: 'gray', fontSize: '0.8em' }}>
                  {podcast.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Player Container */}
        <div style={styles.playerContainer}>
          <h2>{selectedPodcast.title}</h2>
          <p style={{ color: 'gray' }}>{selectedPodcast.description}</p>
          
          {/* Audio Controls */}
          <div style={styles.audioControls}>
            <button 
              style={styles.controlButton} 
              onClick={handlePrevious}
            >
              <SkipBack />
            </button>

            <button 
              style={styles.controlButton} 
              onClick={togglePlay}
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>

            <button 
              style={styles.controlButton} 
              onClick={handleNext}
            >
              <SkipForward />
            </button>

            {/* Volume Control */}
            <div style={styles.volumeControl}>
              <div onClick={toggleMute} style={{cursor: 'pointer'}}>
                {volume === 0 ? <VolumeX /> : <Volume2 />}
              </div>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>

          {/* Waveform */}
          <div ref={containerRef} style={{ width: '100%', height: '80px' }}></div>

          {/* Video Section */}
          <div style={styles.videoContainer}>
            <iframe
              src="https://www.youtube.com/embed/YRJ6xoiRcpQ"
              style={styles.videoIframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Podcast Related Video"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;