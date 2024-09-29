import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import copImg from '../assets/background-image.jpg';
// ----------------------------------------------------------------------

const cardData = [
  {
    title: 'Upload Secure Documents',
    subtitle:
      'Safeguard your documents with robust encryption on AWS, ensuring data remains secure at every step. Protect sensitive information with cutting-edge technology and secure access controls.',
  },
  {
    title: 'Create QR Codes',
    subtitle:
      'Transfer sensitive data securely using encrypted QR codes, ensuring information remains protected during transit. Simplify access while maintaining robust security and privacy standards.',
  },
  {
    title: 'Make Stops Quick and Safe',
    subtitle:
      'Encrypted QR codes enable officers to access critical information quickly and securely, reducing stop times and enhancing safety for both law enforcement and citizens.',
  },
];

export default function MarketingPage() {
  return (
    <>
      <Helmet>
        <title>Quicker Stops</title>

        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>
      <Box
        sx={{
          backgroundImage: `url(${copImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '400px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '80%', alignContent: 'flex-end', p: 4 }}>
          <Stack direction="column" sx={{ width: '30%' }} spacing={3}>
            <Typography sx={{ color: '#FFF' }} variant="h3" fontFamily="sans-serif">
              <b>Quicker Stops</b>
            </Typography>
            <Typography sx={{ color: '#FFF' }} variant="h5" fontFamily="sans-serif">
              We make things faster and safer by going digital, saving you time and reducing risk.
              Experience efficiency and peace of mind in every step of the process.
            </Typography>
            <Button
              variant="outlined"
              sx={{ borderColor: '#fff', color: '#fff', maxWidth: '125px' }}
            >
              Download
            </Button>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ width: '70%', alignSelf: 'center', pt: 8 }}>
        <Stack direction="row">
          <Stack direction="column" sx={{ width: '50%' }}>
            <Typography fontFamily="sans-serif">How does it work?</Typography>
            <Typography fontFamily="sans-serif" variant="h4">
              <b> QR technology paired with AWS infrastructure.</b>
            </Typography>
          </Stack>
          <Typography fontFamily="sans-serif" sx={{ width: '50%' }}>
            Our goal is to enhance the safety of police stops for both officers and citizens by
            implementing advanced training, technology, and community engagement to reduce risks and
            foster trust.
          </Typography>
        </Stack>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            {cardData.map((data) => (
              <Grid item xs={4}>
                <Card
                  sx={{
                    minHeight: 300,
                    backgroundColor: '#010014',
                    textAlign: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" color="#fff" fontFamily="sans-serif">
                      {data.title}
                    </Typography>
                  </CardContent>
                </Card>
                <Typography sx={{ p: 4 }}>{data.subtitle}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
