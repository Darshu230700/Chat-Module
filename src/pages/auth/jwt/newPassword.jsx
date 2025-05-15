import { Helmet } from 'react-helmet-async';

import JwtNewPasswordView from 'src/sections/auth/jwt/jwt-new-password-view';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
    return (
        <>
            <Helmet>
                <title>New Password</title>
            </Helmet>

            <JwtNewPasswordView />
        </>
    );
}
