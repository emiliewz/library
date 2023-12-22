import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS, GET_USER } from '../queries';
import { Table } from 'react-bootstrap';

const Recommend = () => {
  const { data, loading, error } = useQuery(GET_USER);
  const genre = data ? data?.me?.favoriteGenre : null;

  const myFavoriteBooks = useQuery(GET_ALL_BOOKS, { variables: { genre } });
  const books = myFavoriteBooks.data?.allBooks;

  if (loading || myFavoriteBooks.loading) return 'Submitting...';
  if (error || myFavoriteBooks.error) return `Error! ${error?.message} ${myFavoriteBooks?.error?.message}`;

  return (
    <div>
      <h4 className='my-3'>Recommendations</h4>
      <p>books in your favorite genre <strong>patterns</strong></p>
      <Table className='mt-3' striped>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Recommend;