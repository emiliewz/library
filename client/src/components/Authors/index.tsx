import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import AuthorBirthForm from './AuthorBirthForm';
import { GET_ALL_AUTHORS } from '../../queries';

const Authors = () => {
  const { loading, data } = useQuery(GET_ALL_AUTHORS);
  if (loading) return <p>Loading...</p>;

  const authors = data?.allAuthors;
  if (!authors) return <p>Authors not found</p>;

  return (
    <div>
      <h2 className='my-3'>Authors</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AuthorBirthForm authors={authors} />
    </div>
  );
};

export default Authors;