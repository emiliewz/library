import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import AuthorBirthForm from './AuthorBirthForm';
import { GET_ALL_AUTHORS, GET_LOGGEDIN_USER } from '../../queries';

const Authors = () => {
  const { loading, error, data } = useQuery(GET_ALL_AUTHORS, {
    onError: (error) => {
      console.log(error.graphQLErrors.map(e => e.message).join('\n'));
    },
  });

  const loggInuser = useQuery(GET_LOGGEDIN_USER);
  const user = loggInuser.data?.getLoggedInUser;

  if (loading || loggInuser.loading) return <p>Loading...</p>;
  if (error || loggInuser.error) return <p>Submission error! {error?.message} ${loggInuser.error?.message}</p>;

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
      {user && authors && <AuthorBirthForm authors={authors} />}
    </div>
  );
};

export default Authors;