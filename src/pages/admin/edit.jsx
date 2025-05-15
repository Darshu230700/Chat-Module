import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import { AdminEditView } from 'src/sections/admin/view';

// ----------------------------------------------------------------------

export default function AdminEditPage() {
    const params = useParams();

    const { id } = params;

    return (
        <>
            <Helmet>
                <title>Admin Edit</title>
            </Helmet>

            <AdminEditView id={`${id}`} />
        </>
    );
}
