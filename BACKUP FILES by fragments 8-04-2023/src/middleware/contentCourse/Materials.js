import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { Card, Box, Grid, Container, Typography, List, ListItem, ListItemText, ListItemButton, Button, Checkbox } from '@mui/material';
import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import VideoComponent from './videoComponent';

import QuizPage from '../../pages/quizPage';

const Materials = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const [contentData, setContentData] = useState([]);
  const [moduleIsData, setModuleIsData] = useState([]);
  const [courseIsData, setCourseIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuiz, setIsQuiz] = useState(false);
  const [getNextMod, setGetNextMod] = useState([]);
  const { id } = useParams();

  const videoContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const videoContainer = videoContainerRef.current;
      const videoRect = videoContainer.getBoundingClientRect();
      const offsetTop = videoRect.top;

      if (offsetTop <= 0) {
        videoContainer.style.width = '100%';
        videoContainer.style.position = 'absolute';
        videoContainer.style.zIndex = '9999';
        // videoContainer.style.height = '100vh';
      } else {
        videoContainer.style.width = 'auto';
        videoContainer.style.position = 'static';
        videoContainer.style.zIndex = '1';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/content/${id}`);
        const content = response.data.moduleContent;
        const course = response.data.courseData;

        if (content.length > 0) {
          setCourseIsData(course)
          setGetNextMod(content)
          // Fetch and store data for all modules
          const decodedData = JSON.parse(content[0].content);
          const decodedLessonAbout = decodedData.lessonAbout;

          setContentData(decodedLessonAbout);

          setModuleIsData(content[0])
          setIsLoading(false);

        } else {
          console.log('No data found');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching content data:', error);
        setIsLoading(false);
      }
    };

    fetchContentData();
  }, [id]);

  const getNextModule = (event, getNextMod) => {
    console.log(getNextMod)
    const decodedData = JSON.parse(getNextMod[1].content);

    const decodedLessonAbout = decodedData.AboutProweaver;

    setContentData(decodedLessonAbout);
    setCurrentTab(0);
    setSelectedLesson(0)
    setIsQuiz(false)
  }

  const getNextTab = () => {
    if (currentTab < contentData.length - 1) {
      const nextTab = currentTab + 1;
      setCurrentTab(nextTab);
      setSelectedLesson(nextTab);
      setCheckedItems((prevChecked) => {
        const newChecked = [...prevChecked];
        if (!newChecked.includes(currentTab)) {
          newChecked.push(currentTab);
        }
        return newChecked.filter((index) => index !== nextTab);
      });
    } else {
      setCurrentTab(contentData.length - 1);
      setCheckedItems((prevChecked) => {
        const newChecked = [...prevChecked];
        if (!newChecked.includes(currentTab)) {
          newChecked.push(currentTab);
        }
        return newChecked;
      });
      setIsQuiz(true)
      setCurrentTab(100)

    }
  };

  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));

  if (isLoading) {
    return (
      <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          Loading...
        </Typography>
        {/* You can add a spinner or loading animation here */}
      </StyledContent>
    );
  }

  return (
    <Container maxWidth="xl">

      {contentData.length > 0 ? (
        <>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {courseIsData[0].courseName}
          </Typography>
          <Box className="rate" sx={{ mb: 2 }}>
            <Typography component="label" htmlFor="" sx={{ margin: '0px 5px', color: '#00000085' }}>
              {moduleIsData.moduleName}
            </Typography>
            <Typography component="label" htmlFor="">
              |
            </Typography>
            <Typography component="label" htmlFor="" sx={{ margin: '0px 10px', color: '#00000085' }}>
              {moduleIsData.description}
            </Typography>
          </Box>

          <Grid container spacing={3}>

            <Grid item xs={12} md={6} lg={8} ref={videoContainerRef} sx={{ height: '100vh' }}>
              <Card sx={{ mb: 2 }}>
                <Box>
                  {isQuiz ? <QuizPage /> : <VideoComponent videoSrc={contentData[selectedLesson].videoSrc} transcript={contentData[selectedLesson].transcript} />}

                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Card>
                <Box sx={{ pb: 1 }}>
                  <Typography variant="h5" component="h4" sx={{ padding: '10px', justifyContent: 'center', display: 'flex' }}>
                    Course Outline
                  </Typography>

                  <Typography variant="h5" component="h4" sx={{ justifyContent: 'center', display: 'flex' }}>
                    {moduleIsData.moduleName}
                  </Typography>

                  <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <Box>
                      <ListItem>
                        <ListItemText id={`checkbox-list-secondary-label`} variant="h5" component="h4">
                          <ListItemText primary={`I. ${moduleIsData.moduleName}`} variant="h5" component="h4" />
                        </ListItemText>
                      </ListItem>

                      {contentData.map((lesson, lessonIndex) => (
                        <ListItem key={`lesson-${lessonIndex}`} disablePadding disabled={currentTab !== lessonIndex} sx={{ backgroundColor: currentTab === lessonIndex ? '#3333330F' : 'initial', color: currentTab === lessonIndex ? 'black' : 'initial', borderRight: currentTab === lessonIndex ? '7px solid #9900d1ab' : 'none', }}>
                          <ListItemButton onClick={() => setSelectedLesson(lessonIndex)} disabled={currentTab !== lessonIndex}>
                            <ListItemText>&nbsp; &nbsp; &nbsp; {lesson.lessonOverview}</ListItemText>
                            <Checkbox
                              edge="end"
                              inputProps={{ 'aria-labelledby': `checkbox-list-secondary-label` }}
                              icon={<RadioButtonUnchecked />}
                              checkedIcon={<CheckCircleOutline />}
                              checked={checkedItems.includes(lessonIndex)}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </Box>
                  </List>
                </Box>
              </Card>
              {currentTab === contentData.length - 1 ? (
                <Button variant="contained" color="primary" onClick={getNextTab} sx={{ mt: 2 }}>
                  Start quiz
                </Button>
              ) : currentTab === 100 ?
                <Button variant="contained" color="primary" onClick={(event) => getNextModule(event, getNextMod)} sx={{ mt: 2 }}>
                  Next module
                </Button>
                : (
                  <Button variant="contained" color="primary" onClick={getNextTab} sx={{ mt: 2 }}>
                    Next
                  </Button>
                )}
            </Grid>
          </Grid>
        </>
      ) : (
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry for the Inconvenience!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_500.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </StyledContent>
      )}
    </Container>
  );
};

export default Materials;