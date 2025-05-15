import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';
import { RouterLink } from 'src/routes/components';
import LOGO from "../../../public/favicon/favicon.png"

// ----------------------------------------------------------------------

const LogoMini = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
    // const theme = useTheme();

    // const PRIMARY_LIGHT = theme.palette.primary.light;

    // const PRIMARY_MAIN = theme.palette.primary.main;

    // const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
        <Box
            ref={ref}
            component="div"
            sx={{
                width: 90,
                height: 25,
                display: 'inline-flex',
                justifyContent: "center",
                ...sx,
            }}
            {...other}
        >
            <img src={LOGO} alt='Logo not Found' />
        </Box>
    );

    if (disabledLink) {
        return logo;
    }

    return (
        <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
            {logo}
        </Link>
    );
});

LogoMini.propTypes = {
    disabledLink: PropTypes.bool,
    sx: PropTypes.object,
};

export default LogoMini;
