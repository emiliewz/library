import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS, GET_USER } from '../queries';
import { Table } from 'react-bootstrap';
import { NotifyProp } from '../app/type';

const Recommend = ({ notifyWith }: { notifyWith: NotifyProp }) => {
  const { data, loading } = useQuery(GET_USER, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n');
      notifyWith((messages));
    },
  });
  const genre = data ? data?.me?.favoriteGenre : null;

  const myFavoriteBooks = useQuery(GET_ALL_BOOKS, {
    variables: { genre },
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n');
      notifyWith((messages));
    },
  });
  const books = myFavoriteBooks.data?.allBooks;

  if (loading || myFavoriteBooks.loading) return null;

  return (
    <div>
      <h4 className='my-3'>Recommendations</h4>
      <p>books in your favorite genre <strong>{genre}</strong> patterns</p>
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