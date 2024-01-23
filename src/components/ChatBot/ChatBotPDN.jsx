import React from 'react'
import ChatBot from 'react-simple-chatbot'

import { ThemeProvider } from 'styled-components'
import IconChat from './ico-chat.svg'
import IconErizo from './ico-erizo.svg'
import steps from './steps'
import ReactGA from 'react-ga4'
// all available props
const theme = {
  background: '#f5f8fb',
  headerBgColor: '#815374',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#815374',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
}
const Example = () => {
  const [opened, setOpened] = React.useState(false)

  const toggleFloating = ({ opened }) => {
    setOpened(opened)
    // console.log(opened);
    if (opened === true) {
      ReactGA.event({ category: 'chatbot', action: 'click' })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        className='chatbot'
        opened={opened}
        toggleFloating={toggleFloating}
        steps={steps}
        floating
        botAvatar={IconErizo}
        floatingIcon={IconChat}
        hideUserAvatar
        headerTitle='Chat PDN'
        hideSubmitButton
        footerStyle={{
          display: 'none'
        }}
      />
    </ThemeProvider>
  )
}

export default Example
