import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoTranscriptBox from './videoTransBox';

function VideoComponent({ videoSrc, transcript, subtitleSrc }) {
     const [showTranscript, setShowTranscript] = useState(true);
     const videoRef = useRef(null);
     const [showQuiz, setShowQuiz] = useState(false);
     const playerRef = useRef(null);
     const quizOverlayRef = useRef(null);
     const quizAnswerRef = useRef(null);

     useEffect(() => {
          const player = videojs(videoRef.current, {
               controls: true,
               fluid: true,
               preferFullWindow: true,
               notSupportedMessage: "Media Source Error! please contact admin",
          });

          // player.on('timeupdate', () => {
          //      if (player.currentTime() >= 5 && !showQuiz) { // Show the quiz after 5 seconds and only once
          //           setShowQuiz(true);
          //           player.pause(); // Pause the video when the quiz appears
          //      }
          // });



          return () => {
               player.dispose();
          };
     }, [videoSrc, subtitleSrc]);



     useEffect(() => {
          const preventRightClick = (event) => {
               event.preventDefault();
          };
          window.addEventListener('contextmenu', preventRightClick);
          return () => {
               window.removeEventListener('contextmenu', preventRightClick);
          };
     }, []);

     /////////////////////// THIS IS FOR POP-UP QUIZ DURING VIDEO PLAYBACK ///////////////////////////////
     // const handleQuizClose = () => {
     //      setShowQuiz(false);
     //      playerRef.current.play(); // Resume the video after the quiz is closed
     // };

     // const submitQuiz = () => {
     //      const userAnswer = quizAnswerRef.current.value;
     //      if (userAnswer === '4') {
     //           alert('Correct! You got it right.');
     //      } else {
     //           alert('Incorrect. Try again.');
     //      }
     //      quizOverlayRef.current.style.display = 'none';
     // };
     ///////////////////////// END OF POP-UP QUIZ DURING VIDEO PLAYBACK //////////////////////////////

     return (
          <Box>
               <Box sx={{ width: '100%', paddingBottom: '56.25%', position: 'relative' }}>
                    <video
                         className="video-js vjs-default-skin vjs-big-play-centered"
                         src={videoSrc}
                         type="video/mp4"
                         disablePictureInPicture={0}
                         style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                         ref={videoRef}
                    >
                         <source src={videoSrc} type="video/mp4" />
                         <track
                              kind="captions"
                              src={subtitleSrc} // Use the provided subtitle source
                              srcLang="en"
                              label="English Subtitles"
                              default
                         />
                    </video>
                    {/* {showQuiz && (
                         <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} ref={quizOverlayRef}>
                              <div style={{ backgroundColor: 'white', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
                                   <h2>Popup Quiz</h2>
                                   <p>Question: What is 2 + 2?</p>
                                   <input type="text" ref={quizAnswerRef} />
                                   <Button onClick={submitQuiz}>Submit</Button>
                              </div>
                         </div>
                    )} */}
               </Box>
               <Box sx={{ p: 2, height: 'auto' }}>
                    <Typography variant="h5" component="h4" sx={{ pb: 1 }}>
                         Transcript
                    </Typography>
                    {showTranscript && <VideoTranscriptBox transcript={transcript} videoRef={videoRef} />}
               </Box>
          </Box>
     );
}

export default VideoComponent;