import { useMutation } from '@apollo/client';
import { useField } from '../utils';
import { Button, Form } from 'react-bootstrap';
import { GET_LOGGEDIN_USER, LOGIN_USER } from '../queries';
import { useNavigate } from 'react-router-dom';
import storageService from '../services/storage';

const Login = () => {
  const username = useField('text');
  const password = useField('password');
  const navigate = useNavigate();

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login }) => {
      if (login) {
        storageService.saveUser(login);
        navigate('/');
      }
    },
    update: (cache, { data }) => {
      cache.updateQuery(
        { query: GET_LOGGEDIN_USER },
        () => ({ getLoggedInUser: data?.login })
      );
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    loginUser({
      variables: {
        username: username.field.value,
        password: password.field.value
      }
    });
  };

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <Form className='my-3' onSubmit={handleSubmit}>

        <Form.Group className='mb-3'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            {...username.field}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            {...password.field}
          />
        </Form.Group>
        <Button variant='outline-primary' type='submit'>log in</Button>
      </Form>
    </div>
  );
};

export default Login;