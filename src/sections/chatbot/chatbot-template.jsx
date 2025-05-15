import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

const ChatbotTemplate = () => {
    return (
        <>
            <Stack sx={{ py: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography variant='h5'>Choose a conversation template</Typography>
                <Typography variant='body1'>Get started with one of our predefined templates. Save time and explore all the features Chatbot has to offer.</Typography>
            </Stack>
        </>
    )
}

export default ChatbotTemplate
