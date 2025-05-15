import { Helmet } from 'react-helmet-async';
import { ChatbotListView } from 'src/sections/chatbot/view';

// ----------------------------------------------------------------------

export default function ChatbotListPage() {
    return (
        <>
            <Helmet>
                <title>Chatbot List</title>
            </Helmet>

            <ChatbotListView />
        </>
    );
}
