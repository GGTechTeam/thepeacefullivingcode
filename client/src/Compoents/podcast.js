import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import audioFile from "../Assest/music.mp3"; // Replace with your audio file path

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 100%; /* Ensure the container takes full width */
  min-width: 900px; /* Enforce a minimum width */
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 40px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f8f8f8;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
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

const PlayPauseButton = styled.button`
  background: #333;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  color: #fff;
  margin-right: 30px;

  &:hover {
    background: #555;
  }
`;

const WaveContainer = styled.div`
  flex-grow: 1;
  width: 80%;
  height: 120px;
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
      <Container>
        <PlayPauseButton onClick={togglePlay}>
          {isPlaying ? <Pause size={48} /> : <Play size={48} />}
        </PlayPauseButton>
        <WaveContainer ref={containerRef}></WaveContainer>
      </Container>
      <Footer>
        <FooterText>Enjoy the podcast!</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default AudioPlayer;
