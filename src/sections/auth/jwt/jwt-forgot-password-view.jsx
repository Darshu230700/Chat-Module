import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { PasswordIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Logo from 'src/components/logo';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function JwtForgotPasswordView() {
  const { forgotPassword } = useAuthContext();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await forgotPassword?.(data.email);
      if (response?.data?.status) {
        const searchParams = new URLSearchParams({
          email: data.email,
        }).toString();

        const href = `${paths.auth.jwt.newPassword}?${searchParams}`;
        router.push(href);
      } else {
        enqueueSnackbar(response?.data?.message, { variant: 'error' });
      }

    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Send Request
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{
        height: 96,
        display: {
          xs: 'none', // Hidden on extra small screens
          md: 'block', // Shown on medium screens and above
        },
      }} />
      <Logo
        sx={{
          zIndex: 9,
          display: {
            xs: 'block', // Hidden on extra small screens
            md: 'none', // Shown on medium screens and above
          },
          m: 0,
          mb: 2
        }}
      />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h3">Forgot your password?</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please enter the email address associated with your account. We will send you a 6-digit verification code via email.
        </Typography>
      </Stack>
    </>
  );

  return (
    <>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}
        {renderForm}
      </FormProvider>
    </>
  );
}
