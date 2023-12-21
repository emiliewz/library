import Authors from '../components/Authors';
import { Link, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Books from '../components/Books';
import NewBook from '../components/NewBook';

const App = () => {

  return (
    <div className='container'>
      <h2>Library App</h2>
      <Link className='p-2 ps-0 text-decoration-none' to='/authors'>Authors</Link>
      <Link className='p-2 ps-0 text-decoration-none' to='/books'>Books</Link>
      <Link className='p-2 ps-0 text-decoration-none' to='/create'>Add</Link>
      <Link className='p-2 ps-0 text-decoration-none' to='/login'>Login</Link>

      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/create' element={<NewBook />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;