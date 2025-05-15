import PropTypes from 'prop-types';
import UserNewEditForm from '../user-new-edit-form';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { GetUserById } from 'src/api/user';

// ----------------------------------------------------------------------

export default function AdminEditView({ id }) {

  const [CurrentUser, setCurrentUser] = useState()

  const [loading, setloading] = useState(true)

  const fetchData = async () => {
    const { data } = await GetUserById(id);
    setCurrentUser(data)
    setloading(false)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <Container maxWidth={false}>
      {!loading && (
        <>
          <CustomBreadcrumbs
            heading="Edit"
            links={[
              // { name: 'Dashboard', href: paths.dashboard.root },
              {
                name: 'Employee List',
                href: paths.user.root,
              },
              { name: `${CurrentUser?.FirstName} ${CurrentUser?.LastName}` },
            ]}
          />
          <Stack sx={{ display: "flex", alignItems: "end", mb: { xs: 2, md: 3 } }}>
            <Button
              component={RouterLink}
              href={paths.user.root}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            >
              Back
            </Button>
          </Stack>

          <UserNewEditForm CurrentUser={CurrentUser} />
        </>
      )}
    </Container>
  );
}

AdminEditView.propTypes = {
  id: PropTypes.string,
};
