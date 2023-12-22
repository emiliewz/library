import { Button, Table } from 'react-bootstrap';
import { useField } from '../utils';
import { useQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '../queries';

const Books = () => {
  const genre = useField('text');

  const result = useQuery(GET_ALL_BOOKS, {
    variables: { genre: null },
  });
  const result_g = useQuery(GET_ALL_BOOKS, {
    variables: { genre: genre.field.value },
    skip: genre.field.value === ''
  });

  if (result.loading || result_g.loading) return <p>Loading...</p>;
  if (result.error || result_g.error) return <p>Submission error! {result.error?.message} {result_g.error?.message}</p>;

  const allBooks = result.data?.allBooks;

  const genres_total = allBooks?.reduce((a: string[], b) => a.concat(b.genres), []);
  const books = genre.field.value === '' ? allBooks : result_g.data?.allBooks;

  return (
    <div>
      <h2 className='my-3'>Books</h2>

      {genre && <h4 className='my-3'>in genre <strong>patterns</strong></h4>}

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