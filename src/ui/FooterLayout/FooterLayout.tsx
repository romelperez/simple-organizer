import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { FooterLayoutProps } from './FooterLayout.types';

const FooterLayout = (props: FooterLayoutProps): ReactElement => {
  const { className } = props;

  return (
    <Box
      component='footer'
      className={className}
      sx={theme => ({
        padding: theme.spacing(1, 2)
      })}
    >
      <Stack direction='row' justifyContent='center' spacing={1}>
        <Typography
          component='a'
          variant='body2'
          color='primary'
          href='https://romelperez.com'
          target='romelperez'
        >
          &copy; Romel Perez 2022
        </Typography>
        <Typography variant='body2' color='primary'>
          -
        </Typography>
        <Typography
          component='a'
          variant='body2'
          color='primary'
          href='https://github.com/romelperez/simple-organizer'
          target='repository'
        >
          GitHub
        </Typography>
      </Stack>
    </Box>
  );
};

export { FooterLayout };
