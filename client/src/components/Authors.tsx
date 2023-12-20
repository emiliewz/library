import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import { gql } from '../__generated__';

const GET_ALL_AUTHORS = gql(/* GraphQL */ `
  query GetAllAuthors {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`);

const Authors = () => {
  const { loading, data } = useQuery(GET_ALL_AUTHORS);

  if (loading) return null;

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
    </div>
  );
};

export default Authors;