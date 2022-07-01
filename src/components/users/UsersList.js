import UsersListItem from './UsersListItem'
import { useUsersData } from '../../context/UsersContext'
import './UsersList.css'

export default function UsersList() {
  const { searchedUsers, loading } = useUsersData()

  return (
    <div className="users-list-container">
      <legend>All users</legend>
      { loading ? 
        <div>Loading ...</div> : 
        searchedUsers.map((user, key) => <UsersListItem user={user} key={key} />) 
      }
    </div>
  )
}