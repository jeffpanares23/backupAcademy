import { useEffect, useState } from 'react';
import Axios from 'axios'
import {
     Card,
     Box,
     Grid,
     Container,
     Typography,
     Button,
     TextareaAutosize,
} from '@mui/material';
import { Tooltip } from 'antd';

import { useParams } from 'react-router-dom';

import Iconify from '../components/iconify';

export function CourseEditPage() {

     const [editingStartPoint, setEditingStartPoint] = useState(false);
     const [editingStartPointIndex, setEditingStartPointIndex] = useState(null);
     const [startPoint, setStartPoint] = useState('');

     const [editingEndPoint, setEditingEndPoint] = useState(false);
     const [editingEndPointIndex, setEditingEndPointIndex] = useState(null);
     const [endPoint, setEndPoint] = useState('15');

     const [editingTranscript, setEditingTranscript] = useState(false);
     const [editingTranscriptIndex, setEditingTranscriptIndex] = useState(null);
     const [isTranscript, setIsTranscript] = useState([]);


     const [editingModule, setEditingModule] = useState(false);

     const [moduleTitle, setModuleTitle] = useState('About Proweaver');

     const [editingVideoUrl, setEditingVideoUrl] = useState(false);
     const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=XeiOnkEI7XI');

     const [transcript, setTranscript] = useState('')

     const { id } = useParams();

     useEffect(() => {
          const fetchContentData = async () => {
               try {
                    const response = await Axios.get(`http://localhost:8000/content/${id}`);
                    const content = response.data.moduleContent;
                    const course = response.data.courseData;

                    if (content.length > 0) {
                         //  setCourseIsData(course)
                         //  setGetNextMod(content)
                         const decodedData = JSON.parse(content[0].content);
                         const decodedLessonAbout = decodedData.lessonAbout;

                         setModuleTitle(decodedLessonAbout[0].lessonOverview)
                         setVideoUrl(decodedLessonAbout[0].videoSrc)
                         setIsTranscript(decodedLessonAbout[0].transcript)

                    } else {
                         console.log('No data found');
                         //  setIsLoading(false);
                    }
               } catch (error) {
                    console.error('Error fetching content data:', error);
                    //     setIsLoading(false);
               }
          };

          fetchContentData();
     }, [id]);




     const handleStartPointEditClick = (index) => {
          setEditingStartPoint(true);
          setEditingStartPointIndex(index);
     };

     const handleEndPointEditClick = (index) => {
          setEditingEndPoint(true);
          setEditingEndPointIndex(index);
     };

     const handleModuleEditClick = () => {
          setEditingModule(true);
     };

     const handleTranscriptEditClick = (index) => {
          setEditingTranscript(true);
          setEditingTranscriptIndex(index)
     };

     const handlVideoUrlEditClick = () => {
          setEditingVideoUrl(true);
     };

     const saveStartPoint = () => {
          setEditingStartPoint(false);
          // Save startPoint to your backend or do other necessary actions
     };

     const saveEndPoint = () => {
          setEditingEndPoint(false);
          // Save endPoint to your backend or do other necessary actions
     };

     const saveModuleTitle = () => {
          setEditingModule(false);
          // Save module to your backend or do other necessary actions
     };

     const saveVideoUrl = () => {
          setEditingVideoUrl(false);
          // Save module to your backend or do other necessary actions
     };

     const saveTranscript = () => {
          setEditingTranscript(false);
          // Save transcript to your backend or do other necessary actions
     };

     const editIconStyle = {
          cursor: 'pointer',
          color: '#D526FF',
          '&:hover': {
               color: '#D526FF'
          }
     }
     // const gradientOverlayStyle = {
     //      content: "''",
     //      position: 'absolute',
     //      top: 0,
     //      left: 0,
     //      right: 0,
     //      bottom: 0,
     //      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 95%, rgb(165, 108, 224) 110%)',
     //      zIndex: -1,
     // };

     const tooltipTitle = "Edit"
     return (
          <>
               <Container maxWidth="xl" id="about">
                    <Grid container spacing={3}>
                         <Grid item xs={12} md={6} lg={8} sx={{
                              maxHeight: '60vh',
                              overflow: 'auto',
                              scrollbarWidth: 'none',
                         }} >
                              {isTranscript.length > 0 ? (
                                   isTranscript.map((val, index) => (
                                        <Card key={index}
                                             sx={{
                                                  mt: 2,
                                                  // '&::before': gradientOverlayStyle,
                                             }}>
                                             <Box className="item" sx={{ pt: 2, px: 2, mb: 2 }} icon={<Iconify icon="line-md:chevron-small-right" />}>
                                                  <Typography variant="h6">
                                                       Start Point:&nbsp;
                                                       {editingStartPoint && editingStartPointIndex === index ? (
                                                            <>
                                                                 <TextareaAutosize
                                                                      value={startPoint}
                                                                      onChange={(e) => setStartPoint(e.target.value)}
                                                                      style={{ width: 'auto', fontSize: '16px', height: '25px' }}
                                                                 />
                                                                 <Button onClick={saveStartPoint}>Save</Button>
                                                            </>
                                                       ) : (
                                                            <>
                                                                 <Typography variant="p" sx={{ fontWeight: 'normal' }}>
                                                                      &nbsp;{val.startTime}
                                                                 </Typography>&nbsp;
                                                                 <Tooltip placement="top" title={tooltipTitle}>
                                                                      <Iconify icon="line-md:pencil" onClick={() => handleStartPointEditClick(index)} style={editIconStyle} />
                                                                 </Tooltip>
                                                            </>
                                                       )}
                                                       &nbsp;&nbsp;&nbsp;
                                                       End Point:&nbsp;
                                                       {editingEndPoint && editingEndPointIndex === index ? (
                                                            <>
                                                                 <TextareaAutosize
                                                                      value={endPoint}
                                                                      onChange={(e) => setEndPoint(e.target.value)}
                                                                      rows={1}
                                                                      style={{ width: 'auto', fontSize: '16px', height: '25px' }}
                                                                 />
                                                                 <Button onClick={saveEndPoint}>Save</Button>
                                                            </>
                                                       ) : (
                                                            <>
                                                                 <Typography variant="p" sx={{ fontWeight: 'normal' }}>
                                                                      &nbsp;{val.endTime}
                                                                 </Typography>&nbsp;
                                                                 <Tooltip placement="top" title={tooltipTitle}>
                                                                      <Iconify icon="line-md:pencil" onClick={() => handleEndPointEditClick(index)} style={editIconStyle} />
                                                                 </Tooltip>
                                                            </>
                                                       )}
                                                  </Typography>
                                             </Box>

                                             <Box sx={{ py: 2, px: 2 }}>
                                                  <Typography variant="h6">
                                                       Transcript &nbsp;
                                                       <Tooltip placement="right" title={tooltipTitle}>
                                                            <Iconify icon="line-md:pencil" onClick={handleTranscriptEditClick} style={editIconStyle} />
                                                       </Tooltip>
                                                  </Typography>
                                                  {editingTranscript && editingTranscriptIndex === index ? (
                                                       <>
                                                            <TextareaAutosize
                                                                 value={val.text}
                                                                 onChange={(e) => setTranscript(e.target.value)}
                                                                 rows={8}
                                                                 style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                                                            />
                                                            <Button onClick={() => saveTranscript(index)}>Save</Button>
                                                       </>
                                                  ) : (
                                                       <>
                                                            <Typography variant="p">{val.text}</Typography>
                                                       </>
                                                  )}
                                             </Box>
                                        </Card>
                                   ))
                              ) : (<Typography variant="p">No Data Found</Typography>)}
                         </Grid>

                         <Grid item xs={12} md={6} lg={4}>
                              <Card sx={{ mb: 2 }}>
                                   <Box sx={{ pb: 1 }} dir="ltr">
                                        <Typography variant='h6' component='h1' sx={{ padding: '10px', justifyContent: 'center', display: 'flex' }}>
                                             Course Overview
                                        </Typography>
                                        <Box className='item flexSB' sx={{ marginTop: '10px !important', padding: '5px 20px !important' }}>
                                             <Box className='text'>
                                                  <Typography variant='h6' >
                                                       Module Title:&nbsp;
                                                       {editingModule ? (
                                                            <>
                                                                 <TextareaAutosize
                                                                      value={moduleTitle}
                                                                      onChange={(e) => setModuleTitle(e.target.value)}
                                                                      rows={1}
                                                                      style={{ width: 'auto', fontSize: '16px', height: '25px' }}
                                                                 />
                                                                 <Button onClick={saveModuleTitle}>Save</Button>
                                                            </>
                                                       ) : (
                                                            <>
                                                                 <Typography variant="p" sx={{ fontWeight: 'normal' }}>
                                                                      &nbsp;{moduleTitle}
                                                                 </Typography>&nbsp;
                                                                 <Tooltip placement="right" title={tooltipTitle}>
                                                                      <Iconify icon="line-md:pencil" onClick={handleModuleEditClick} style={editIconStyle} />
                                                                 </Tooltip>
                                                            </>
                                                       )}
                                                  </Typography>
                                             </Box>
                                        </Box>

                                        <Box className='item flexSB' sx={{ marginTop: '10px !important', padding: '5px 20px !important' }}>
                                             <Box className='text'>
                                                  <Typography variant='h6' >
                                                       Video URL:&nbsp;
                                                       {editingVideoUrl ? (
                                                            <>
                                                                 <TextareaAutosize
                                                                      value={videoUrl}
                                                                      onChange={(e) => setVideoUrl(e.target.value)}
                                                                      rows={1}
                                                                      style={{ width: 'auto', fontSize: '16px', height: '25px' }}
                                                                 />
                                                                 <Button onClick={saveVideoUrl}>Save</Button>
                                                            </>
                                                       ) : (
                                                            <>
                                                                 <Typography variant="p" sx={{ fontWeight: 'normal' }}>
                                                                      &nbsp;{videoUrl}
                                                                 </Typography>&nbsp;
                                                                 <Tooltip placement="right" title={tooltipTitle}>
                                                                      <Iconify icon="line-md:pencil" onClick={() => handlVideoUrlEditClick} style={editIconStyle} />
                                                                 </Tooltip>
                                                            </>
                                                       )}
                                                  </Typography>
                                                  {/* {/ <Typography>{val.desc}</Typography > /} */}
                                             </Box>
                                        </Box>
                                   </Box>
                              </Card>
                              <Button variant="contained" endIcon={<Iconify icon="line-md:chevron-small-right" />}>
                                   Next Module
                              </Button>
                         </Grid>
                    </Grid>
               </Container>
          </>
     );
}
