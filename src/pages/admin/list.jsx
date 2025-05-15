import { Helmet } from 'react-helmet-async';
import { AdminListView } from 'src/sections/admin/view';

// ----------------------------------------------------------------------

export default function AdminListPage() {
    return (
        <>
            <Helmet>
                <title> Admin List</title>
            </Helmet>

            <AdminListView />
        </>
    );
}
