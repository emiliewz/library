import Authors from '../components/Authors';
import { Link, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Books from '../components/Books';
import NewBook from '../components/NewBook';
import storageService from '../services/storage';
import { useApolloClient, useQuery } from '@apollo/client';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { GET_LOGGEDIN_USER } from '../queries';
import { Info } from './type';
import Notification from '../components/Notification';
import { useState } from 'react';
import Recommend from '../components/Recommend';
import RegisterForm from '../components/RegisterForm';

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
      <>
        <Navbar bg='light' expand='lg' data-bs-theme='light' className='bg-body-tertiary'>
          <Container>
            <Navbar.Brand as={Link} to='/'>Library App</Navbar.Brand>
            <Navbar.Collapse>
              <Nav className='me-auto'>
                <Nav.Link as={Link} to='/'>Books</Nav.Link>
                <Nav.Link as={Link} to='/authors'>Authors</Nav.Link>
                {user && <><Nav.Link as={Link} to='/create'>Add</Nav.Link>
                  <Nav.Link as={Link} to='/recommend'>Recommend</Nav.Link></>}
                {!user && <>
                  <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                  <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                </>}
              </Nav>
            </Navbar.Collapse>

            {user && (<>
              <Navbar.Collapse className='justify-content-end'>
                <Navbar.Text>
                  Signed in as: {user?.name}
                </Navbar.Text>
                <Button className='ms-2' variant='outline-success' onClick={logOut}>LogOut</Button>
              </Navbar.Collapse>
              <Navbar.Toggle />
            </>)}
          </Container>
        </Navbar>
      </>

      <Notification info={info} />

      <Routes>
        <Route path='/authors' element={<Authors notifyWith={notifyWith} />} />
        <Route path='/' element={<Books notifyWith={notifyWith} />} />
        <Route path='/create' element={<NewBook notifyWith={notifyWith} />} />
        <Route path='/recommend' element={<Recommend notifyWith={notifyWith} />} />
        <Route path='/login' element={<Login notifyWith={notifyWith} />} />
        <Route path='/register' element={<RegisterForm notifyWith={notifyWith} />} />
      </Routes>
    </div>
  );
};

export default App;