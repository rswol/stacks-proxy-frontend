import './Navbar.css'
import { FiSearch } from 'react-icons/fi'
import Modal from './Modal'
import { useState } from 'react'
import { useUsersData } from '../../context/UsersContext'
import { useMessage } from '../../context/MessageContext'
import DropDown from '../ui/Dropdown'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { BsShieldShaded } from 'react-icons/bs'

export default function Navbar() {
  const [newUserModal, setNewUserModal] = useState(false)
  const [newUserName, setNewUserName] = useState("")

  const { addUser, searchUsers, auth, setAuthOn, setAuthOff } = useUsersData()
  const { showMessage } = useMessage()

  function closeModal() {
    setNewUserName("")
    setNewUserModal(false)
  }

  async function addNewUser() {
    if(newUserName) {
      const res = await addUser(newUserName)
      closeModal()
      if(res.ok) {
        // set user created message success
        showMessage("success", "Added the new user!")
      } else {
        // set user creation failed 
        showMessage("fail", "Failed to create the user!")
      }
    } else {
      alert("Please enter a username before submitting")
    }
  }

  function renderNewUserModal() {
    return (
      <Modal modalCloseHandler={closeModal}>
        <div style={{ margin: "2rem"}}>
          <legend className="strong">Add new user</legend>
          <p className="muted">Enter a username for the new user</p>
          <div style={{ marginTop: "2rem"}}>
            <input className="pill-shape-input full-width" type="text" placeholder="new user" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
          </div>
        </div>
        <div className="controls">
          <button className="btn-confirm" onClick={addNewUser}>confirm</button>
          <button className="btn-normal" onClick={closeModal}>cancel</button>
        </div>
      </Modal>
    )
  }

  return (
    <div className="main-navigation">
      { newUserModal ? renderNewUserModal() : null }
      <div>
        <div className="nav-legend">Admin Panel</div>
        <div className="search-box">
          <span className="search-icon"><FiSearch color="rgb(var(--clr-black-50))" /></span>
          <input className='pill-shape-input' type="text" placeholder="Search..." onChange={searchUsers} />
        </div>
      </div>
      <DropDown>
        <div onClick={() => setNewUserModal(true)}>
          <p>New user</p>
          <AiOutlineUserAdd size={24} />
        </div>
        <div onClick={auth ? setAuthOff : setAuthOn}>
          <p>Auth state</p>
          <BsShieldShaded 
            size={24}
            color={auth ? "rgb(var(--clr-green))" : "rgb(var(--clr-red))"}
          />
        </div>
      </DropDown>
    </div>
  )
}
