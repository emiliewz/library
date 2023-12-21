/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from '@apollo/client';
import { useField } from '../utils';
import { Button, Form } from 'react-bootstrap';
import { LOGIN_USER } from '../queries';

const Login = () => {
  const username = useField('text');
  const password = useField('password');

  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <Form className='my-3'>

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