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
        borderTop: `1px solid ${theme.palette.primary.dark}`,
        padding: theme.spacing(1, 2)
      })}
    >
      <Stack direction='row' justifyContent='space-between'>
        <Typography
          component='a'
          variant='body2'
          href='https://romelperez.com'
          target='romelperez'
        >
          &copy; Romel Perez 2022
        </Typography>
        <Typography
          component='a'
          variant='body2'
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
