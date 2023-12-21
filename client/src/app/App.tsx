import Authors from '../components/Authors';
import { Link, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div className='container'>
      <h2>Library App</h2>
      <Link className='p-2 ps-0 text-decoration-none' to='/authors'>Authors</Link>

      <Routes>
        <Route path='/authors' element={<Authors />} />
      </Routes>
    </div>
  );
};

export default App;