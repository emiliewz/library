import { useMutation } from '@apollo/client';
import { useField } from '../utils';
import { Button, Form } from 'react-bootstrap';
import { LOGIN_USER } from '../queries';
import { useEffect } from 'react';
import storageService from '../services/storage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const username = useField('text');
  const password = useField('password');
  const navigate = useNavigate();

  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (data && data.login) {
      storageService.saveUser(data.login);
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    login({
      variables: {
        username: username.field.value,
        password: password.field.value
      }
    });
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

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