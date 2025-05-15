// import PropTypes from 'prop-types';

// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import TableCell from '@mui/material/TableCell';
// import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';

// import { useBoolean } from 'src/hooks/use-boolean';

// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// import UserQuickEditForm from './user-quick-edit-form';

// // ----------------------------------------------------------------------

// export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
//   const { name, avatarUrl, company, role, status, email, phoneNumber } = row;

//   const confirm = useBoolean();

//   const quickEdit = useBoolean();

//   const popover = usePopover();

//   return (
//     <>
//       <TableRow hover selected={selected}>
//         <TableCell padding="checkbox">
//           <Checkbox checked={selected} onClick={onSelectRow} />
//         </TableCell>

//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />

//           <ListItemText
//             primary={name}
//             secondary={email}
//             primaryTypographyProps={{ typography: 'body2' }}
//             secondaryTypographyProps={{
//               component: 'span',
//               color: 'text.disabled',
//             }}
//           />
//         </TableCell>

//         <TableCell sx={{ whiteSpace: 'nowrap' }}>{phoneNumber}</TableCell>

//         <TableCell sx={{ whiteSpace: 'nowrap' }}>{company}</TableCell>

//         <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>

//         <TableCell>
//           <Label
//             variant="soft"
//             color={
//               (status === 'active' && 'success') ||
//               (status === 'pending' && 'warning') ||
//               (status === 'banned' && 'error') ||
//               'default'
//             }
//           >
//             {status}
//           </Label>
//         </TableCell>

//         <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
//           <Tooltip title="Quick Edit" placement="top" arrow>
//             <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
//               <Iconify icon="solar:pen-bold" />
//             </IconButton>
//           </Tooltip>

//           <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

//       <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

//       <CustomPopover
//         open={popover.open}
//         onClose={popover.onClose}
//         arrow="right-top"
//         sx={{ width: 140 }}
//       >
//         <MenuItem
//           onClick={() => {
//             confirm.onTrue();
//             popover.onClose();
//           }}
//           sx={{ color: 'error.main' }}
//         >
//           <Iconify icon="solar:trash-bin-trash-bold" />
//           Delete
//         </MenuItem>

//         <MenuItem
//           onClick={() => {
//             onEditRow();
//             popover.onClose();
//           }}
//         >
//           <Iconify icon="solar:pen-bold" />
//           Edit
//         </MenuItem>
//       </CustomPopover>

//       <ConfirmDialog
//         open={confirm.value}
//         onClose={confirm.onFalse}
//         title="Delete"
//         content="Are you sure want to delete?"
//         action={
//           <Button variant="contained" color="error" onClick={onDeleteRow}>
//             Delete
//           </Button>
//         }
//       />
//     </>
//   );
// }

// UserTableRow.propTypes = {
//   onDeleteRow: PropTypes.func,
//   onEditRow: PropTypes.func,
//   onSelectRow: PropTypes.func,
//   row: PropTypes.object,
//   selected: PropTypes.bool,
// };


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
              handleEditRow(params.row.EmployeeMasterID)
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


export function RenderCellUserName({ params }) {
  return <Box
    sx={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
      py: 1.5
    }}
  >
    {params?.row?.UserName}
  </Box>;
}

RenderCellUserName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};