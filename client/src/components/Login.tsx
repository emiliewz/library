import { useMutation } from '@apollo/client';
import { getErrorMsg, useField } from '../app/utils';
import { Button, Form } from 'react-bootstrap';
import { GET_LOGGEDIN_USER, LOGIN_USER } from '../queries';
import { useNavigate } from 'react-router-dom';
import storageService from '../services/storage';
import { NotifyProp } from '../app/type';

const Login = ({ notifyWith }: { notifyWith: NotifyProp }) => {
  const username = useField('text');
  const password = useField('password');
  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login }) => {
      if (login) {
        storageService.saveUser(login);
        notifyWith(`${login.name} logged in successfully`);
        navigate('/');
      }
    },
    update: (cache, { data }) => {
      cache.updateQuery(
        { query: GET_LOGGEDIN_USER },
        () => ({ getLoggedInUser: data?.login })
      );
    },
    onError: (error) => notifyWith(getErrorMsg(error)),
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    loginUser({
      variables: {
        username: username.field.value,
        password: password.field.value
      }
    });
    username.setValue('');
    password.setValue('');
  };

  if (loading) return null;

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