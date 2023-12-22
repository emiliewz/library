import { Button, Table } from 'react-bootstrap';
import { useField } from '../utils';
import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '../queries';
import { NotifyProp } from '../app/type';

const Books = ({ notifyWith }: { notifyWith: NotifyProp }) => {
  const genre = useField('text');

  const result = useQuery(GET_ALL_BOOKS, {
    variables: { genre: null },
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n');
      notifyWith((messages));
    },
  });
  const result_g = useQuery(GET_ALL_BOOKS, {
    variables: { genre: genre.field.value },
    skip: genre.field.value === '',
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n');
      notifyWith((messages));
    },
  });

  if (result.loading || result_g.loading) return null;

  const allBooks = result.data?.allBooks;

  const genres_total = allBooks?.reduce((a: string[], b) => a.concat(b.genres), []);
  const books = genre.field.value === '' ? allBooks : result_g.data?.allBooks;

  return (
    <div>
      <h4 className='my-3'>All Books {genre.field.value !== '' && <>in genre <strong>{genre.field.value}</strong></>}</h4>

      {[...new Set(genres_total)].map(g => (
        <Button variant='outline-info' key={g} value={g} onClick={() => genre.setValue(g)}>{g}</Button>
      ))}

      <Button variant='outline-info' onClick={() => genre.setValue('')}>all</Button>

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
    </div >
  );
};

export default Books;