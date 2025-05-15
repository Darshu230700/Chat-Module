import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { GetUserById } from 'src/api/user';
import ChatbotNewEditForm from '../chatbot-new-edit-form';
import { GetChatbotById } from 'src/api/chatbot';

// ----------------------------------------------------------------------

export default function ChatbotEditView({ id }) {

  const [CurrentUser, setCurrentUser] = useState()

  const [loading, setloading] = useState(true)

  const fetchData = async () => {
    const { data } = await GetChatbotById(id);
    setCurrentUser(data)
    setloading(false)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <Container maxWidth={false}>
      {!loading && (
        <>
          <CustomBreadcrumbs
            heading="Edit"
            links={[
              // { name: 'Dashboard', href: paths.dashboard.root },
              {
                name: 'Chatbot List',
                href: paths.chatbot.root,
              },
              { name: `${CurrentUser?.FirstName} ${CurrentUser?.LastName}` },
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

          <ChatbotNewEditForm CurrentUser={CurrentUser} />
        </>
      )}
    </Container>
  );
}

ChatbotEditView.propTypes = {
  id: PropTypes.string,
};
