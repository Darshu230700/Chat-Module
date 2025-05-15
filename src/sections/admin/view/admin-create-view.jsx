import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import AdminNewEditForm from '../admin-new-edit-form';

// ----------------------------------------------------------------------

export default function AdminCreateView() {
    const settings = useSettingsContext();

    return (
        <Container maxWidth={false}>
            <CustomBreadcrumbs
                heading="Create a new Admin"
                links={[
                    {
                        name: 'Admin List',
                        href: paths.admin.root,
                    },
                    { name: 'New Admin' },
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

            <AdminNewEditForm />
        </Container>
    );
}
