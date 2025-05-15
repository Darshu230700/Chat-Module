import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import ChatbotNewEditForm from '../chatbot-new-edit-form';

// ----------------------------------------------------------------------

export default function ChatbotCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        heading="Create a new chatbot"
        links={[
          {
            name: 'Chatbot',
            href: paths.user.root,
          },
          { name: 'New Chatbot' },
        ]}
      />

      <Stack sx={{ display: "flex", alignItems: "end", mb: { xs: 2, md: 3 } }}>
        <Button
          component={RouterLink}
          href={paths.chatbot.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Back
        </Button>
      </Stack>

      <ChatbotNewEditForm />
    </Container>
  );
}
