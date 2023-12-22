import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import AuthorBirthForm from './AuthorBirthForm';
import { GET_ALL_AUTHORS, GET_LOGGEDIN_USER } from '../../queries';
import { NotifyProp } from '../../app/type';
import { getErrorMsg } from '../../app/utils';

const Authors = ({ notifyWith }: { notifyWith: NotifyProp }) => {
  const { loading, data } = useQuery(GET_ALL_AUTHORS, { onError: (error) => notifyWith(getErrorMsg(error)) });
  const loggInuser = useQuery(GET_LOGGEDIN_USER, { onError: (error) => notifyWith(getErrorMsg(error)) });

  if (loading || loggInuser.loading) return null;

  const user = loggInuser.data?.getLoggedInUser;
  const authors = data?.allAuthors;

  return (
    <div>
      <h4 className='my-3'>Authors</h4>
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
      {user && authors && <AuthorBirthForm authors={authors} notifyWith={notifyWith} />}
    </div>
  );
};

export default Authors;