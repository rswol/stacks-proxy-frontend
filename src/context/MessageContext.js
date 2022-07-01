import { createContext, useEffect, useState, useContext } from 'react'
import Message from '../components/ui/Message'

const MessageContext = createContext()

function useMessage(){
  return useContext(MessageContext)
}

function MessageProvider({ children }) {
  const [message, setMessage] = useState({})

  function showMessage(type, text){
    setMessage({ type: `${type} show`, text: text})
    setTimeout(hideMessage, 3500)
  }
  
  function hideMessage() {
    document.getElementById("message").classList.remove('show');
    setTimeout(() => setMessage({}), 200)
  }

  let value = {
    showMessage,
    hideMessage
  }

  return (
    <MessageContext.Provider value={value}>
      <Message type={message.type} text={message.text} />
      { children }
    </MessageContext.Provider>
  )
}

export { useMessage, MessageProvider }