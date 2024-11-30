import React from 'react';
import Nav from '../Compoents/Nav';
import Home from '../Compoents/Home';
// import Box from '../Compoents/Box';
import Offer from '../Compoents/Offer';
import TakeCourse from '../Compoents/TakeCourse';
// import Certified from '../Compoents/Certified';
import Levels from '../Compoents/Levels';
import Experience from '../Compoents/Experience';
import Footer from '../Compoents/Footer';
import Pricing from '../Compoents/Pricing';
import For from '../Compoents/Whoisfor';
import Notfor from '../Compoents/Notfor';
import Faq from '../Compoents/Faq';
import AudioPlayer from '../Compoents/podcast';
import YouTubePlayer from '../Compoents/Youtube';

const Main = () => {
  const videoUrl = 'https://youtu.be/056qll-07ak?si=nPae2c4A5iaYHgEt';
  const videoId = videoUrl.split('/').pop().split('?')[0];

  const audioPath = 'Freelancer-k\\client\\src\\Assest\\music.mp3';

  return (
    <>
      <Nav />
      <Home />
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '20px 0' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <AudioPlayer />
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          <YouTubePlayer videoId={videoId} />
        </div>
      </div>
      {/* <Box/> */}
      <Levels />
      <Offer />
      <TakeCourse />
      {/* <Certified/> */}
      <Pricing />
      <For />
      <Notfor />
      <Faq />
      {/* <Experience/> */}
      <Footer />
      {/* <SignUp/>
      <Login/>
      <Dashboard/> */}
    </>
  );
};

export default Main;
