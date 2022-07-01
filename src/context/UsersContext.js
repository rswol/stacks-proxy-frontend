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

  const searchedUsers = users.filter(user => user.toLowerCase().includes(searchParam.toLowerCase()))

  useEffect(() => {
    getUsers()
  }, [loading])

  async function getUsers() {
    try {
      const res = await fetch(apiEndpoint.concat('v1/users'))
      const jsonData = await res.json()
      setUsers(jsonData)
    } catch { }
    setLoading(false)
  }

  async function deleteUser(username) {
    setUsers(prevUsers => prevUsers.filter(user => user !== username))
    return await fetch(apiEndpoint.concat('v1/jwt'), {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username })
    })
  }

  async function addUser(username) {
    setLoading(true)
    return await fetch(apiEndpoint.concat('v1/jwt'), {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username })
    })
  }

  async function getToken(username) {
    const res = await fetch(apiEndpoint.concat('v1/jwt'), {
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
    getToken
  }

  return (
    <UsersContext.Provider value={value}>
      { children }
    </UsersContext.Provider>
  )
}

export { useUsersData, UsersProvider }