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
import { Button, IconButton, InputAdornment, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper } from '@mui/material';
import Iconify from 'src/components/iconify';
import { AddEditChatbot } from 'src/api/chatbot';
import { alpha, styled } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import ChatbotColorPicker from './chatbot-color-picker';
import ChatbotProfile from './chatbot-profile';
import ChatbotTemplate from './chatbot-template';

// ----------------------------------------------------------------------

const STEPS = ['Select Theme', 'Profile', 'Select Template'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      ...bgGradient({
        startColor: theme.palette.primary.darker,
        endColor: theme.palette.primary.darker,
      }),
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      ...bgGradient({
        startColor: theme.palette.primary.lightbtn,
        endColor: theme.palette.primary.darkbtn,
      }),
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    borderRadius: 1,
    backgroundColor: theme.palette.divider,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  zIndex: 1,
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  cursor: "pointer",
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
  ...(ownerState.active && {
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    color: theme.palette.common.white,
    ...bgGradient({

      startColor: theme.palette.primary.darker,
      endColor: theme.palette.primary.dark,
    }),
  }),
  ...(ownerState.completed && {
    color: theme.palette.common.white,
    ...bgGradient({
      startColor: theme.palette.primary.darkbtn,
      endColor: theme.palette.primary.lightbtn,
    }),
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <Iconify icon="mdi:theme-outline" width={24} />,
    2: <Iconify icon="gg:profile" width={24} />,
    3: <Iconify icon="icon-park-solid:page-template" width={24} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.number,
};

export default function ChatbotNewEditForm({ CurrentUser }) {

  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const [selectedTheme, setSelectedTheme] = useState("Theme1");
  const [selectedColor, setSelectedColor] = useState({
    HeaderColor: "#C58E54",
    MainColor: "#083F54"
  });

  const [profileDetail, setProfileDetail] = useState()

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
      const { status, message } = await AddEditChatbot(Params);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <>
      <Grid xs={12} md={12}>
        <Box
          columnGap={2}
          rowGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(3, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          <Stack sx={{ gridColumn: { xs: 'span 2', md: 'span 2' } }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {STEPS.map((label, index) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => setActiveStep(index)}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <ChatbotColorPicker handleNext={handleNext} setSelectedTheme={setSelectedTheme} selectedTheme={selectedTheme} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            )}
            {activeStep === 1 && (
              <ChatbotProfile handleNext={handleNext} setProfileDetail={setProfileDetail} />
            )}
            {activeStep === 2 && (
              <ChatbotTemplate />
            )}
          </Stack>
        </Box>
      </Grid>
    </>
  );
}

ChatbotNewEditForm.propTypes = {
  CurrentUser: PropTypes.object,
};
