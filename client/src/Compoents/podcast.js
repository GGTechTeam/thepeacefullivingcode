import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import audioFile from "../Assest/music.mp3"; // Replace with your audio file path
import YouTubePlayer from "./Youtube"; // Import YouTubePlayer component

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 
  width: 100%;
  max-width: 1200px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;

  span:first-child {
    color: #4A90E2;
  }

  span:last-child {
    color: #F5A623;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  max-width: 900px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Container = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 50%;
  max-width: 350px;
  background: #f8f8f8;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 15px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
  }
`;

const PlayPauseButton = styled.button`
  background: #333;
  border: none;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  color: #fff;
  margin-bottom: 20px;

  &:hover {
    background: #555;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const WaveContainer = styled.div`
  width: 100%;
  height: 120px;

  @media (max-width: 768px) {
    height: 100px;
  }
`;

const YouTubeContainer = styled.div`
  width: 90%;
  max-width: 600px;
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-width: 100%;
    padding: 0 10px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: #888;
`;

// Main Component
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const waveSurferRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#999",
      progressColor: "black",
      cursorColor: "#fff",
      barWidth: 2,
      barRadius: 2,
      height: 120,
      responsive: true,
      backend: "WebAudio",
    });

    waveSurferRef.current.load(audioFile);

    waveSurferRef.current.on("finish", () => {
      setIsPlaying(false);
    });

    return () => waveSurferRef.current.destroy();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      waveSurferRef.current.pause();
    } else {
      waveSurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <PageContainer>
      <Title>
        <span>Amazing</span> <span>Podcast</span>
      </Title>
      <SectionContainer>
        {/* Audio Player Section */}
        <Container>
          <PlayPauseButton onClick={togglePlay}>
            {isPlaying ? <Pause size={48} /> : <Play size={48} />}
          </PlayPauseButton>
          <WaveContainer ref={containerRef}></WaveContainer>
        </Container>

        {/* YouTube Video Section */}
        <YouTubeContainer>
          <YouTubePlayer videoId="056qll-07ak" /> {/* YouTube Video ID from the URL */}
        </YouTubeContainer>
      </SectionContainer>
      <Footer>
        <FooterText>Enjoy the podcast and video content!</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default AudioPlayer;
