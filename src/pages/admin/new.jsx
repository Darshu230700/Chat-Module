import { Helmet } from 'react-helmet-async';
import { AdminCreateView } from 'src/sections/admin/view';


// ----------------------------------------------------------------------

export default function AdminCreatePage() {
    return (
        <>
            <Helmet>
                <title>Create a new admin</title>
            </Helmet>

            <AdminCreateView />
        </>
    );
}
