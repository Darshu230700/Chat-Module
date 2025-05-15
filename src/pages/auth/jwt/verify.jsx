import { Helmet } from 'react-helmet-async';

import JwtVerifyView from 'src/sections/auth/jwt/jwt-verify-view';

// ----------------------------------------------------------------------

export default function VerifyPasswordPage() {
    return (
        <>
            <Helmet>
                <title>Verify Password</title>
            </Helmet>

            <JwtVerifyView />
        </>
    );
}
