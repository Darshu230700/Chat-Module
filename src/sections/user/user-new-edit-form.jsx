import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFRadioGroup,
} from 'src/components/hook-form';
import { AddEdituser } from 'src/api/user';
import { emailRegex, phoneRegExp } from 'src/common/common';
import { IconButton, InputAdornment } from '@mui/material';
import Iconify from 'src/components/iconify';
import RHFTextFieldPhone from 'src/components/hook-form/rhf-text-field-Phone';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ CurrentUser }) {

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false)

  const NewUserSchema = Yup.object().shape({
    UserName: Yup.string().required('User Name is required'),
    FirstName: Yup.string().required('First Name is required'),
    LastName: Yup.string().required('Last Name is required'),
    Password: Yup.string().required('Password is required'),
    Phone: Yup.string()
      .required('Phone Number is required')
      .matches(phoneRegExp, 'Phone Number must be a valid!'),
    EmailID: Yup.string().required('Email is required').matches(emailRegex, 'Email must be a valid email address'),
  });

  const defaultValues = useMemo(
    () => ({
      IsActive: CurrentUser?.IsActive ? CurrentUser?.IsActive : false,
      UserName: CurrentUser?.UserName ? CurrentUser?.UserName : "",
      FirstName: CurrentUser?.FirstName || '',
      LastName: CurrentUser?.LastName || '',
      Phone: CurrentUser?.Phone || '',
      EmailID: CurrentUser?.EmailID || '',
      Password: CurrentUser?.Password || '',
      Gender: CurrentUser?.Gender || 'Male',
    }),
    [CurrentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      let Params = {
        EmployeeMasterID: CurrentUser?.EmployeeMasterID || 0,
        UserName: data?.UserName,
        Password: data?.Password,
        IsActive: data?.IsActive ? true : false,
        FirstName: data?.FirstName,
        LastName: data?.LastName,
        EmailID: data?.EmailID,
        Phone: data?.Phone,
        Gender: data?.Gender,
      }
      const { status, message } = await AddEdituser(Params);
      if (status) {
        reset();
        enqueueSnackbar(CurrentUser ? 'Update success!' : 'Create success!');
        router.push(paths.user.root);
      } else {
        enqueueSnackbar(message, { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="FirstName" label="First Name" />
              <RHFTextField name="LastName" label="Last Name" />
              <RHFTextField name="UserName" label="User Name" />
              <RHFTextField name="EmailID" label="Email" />
              {!CurrentUser && (
                <RHFTextField
                  name="Password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

              )}
              <RHFTextFieldPhone name="Phone" label="Phone" type="phone" />
              <RHFRadioGroup
                row
                name="Gender"
                label="Gender"
                spacing={4}
                options={[
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                ]}
              />

              <FormControlLabel
                sx={{ width: "160px" }}
                control={
                  <Switch
                    checked={methods.watch('IsActive')}
                    onChange={(e) => methods.setValue('IsActive', e.target.checked)}
                    name="IsActive"
                  />
                }
                label="Is Active"
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!CurrentUser ? 'Create Employee' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid >
    </FormProvider >
  );
}

UserNewEditForm.propTypes = {
  CurrentUser: PropTypes.object,
};
