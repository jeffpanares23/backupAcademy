import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCarousel = styled(Paper)(({ theme }) => ({
     padding: theme.spacing(2),
     backgroundColor: '#f0f0f0', // Customize carousel background color
}));

const Slide = styled(Box)({
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     height: 200, // Customize slide height
});

const Image = styled('img')({
     maxWidth: '100%',
     maxHeight: '100%',
});

const AppCourseCarousel = () => {
     const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
               {
                    breakpoint: 1024,
                    settings: {
                         slidesToShow: 2,
                    },
               },
               {
                    breakpoint: 768,
                    settings: {
                         slidesToShow: 1,
                    },
               },
          ],
     };

     return (
          <StyledCarousel elevation={3}>
               <Typography variant="h5" gutterBottom>
                    Carousel Example
               </Typography>
               <Slider {...settings}>
                    <Slide>
                         <Image src="carousel-image-1.jpg" alt="Course Slide 1" />
                    </Slide>
                    <Slide>
                         <Image src="carousel-image-2.jpg" alt="Course Slide 2" />
                    </Slide>
                    <Slide>
                         <Image src="carousel-image-3.jpg" alt="Course Slide 3" />
                    </Slide>
                    <Slide>
                         <Image src="carousel-image-1.jpg" alt="Course Slide 1" />
                    </Slide>
                    <Slide>
                         <Image src="carousel-image-2.jpg" alt="Course Slide 2" />
                    </Slide>
                    <Slide>
                         <Image src="carousel-image-3.jpg" alt="Course Slide 3" />
                    </Slide>
                    {/* Add more slides here */}
               </Slider>
          </StyledCarousel>
     );
};

export default AppCourseCarousel;
