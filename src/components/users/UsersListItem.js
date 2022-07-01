import './UsersListItem.css'
import { AiOutlineUser } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { MdContentCopy } from 'react-icons/md'
import Modal from '../layout/Modal'
import { useState, useEffect } from 'react'
import { useUsersData } from '../../context/UsersContext'
import { useMessage } from '../../context/MessageContext'

export default function UsersListItem({ user }) {
  const [confirmUserDeleteModal, setConfirmUserDeleteModal] = useState(false)
  const [token, setToken] = useState("...")
  const { deleteUser, getToken } = useUsersData()
  const { showMessage } = useMessage()

  useEffect(() => {
    async function getAndSetToken() {
      let data = await getToken(user)
      setToken(data)
    }
    getAndSetToken()
  }, [])

  function copyToClipboard() {
    navigator.clipboard.writeText(token)
    showMessage("success", "Copied to clipboard!")
  }

  async function removeUser() {
    const res = await deleteUser(user)
    setConfirmUserDeleteModal(false)
    if(res.ok){
      // set success message of user deletion
      showMessage("success", "Deleted the user...")
    } else {
      // set failed message user not deleted
      showMessage("fail", "Failed to delete the user!")
    }
  }

  function renderConfirmDeleteUserModal() {
    return (
      <Modal modalCloseHandler={() => setConfirmUserDeleteModal(false)}>
        <div style={{ margin: "2rem"}}>
          <legend className="strong">Alert</legend>
          <p className="muted">Are you sure you want to delete the user ?</p>
        </div>
        <div className="controls">
          <button className="btn-danger" onClick={removeUser}>confirm</button>
          <button className='btn-normal' onClick={() => setConfirmUserDeleteModal(false)}>
            cancel
          </button>
        </div>
      </Modal>
    )
  }

  return(
    <div className="users-list-item">
      { confirmUserDeleteModal ? renderConfirmDeleteUserModal() : null }
      <div className="main-user-content">
        <span className="user-icon">
          <AiOutlineUser size={25} color="rgb(var(--clr-purple-100))" />
        </span>
        <div style={{flex: 1}}>
          <legend className="username">{ user }</legend>
          <p className="token">{ token }</p>
        </div>
      </div>
      <div className="user-controls">
        <span className="copy-icon" onClick={copyToClipboard}>
          <MdContentCopy size={20} color="rgb(var(--clr-purple-100))" />
        </span>
        <span className="delete-icon" onClick={() => setConfirmUserDeleteModal(true)}>
          <BiTrash size={20} color="rgb(var(--clr-red))" />
        </span>
      </div>
    </div>
  )
}