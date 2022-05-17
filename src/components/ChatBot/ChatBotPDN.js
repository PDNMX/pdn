import React from "react";
import ChatBot from "react-simple-chatbot";

import { ThemeProvider } from "styled-components";
import IconChat from "./ico-chat.svg";
import IconErizo from "./ico-erizo.svg";
import steps from "./steps";
import ReactGA from "react-ga";
// all available props
const theme = {
  background: "#f5f8fb",
  headerBgColor: "#3d6575",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#3ab0e5",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};
const Example = () => {
  const [opened, setOpened] = React.useState(false);

  const toggleFloating = ({ opened }) => {
    setOpened(opened);
    //console.log(opened);
    if (opened === true){
        ReactGA.event({ category: 'chatbot', action: 'click' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        opened={opened}
        toggleFloating={toggleFloating}
        steps={steps}
        floating={true}
        botAvatar={IconErizo}
        floatingIcon={IconChat}
        hideUserAvatar={true}
        headerTitle={"Chat PDN"}
        hideSubmitButton={true}
        footerStyle={{
          display: "none",
        }}
      />
    </ThemeProvider>
  );
};

export default Example;
