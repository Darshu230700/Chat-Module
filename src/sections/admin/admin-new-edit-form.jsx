import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
    RHFTextField,
    RHFAutocomplete,
} from 'src/components/hook-form';
import { Button, IconButton, InputAdornment } from '@mui/material';
import RHFTextFieldPhone from 'src/components/hook-form/rhf-text-field-Phone';
import Iconify from 'src/components/iconify';
import { AddAdmin, UpdateAdmin } from 'src/api/admin';
import { emailRegex, phoneRegExp } from 'src/common/common';

// ----------------------------------------------------------------------

export default function AdminNewEditForm({ CurrentAdmin }) {

    const router = useRouter();

    const mdUp = useResponsive('up', 'md');

    const { enqueueSnackbar } = useSnackbar();

    const [showPassword, setShowPassword] = useState(false)

    const NewProductSchema = Yup.object().shape({
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
        () => {
            return ({
                IsActive: CurrentAdmin?.IsActive ? CurrentAdmin?.IsActive : false,
                UserName: CurrentAdmin?.UserName ? CurrentAdmin?.UserName : "",
                FirstName: CurrentAdmin?.FirstName || '',
                LastName: CurrentAdmin?.LastName || '',
                Phone: CurrentAdmin?.Phone || '',
                EmailID: CurrentAdmin?.EmailID || '',
                Password: CurrentAdmin?.Password || '',
            })
        },
        [CurrentAdmin]
    );

    const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods;

    const values = watch();

    useEffect(() => {
        if (CurrentAdmin) {
            reset(defaultValues);
        }
    }, [CurrentAdmin, defaultValues, reset]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            let Params = {
                UserMasterID: CurrentAdmin?.UserMasterID || 0,
                UserName: data?.UserName,
                Password: data?.Password,
                IsActive: data?.IsActive ? true : false,
                FirstName: data?.FirstName,
                LastName: data?.LastName,
                EmailID: data?.EmailID,
                Phone: data?.Phone,
            }
            if (CurrentAdmin?.UserMasterID) {
                const { status, message } = await UpdateAdmin(Params);
                if (status) {
                    reset();
                    enqueueSnackbar('Update success!');
                    router.push(paths.admin.root);
                } else {
                    enqueueSnackbar(message, { variant: 'error' });
                }
            } else {
                const { status, message } = await AddAdmin(Params);
                if (status) {
                    reset();
                    enqueueSnackbar('Create success!');
                    router.push(paths.admin.root);
                } else {
                    enqueueSnackbar(message, { variant: 'error' });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

    const handleCancel = () => {
        reset();
        router.push(paths.admin.root);
    }

    const renderActions = (
        <>
            <Grid xs={12} md={12} sx={{ display: 'flex', alignItems: 'center', gap: "12px", justifyContent: "end", p: 0 }}>
                <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => handleCancel()}
                >
                    Cancel
                </Button>

                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    {!CurrentAdmin ? 'Create Admin' : 'Save Changes'}
                </LoadingButton>
            </Grid>
        </>
    );

    const renderDetails = (
        <>
            <Grid xs={12} md={12}>
                <Card>
                    {!mdUp && <CardHeader title="Details" />}

                    <Stack spacing={2} sx={{ p: 3 }}>
                        <Box
                            columnGap={2}
                            rowGap={2}
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
                            {!CurrentAdmin && (
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

                        </Box>
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
                        {renderActions}
                    </Stack>
                </Card>
            </Grid>
        </>
    );

    return (
        <>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    {renderDetails}
                </Grid>
            </FormProvider>
        </>
    );
}

AdminNewEditForm.propTypes = {
    CurrentAdmin: PropTypes.object,
};
