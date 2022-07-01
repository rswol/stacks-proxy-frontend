import './Message.css'
import { MdOutlineClose } from 'react-icons/md'
import { useMessage } from '../../context/MessageContext'

export default function Message({ type, text }) {
  const { hideMessage } = useMessage()

  return (
    <div className={`message ${type}`} id="message">
      { text }
      <MdOutlineClose size={20} onClick={hideMessage} />
    </div>
  )
}