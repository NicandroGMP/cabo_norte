import React from 'react';
import { Box, Typography } from '@mui/material';

const AppLogo = () => {
  return (
    <Box>
      <Box
        sx={{
          height: { xs: 56, sm: 70 },
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'flex-start',
          '& svg': {
            height: { xs: 40, sm: 45 },
          },
        }}
        className='app-logo'
      >
        <img
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
          }}
          src='/assets/images/logo.jpg'
          alt='crema-logo'
        />
      </Box>
      <Typography mt={2} fontWeight="bold">
        PORTAL DE SEGURIDAD DE<br />CABO NORTE
      </Typography>
    </Box>
  );
};

export default AppLogo;
