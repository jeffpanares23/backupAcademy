import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Video } from '@mui/material';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoTranscriptBox from './videoTransBox';



function VideoComponent({ videoSrc, transcript, subtitleSrc }) {
     const [showTranscript, setShowTranscript] = useState(true);
     const videoRef = useRef(null);

     const toggleTranscript = () => {
          setShowTranscript(!showTranscript);
     };

     useEffect(() => {
          const player = videojs(videoRef.current, {
               controls: true,
               fluid: true,
          });

          player.on('loadedmetadata', () => {
               const textTracks = player.textTracks();
               if (textTracks && textTracks.length > 0) {
                    const subtitleTrack = textTracks[0];
                    subtitleTrack.mode = 'showing'; // Display the subtitles

                    subtitleTrack.addEventListener('cuechange', () => {
                         const cues = subtitleTrack.activeCues;
                         if (cues && cues.length > 0) {
                              const cue = cues[0];
                              const subtitleElement = cue.getCueAsHTML();

                              // Make the subtitle draggable
                              subtitleElement.draggable = true;

                              subtitleElement.addEventListener('dragstart', (event) => {
                                   // Store the initial cursor position and subtitle position
                                   event.dataTransfer.setData('text/plain', 'DragSubtitle');
                                   event.dataTransfer.setDragImage(subtitleElement, 0, 0);
                                   event.dataTransfer.effectAllowed = 'move';
                              });

                              subtitleElement.addEventListener('drag', (event) => {
                                   // Update the subtitle position while dragging
                                   const videoRect = videoRef.current.getBoundingClientRect();
                                   const videoX = videoRect.left;
                                   const videoY = videoRect.top;
                                   const x = event.clientX - videoX;
                                   const y = event.clientY - videoY;
                                   subtitleElement.style.left = `${x}px`;
                                   subtitleElement.style.top = `${y}px`;
                              });
                         }
                    });
               }
          });

          return () => {
               player.dispose();
          };
     }, [videoSrc, subtitleSrc]);

     return (
          <Box>
               <Box sx={{ width: '100%', paddingBottom: '56.25%', position: 'relative' }}>
                    <video
                         src={videoSrc}
                         type="video/mp4"
                         controls
                         style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                         ref={videoRef}
                    >
                         <source src={videoSrc} type="video/mp4" />
                         <track kind="captions" label="English" srcLang="en" default />
                         {/* Use the provided transcript as the subtitle */}
                         <track
                              kind="subtitles"
                              src='../../../../assets/courses/videos/sample1.vtt'
                              srcLang="en"
                              label="English Subtitles"
                              default
                         />
                    </video>
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
