import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import AuthorBirthForm from './AuthorBirthForm';
import { GET_ALL_AUTHORS } from '../../queries';
import { useEffect } from 'react';

const Authors = () => {
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS);

  useEffect(() => {
    if (data && data.allAuthors === null) {
      console.log('Authors not found');
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Submission error! {error.message}</p>;

  const authors = data?.allAuthors;

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
          {authors?.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {authors && <AuthorBirthForm authors={authors} />}
    </div>
  );
};

export default Authors;