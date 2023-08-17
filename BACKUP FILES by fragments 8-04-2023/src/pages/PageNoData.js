import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
     maxWidth: 480,
     margin: 'auto',
     minHeight: '100vh',
     display: 'flex',
     justifyContent: 'center',
     flexDirection: 'column',
     padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function PageNoData() {
     return (
          <>
               <Helmet>
                    <title> 404 Page Not Found | Minimal UI </title>
               </Helmet>

               <Container>
                    <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                         <Typography variant="h3" paragraph>
                              Sorry, no data was found!
                         </Typography>

                         <Typography sx={{ color: 'text.secondary' }}>
                              Sorry, we couldn’t find the content you’re looking for.
                         </Typography>

                         <Box
                              component="img"
                              src="/assets/illustrations/No_data.svg"
                              sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                         />

                         <Button to="/" size="large" variant="contained" component={RouterLink}>
                              Go to Home
                         </Button>
                    </StyledContent>
               </Container>
          </>
     );
}
