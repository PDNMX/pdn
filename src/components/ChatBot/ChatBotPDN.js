import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import IconChat from "./ico-chat.svg";
import IconErizo from "./ico-erizo.svg";
import steps from "./steps";
// all available props
const theme = {
    background: '#f5f8fb',
    headerBgColor: "#3d6575",
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#3ab0e5',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};


const ChatBotPDN = () => (
    <ThemeProvider theme={theme}>
        <ChatBot
            steps={steps}
            floating={true}
            botAvatar={IconErizo}
            floatingIcon={IconChat}
            hideUserAvatar={true}
            headerTitle={'Chat PDN'}
            hideSubmitButton={true}
        />
    </ThemeProvider>
);

export default ChatBotPDN;