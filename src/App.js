import './App.css';
import Navbar from './components/layout/Navbar';
import Wrapper from './components/layout/Wrapper'
import UsersList from './components/users/UsersList'
import { UsersProvider } from './context/UsersContext'
import { MessageProvider } from './context/MessageContext'

function App() {
  return (
    <div className="App">
      <UsersProvider>
        <MessageProvider>
          <Wrapper>
            <Navbar />
            <UsersList />
          </Wrapper>
        </MessageProvider>
      </UsersProvider>
    </div>
  );
}

export default App;
