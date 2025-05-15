import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import { ChatbotEditView } from 'src/sections/chatbot/view';

// ----------------------------------------------------------------------

export default function ChatbotEditPage() {
    const params = useParams();

    const { id } = params;

    return (
        <>
            <Helmet>
                <title> Chatbot Edit</title>
            </Helmet>

            <ChatbotEditView id={`${id}`} />
        </>
    );
}
