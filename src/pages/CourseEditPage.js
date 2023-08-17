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
     TextField,
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
     const [istext, setIsText] = useState('');
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

                                                  {editingStartPoint && editingStartPointIndex === index ? (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2 }}
                                                                 type="text"
                                                                 label="Start Point"
                                                                 value={startPoint}
                                                                 onChange={(e) => setStartPoint(e.target.value)}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Save">
                                                                                <Iconify icon="line-md:confirm" onClick={saveStartPoint} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />
                                                            {/* <Button onClick={saveStartPoint}>Save</Button> */}
                                                       </>
                                                  ) : (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2 }}
                                                                 type="text"
                                                                 label="Start Point"
                                                                 value={val.startTime}
                                                                 onChange={(e) => setStartPoint(e.target.value)}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Edit">
                                                                                <Iconify icon="line-md:pencil" onClick={() => handleStartPointEditClick(index)} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />
                                                       </>
                                                  )}
                                                  &nbsp;&nbsp;&nbsp;
                                                  {editingEndPoint && editingEndPointIndex === index ? (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2 }}
                                                                 type="text"
                                                                 label="End Point"
                                                                 value={endPoint}
                                                                 onChange={(e) => setEndPoint(e.target.value)}
                                                                 rows={1}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Save">
                                                                                <Iconify icon="line-md:confirm" onClick={saveEndPoint} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />
                                                       </>
                                                  ) : (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2 }}
                                                                 type="text"
                                                                 label="End Point"
                                                                 value={val.endTime}
                                                                 onChange={(e) => setEndPoint(e.target.value)}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Edit">
                                                                                <Iconify icon="line-md:pencil" onClick={() => handleEndPointEditClick(index)} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />
                                                       </>
                                                  )}
                                             </Box>

                                             <Box sx={{ py: 2, px: 2 }}>
                                                  {editingTranscript && editingTranscriptIndex === index ? (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2, width: '100%', height: 'auto' }}
                                                                 type="text"
                                                                 label="Transcript"
                                                                 value={val.isTranscript}
                                                                 multiline
                                                                 rows={4}
                                                                 onChange={(e) => setIsText(e.target.value)}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Save">
                                                                                <Iconify icon="line-md:confirm" onClick={saveTranscript} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />
                                                       </>
                                                  ) : (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2, width: '100%', height: 'auto' }}
                                                                 type="text"
                                                                 label="Transcript"
                                                                 value={val.text}
                                                                 multiline
                                                                 rows={4}
                                                                 onChange={(e) => setIsText(e.target.value)}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Edit">
                                                                                <Iconify icon="line-md:pencil" onClick={() => handleTranscriptEditClick(index)} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />
                                                       </>
                                                  )}
                                             </Box>
                                        </Card>
                                   ))
                              ) : (<Typography variant="p">No Data Found</Typography>)}
                         </Grid>

                         <Grid item xs={12} md={6} lg={4}>
                              <Card sx={{ my: 2 }}>
                                   <Box sx={{ pb: 1 }} dir="ltr">
                                        <Typography variant='h6' component='h1' sx={{ padding: '10px', justifyContent: 'center', display: 'flex' }}>
                                             Course Overview
                                        </Typography>
                                        <Box className='item flexSB' sx={{ marginTop: '10px !important', padding: '5px 20px !important' }}>
                                             <Box className='text'>
                                                  {editingModule ? (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2, width: '100%', height: 'auto' }}
                                                                 type="text"
                                                                 label="Module Title"
                                                                 value={moduleTitle}
                                                                 rows={1}
                                                                 onChange={(e) => setModuleTitle(e.target.value)}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Save">
                                                                                <Iconify icon="line-md:confirm" onClick={saveModuleTitle} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />

                                                       </>
                                                  ) : (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2, width: '100%', height: 'auto' }}
                                                                 type="text"
                                                                 label="Module Title"
                                                                 value={moduleTitle}
                                                                 rows={1}
                                                                 // onChange={(e) => setIsText(e.target.value)}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Edit">
                                                                                <Iconify icon="line-md:pencil" onClick={handleModuleEditClick} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />
                                                       </>
                                                  )}
                                             </Box>
                                        </Box>

                                        <Box className='item flexSB' sx={{ marginTop: '10px !important', padding: '5px 20px !important' }}>
                                             <Box className='text'>
                                                  {editingVideoUrl ? (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2, width: '100%', height: 'auto' }}
                                                                 type="text"
                                                                 label="Video URL"
                                                                 value={videoUrl}
                                                                 rows={1}
                                                                 onChange={(e) => setVideoUrl(e.target.value)}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Save">
                                                                                <Iconify icon="line-md:confirm" onClick={saveVideoUrl} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />
                                                       </>
                                                  ) : (
                                                       <>
                                                            <TextField
                                                                 sx={{ mt: 2, width: '100%', height: 'auto' }}
                                                                 type="text"
                                                                 label="Video URL"
                                                                 value={videoUrl}
                                                                 rows={1}
                                                                 // onChange={(e) => setIsText(e.target.value)}
                                                                 InputProps={{
                                                                      endAdornment: (
                                                                           <Tooltip placement="left" title="Edit">
                                                                                <Iconify icon="line-md:pencil" onClick={handlVideoUrlEditClick} style={editIconStyle} />
                                                                           </Tooltip>
                                                                      ),
                                                                 }}
                                                            />
                                                       </>
                                                  )}
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
               </Container >
          </>
     );
}
