import { Grid, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';

const ChatbotProfile = ({ handleNext, setProfileDetail }) => {

    const NewUserSchema = Yup.object().shape({
        Name: Yup.string().required('Name is required'),
    });

    const defaultValues = useMemo(
        () => ({
            Name: "Chatbot"
        }),
        []
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
            setProfileDetail(data)
            handleNext()
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
        <>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Grid xs={12} md={12}>
                    <Stack sx={{ py: 3, display: "flex", flexDirection: "column", gap: 1.5, width: "280px" }}>
                        <Typography variant='h5'>Give your bot a personality</Typography>
                        <RHFUploadAvatar
                            name="avatarUrl"
                            maxSize={3145728}
                            onDrop={handleDrop}
                        />
                        <RHFTextField name="Name" label="Enter Your Name" />
                    </Stack>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        sx={{ width: "120px" }}
                    >
                        Continue
                    </LoadingButton>
                </Grid>
            </FormProvider>
        </>
    )
}

export default ChatbotProfile