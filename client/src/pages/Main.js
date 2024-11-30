import React from 'react';
import Nav from '../Compoents/Nav';
import Home from '../Compoents/Home';
// import Box from '../Compoents/Box';
import Offer from '../Compoents/Offer';
import TakeCourse from '../Compoents/TakeCourse';
// import Certified from '../Compoents/Certified';
import Levels from '../Compoents/Levels';
import Footer from '../Compoents/Footer';
import Pricing from '../Compoents/Pricing';
import For from '../Compoents/Whoisfor';
import Notfor from '../Compoents/Notfor';
import Faq from '../Compoents/Faq';
import AudioPlayer from '../Compoents/podcast';

const Main = () => {
  const videoUrl = 'https://youtu.be/056qll-07ak?si=nPae2c4A5iaYHgEt';
  const videoId = videoUrl.split('/').pop().split('?')[0];

  const audioPath = 'Freelancer-k\\client\\src\\Assest\\music.mp3';

  return (
    <>
      <Nav />
      <Home />
       <AudioPlayer/>
    
      <Levels />
      <Offer />
      <TakeCourse />

      <Pricing />
      <For />
      <Notfor />
      <Faq />
    
      <Footer />
   
    </>
  );
};

export default Main;
