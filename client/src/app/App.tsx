import Authors from '../components/Authors';
import { Link, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Books from '../components/Books';
import NewBook from '../components/NewBook';
import storageService from '../services/storage';
import { useApolloClient, useQuery } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { GET_LOGGEDIN_USER } from '../queries';
import { Info } from './type';
import Notification from '../components/Notification';
import { useState } from 'react';
import Recommend from '../components/Recommend';

const App = () => {
  const [info, setInfo] = useState<Info>({} as Info);
  const client = useApolloClient();

  client.cache.writeQuery({
    query: GET_LOGGEDIN_USER,
    data: {
      getLoggedInUser: storageService.getUser()
    },
  });

  const { data } = useQuery(GET_LOGGEDIN_USER);
  const user = data?.getLoggedInUser;

  const notifyWith = (message: string, type = 'info') => {
    setInfo({ message, type });
    setTimeout(() => {
      setInfo({} as Info);
    }, 3000);
  };

  const logOut = () => {
    storageService.clearUser();
    notifyWith(`user ${user?.name} logged out successfully`);
    client.resetStore();
  };

  return (
    <div className='container'>
      <h2>Library App</h2>
      <Link className='p-2 ps-0 text-decoration-none' to='/'>Authors</Link>
      <Link className='p-2 ps-0 text-decoration-none' to='/books'>Books</Link>
      {user && <>
        <Link className='p-2 ps-0 text-decoration-none' to='/create'>Add</Link>
        <Link className='p-2 ps-0 text-decoration-none' to='/recommend'>Recommend</Link>
        <Button onClick={logOut}>Log out</Button>
      </>}
      {!user && <>
        <Link className='p-2 ps-0 text-decoration-none' to='/login'>Login</Link>
      </>}

      <Notification info={info} />

      <Routes>
        <Route path='/' element={<Authors notifyWith={notifyWith} />} />
        <Route path='/books' element={<Books notifyWith={notifyWith} />} />
        <Route path='/create' element={<NewBook notifyWith={notifyWith} />} />
        <Route path='/login' element={<Login notifyWith={notifyWith} />} />
        <Route path='/recommend' element={<Recommend notifyWith={notifyWith} />} />
      </Routes>
    </div>
  );
};

export default App;