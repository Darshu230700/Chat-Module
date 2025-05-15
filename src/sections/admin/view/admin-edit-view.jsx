import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { GetAdminById } from 'src/api/admin';
import AdminNewEditForm from '../admin-new-edit-form';

// ----------------------------------------------------------------------

export default function AdminEditView({ id }) {

    const [CurrentAdmin, setCurrentAdmin] = useState()

    const [loading, setloading] = useState(true)

    const fetchData = async () => {
        const { data } = await GetAdminById(id);
        setCurrentAdmin(data)
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
                                name: 'Admin List',
                                href: paths.admin.root,
                            },
                            { name: `${CurrentAdmin?.FirstName} ${CurrentAdmin?.LastName}` },
                        ]}
                    />
                    <Stack sx={{ display: "flex", alignItems: "end", mb: { xs: 2, md: 3 } }}>
                        <Button
                            component={RouterLink}
                            href={paths.admin.root}
                            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
                        >
                            Back
                        </Button>
                    </Stack>

                    <AdminNewEditForm CurrentAdmin={CurrentAdmin} />
                </>
            )}
        </Container>
    );
}

AdminEditView.propTypes = {
    id: PropTypes.string,
};
