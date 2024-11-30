import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import audioFile from "../Assest/music.mp3"; // Replace with your audio file path

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 30px;
  text-align: center;

  span:first-child {
    color: #4A90E2;
  }

  span:last-child {
    color: #F5A623;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 40px;
  justify-content: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const AudioSection = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin-top:7%;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const VideoSection = styled.div`
  width: 100%;
  max-width: 600px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const AudioContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f8f8f8;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
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
  margin-right: 20px;

  &:hover {
    background: #555;
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin-right: 10px;
  }
`;

const WaveContainer = styled.div`
  flex-grow: 1;
  height: 120px;

  @media (max-width: 768px) {
    height: 100px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const Footer = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const FooterText = styled.p`
  color: #636e72;
  font-size: 1rem;
`;

const PodcastPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const waveSurferRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize WaveSurfer
    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#999",
      progressColor: "black",
      cursorColor: "#333",
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
      
      <ContentContainer>
        <AudioSection>
          <AudioContainer>
            <PlayPauseButton onClick={togglePlay}>
              {isPlaying ? <Pause size={48} /> : <Play size={48} />}
            </PlayPauseButton>
            <WaveContainer ref={containerRef}></WaveContainer>
          </AudioContainer>
        </AudioSection>

        <VideoSection>
          <VideoContainer>
            <VideoIframe
              src="https://www.youtube.com/embed/056qll-07ak"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Podcast Video"
            />
          </VideoContainer>
        </VideoSection>
      </ContentContainer>

      <Footer>
        <FooterText>Enjoy the podcast and video content!</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default PodcastPlayer;