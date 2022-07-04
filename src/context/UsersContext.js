import { createContext, useEffect, useState, useContext } from 'react'
import { apiEndpoint } from '../settings/BaseApiEndpoint'

const UsersContext = createContext()

function useUsersData(){
  return useContext(UsersContext)
}

function UsersProvider({ children }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParam, setSearchParam] = useState("")
  const [auth, setAuth] = useState(false)

  const searchedUsers = users.filter(user => user.toLowerCase().includes(searchParam.toLowerCase()))

  useEffect(() => {
    getAuth()
  } , [])

  useEffect(() => {
    getUsers()
  }, [loading])

  async function getAuth() {
    try {
      const res = await fetch(apiEndpoint.concat('/isAuth'))
      const isauth = await res.text()
      setAuth(isauth)
    } catch {}
  }

  async function setAuthOn(){
    setAuth(true)
    return await fetch(apiEndpoint.concat('/authOn'), {
      method: "POST"
    })
  }

  async function setAuthOff() {
    setAuth(false)
    return await fetch(apiEndpoint.concat('/authOff'), {
      method: "POST"
    })
  }

  async function getUsers() {
    try {
      const res = await fetch(apiEndpoint.concat('/users'))
      const jsonData = await res.json()
      setUsers(jsonData)
    } catch { }
    setLoading(false)
  }

  async function deleteUser(username) {
    setUsers(prevUsers => prevUsers.filter(user => user !== username))
    return await fetch(apiEndpoint.concat('/jwt'), {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username })
    })
  }

  async function addUser(username) {
    setLoading(true)
    return await fetch(apiEndpoint.concat('/jwt'), {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username })
    })
  }

  async function getToken(username) {
    const res = await fetch(apiEndpoint.concat('/jwt'), {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username })
    })
    return await res.text()
  }

  function searchUsers(event) {
    setSearchParam(event.target.value)
  }

  let value = {
    users,
    deleteUser,
    addUser,
    loading,
    searchUsers,
    searchedUsers,
    getToken,
    auth,
    setAuthOn,
    setAuthOff
  }

  return (
    <UsersContext.Provider value={value}>
      { children }
    </UsersContext.Provider>
  )
}

export { useUsersData, UsersProvider }