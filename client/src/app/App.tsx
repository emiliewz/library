import Authors from '../components/Authors';
import { Link, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Books from '../components/Books';
import NewBook from '../components/NewBook';
import storageService from '../services/storage';
import { useApolloClient, useQuery } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { GET_LOGGEDIN_USER } from '../queries';

const App = () => {
  const client = useApolloClient();

  client.cache.writeQuery({
    query: GET_LOGGEDIN_USER,
    data: {
      getLoggedInUser: storageService.getUser()
    },
  });

  const { data } = useQuery(GET_LOGGEDIN_USER);

  const user = data?.getLoggedInUser;

  const logOut = () => {
    storageService.clearUser();
    client.resetStore();
  };

  return (
    <div className='container'>
      <h2>Library App</h2>
      <Link className='p-2 ps-0 text-decoration-none' to='/'>Authors</Link>
      <Link className='p-2 ps-0 text-decoration-none' to='/books'>Books</Link>
      {user && <>
        <Link className='p-2 ps-0 text-decoration-none' to='/create'>Add</Link>
        <Button onClick={logOut}>Log out</Button>
      </>}
      {!user && <>
        <Link className='p-2 ps-0 text-decoration-none' to='/login'>Login</Link>
      </>}

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/create' element={<NewBook />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;