import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

import Label from 'src/components/label';
import { useTheme } from '@emotion/react';

export function RenderCellName({ params, handleEditRow }) {
    const theme = useTheme();
    return (
        <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
            <Avatar alt={params.row.FirstName} sx={{ mr: 2, backgroundColor: theme.palette.primary.lighter, color: theme.palette.grey[600] }}>
                {params?.row?.FirstName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <ListItemText
                disableTypography
                primary={
                    <Link
                        noWrap
                        color="inherit"
                        variant="subtitle2"
                        onClick={() => {
                            handleEditRow(params.row.UserMasterID)
                        }}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Box
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                            }}
                        >
                            {`${params.row.FirstName} ${params.row.LastName}`}
                        </Box>
                    </Link>
                }
                secondary={
                    <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                        {params.row.UserName}
                    </Box>
                }
                sx={{ display: 'flex', flexDirection: 'column' }}
            />
        </Stack>
    );
}
RenderCellName.propTypes = {
    params: PropTypes.shape({
        row: PropTypes.object,
    }),
};

export function RenderCellNames({ params }) {
    const theme = useTheme();
    return (
        <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
            <Avatar alt={params.row.FirstName} sx={{ mr: 2, backgroundColor: theme.palette.primary.lighter, color: theme.palette.grey[600] }}>
                {params?.row?.FirstName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <ListItemText
                disableTypography
                primary={
                    <Link
                        noWrap
                        underline='none'
                        color="inherit"
                        variant="subtitle2"
                    >
                        <Box
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                            }}
                        >
                            {`${params.row.FirstName} ${params.row.LastName}`}
                        </Box>
                    </Link>
                }
                secondary={
                    <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                        {params.row.UserName}
                    </Box>
                }
                sx={{ display: 'flex', flexDirection: 'column' }}
            />
        </Stack>
    );
}
RenderCellNames.propTypes = {
    params: PropTypes.shape({
        row: PropTypes.object,
    }),
};

export function RenderCellStatus({ params }) {
    return <Stack sx={{ py: 1.5 }}>
        <Label
            variant="soft"
            color={
                (params?.row?.IsActive == true && 'success') ||
                'warning'
            }
        >
            {params?.row?.IsActive ? "Active" : "Deactive"}
        </Label></Stack>;
}

RenderCellStatus.propTypes = {
    params: PropTypes.shape({
        row: PropTypes.object,
    }),
};

export function RenderCellPhone({ params }) {
    return <Stack sx={{ py: 1.5 }}>{params?.row?.Phone}</Stack>;
}

RenderCellPhone.propTypes = {
    params: PropTypes.shape({
        row: PropTypes.object,
    }),
};

export function RenderCellEmail({ params }) {
    return <Box
        sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            py: 1.5
        }}
    >
        {params?.row?.EmailID}
    </Box>;
}

RenderCellEmail.propTypes = {
    params: PropTypes.shape({
        row: PropTypes.object,
    }),
};