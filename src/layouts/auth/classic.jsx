import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo';
import { Card } from '@mui/material';

// ----------------------------------------------------------------------


export default function AuthClassicLayout({ children, image, title }) {
  const { method } = useAuthContext();

  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          pb: { xs: 5, md: 0 },
          pt: 4,
          px: { xs: 3, md: 0 },
          boxShadow: 'none',
          // overflow: { md: 'unset' },
          bgcolor: "transparent",

        }}
      >
        {children}
      </Card>
    </Stack>
  );

  const renderSection = (
    <Stack flexGrow={1} sx={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        component="img"
        alt="auth"
        src={image || '/assets/illustrations/illustration_dashboard.png'}
        sx={{
          // top: 16,
          // left: 16,
          objectFit: 'cover',
          position: 'absolute',
          zIndex: '0',
          // width: 'calc(100% - 32px)',
          // height: 'calc(100% - 32px)',
          // width: "100%",
          // height: "100%"
        }}
      />
      {/*<div style={{ position: "relative", zIndex: "9", padding: "20px", textAlign: "center" }}><img src={LogoIMG} style={{ width: "70%", }} /></div>*/}
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {mdUp && renderSection}

      {renderContent}
    </Stack>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};
