import { Helmet } from 'react-helmet-async';
import { ChatbotCreateView } from 'src/sections/chatbot/view';


// ----------------------------------------------------------------------

export default function ChatbotCreatePage() {
    return (
        <>
            <Helmet>
                <title> Create a new chatbot</title>
            </Helmet>

            <ChatbotCreateView />
        </>
    );
}
